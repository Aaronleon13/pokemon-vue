/**
 * ============================================
 * CONFIGURACIÓN DE AXIOS PARA AUTENTICACIÓN
 * ============================================
 *
 * Este archivo crea una instancia personalizada de axios con interceptores
 * que manejan automáticamente la autenticación mediante tokens HTTP-only cookies.
 *
 * CONCEPTOS CLAVE:
 * - Interceptores: Funciones que se ejecutan antes/después de cada petición
 * - Refresh Token: Token que permite obtener un nuevo access token sin re-login
 * - 401 Unauthorized: Código HTTP que indica que el token ha expirado
 */

import axios from 'axios'
import router from '../router'

/**
 * ============================================
 * 1. CREACIÓN DE LA INSTANCIA DE AXIOS
 * ============================================
 */

const api = axios.create({
  // URL base del servidor backend (ej: http://localhost:3000)
  baseURL: import.meta.env.VITE_API_BASE_URL,

  // withCredentials: true permite enviar y recibir cookies HTTP-only
  // Esto es ESENCIAL para el funcionamiento de cookies de autenticación
  withCredentials: true,
})

/**
 * ============================================
 * 2. INTERCEPTOR DE RESPUESTAS
 * ============================================
 *
 * Los interceptores permiten ejecutar código antes de procesar la respuesta.
 * Este interceptor maneja automáticamente:
 * - Tokens expirados (error 401)
 * - Renovación automática de tokens (refresh token)
 * - Cierre de sesión cuando ya no es posible renovar
 */

api.interceptors.response.use(
  // ✅ CASO 1: La petición fue exitosa (status 200, 201, etc.)
  // Simplemente devolvemos la respuesta sin modificarla
  (res) => res,

  // ❌ CASO 2: La petición falló (error 4xx o 5xx)
  // Aquí manejamos los errores de autenticación
  async (err) => {
    /**
     * --------------------------------------------
     * 2.1 VALIDACIÓN INICIAL
     * --------------------------------------------
     * Si no hay configuración en el error, no podemos procesarlo
     * (esto puede ocurrir en errores de red)
     */
    if (!err.config) {
      return Promise.reject(err)
    }

    // Guardamos la petición original para poder reintentarla después
    const originalRequest = err.config

    /**
     * --------------------------------------------
     * 2.2 EXCEPCIONES: NO INTERCEPTAR LOGIN/REGISTER
     * --------------------------------------------
     * Los endpoints de autenticación NO deben ser interceptados
     * porque es normal que fallen (ej: contraseña incorrecta)
     */
    const authEndPoints = ['/auth/login', '/auth/register']

    // Verificamos si la petición actual es a un endpoint de auth
    const isAuthEndPoint = authEndPoints.some((endPoint) => originalRequest.url.includes(endPoint))

    // Si es login o register, dejamos que el error llegue al componente
    if (isAuthEndPoint) {
      return Promise.reject(err)
    }

    /**
     * --------------------------------------------
     * 2.3 CASO: TOKEN EXPIRADO Y YA SE INTENTÓ RENOVAR
     * --------------------------------------------
     * Si recibimos 401 Y ya intentamos renovar el token (_retry = true),
     * significa que el refresh token también expiró.
     * Acción: Cerrar sesión y redirigir al login
     */
    if (err.response.status === 401 && originalRequest._retry) {
      // Eliminar el estado de autenticación del localStorage
      localStorage.removeItem(import.meta.env.VITE_KEY_STORAGE)

      // Intentar hacer logout en el servidor para limpiar cookies
      try {
        await api.post('/auth/logout')
      } catch (error) {
        // Si el logout falla, igual continuamos (servidor ya limpiará cookies expiradas)
        return Promise.reject(error)
      }

      // Redirigir al usuario a la página de login
      router.push('/')
      return Promise.reject(err)
    }

    /**
     * --------------------------------------------
     * 2.4 CASO: TOKEN EXPIRADO (PRIMER INTENTO)
     * --------------------------------------------
     * Si recibimos 401 y NO hemos intentado renovar (_retry = undefined),
     * intentamos obtener un nuevo access token usando el refresh token.
     *
     * FLUJO DEL REFRESH TOKEN:
     * 1. Marcamos la petición como "ya intentada" (_retry = true)
     * 2. Llamamos al endpoint /auth/refresh (envía refresh token automáticamente via cookie)
     * 3. El servidor valida el refresh token y genera un nuevo access token
     * 4. Reintentamos la petición original con el nuevo token
     */
    if (err.response.status === 401 && !originalRequest._retry) {
      // Marcamos que ya intentamos renovar (evita bucles infinitos)
      originalRequest._retry = true

      try {
        // Intentamos renovar el token
        // El refresh token se envía automáticamente en una cookie HTTP-only
        const refreshResponse = await api.post('/auth/refresh')

        // Si el refresh fue exitoso (status 200)
        if (refreshResponse.status === 200) {
          // El servidor ya actualizó las cookies con el nuevo access token
          // Reintentamos la petición original que falló
          return api(originalRequest)
        } else {
          // Si el status no es 200, algo salió mal
          throw new Error('Refresh token failed')
        }
      } catch (error) {
        /**
         * Si llegamos aquí, el refresh token también expiró o es inválido
         * Acción: Cerrar sesión completamente
         */

        // Limpiar localStorage
        console.error('Refresh token failed', error)
        localStorage.removeItem(import.meta.env.VITE_KEY_STORAGE)

        // Intentar logout en servidor
        try {
          await api.post('/auth/logout')
        } catch (error) {
          return Promise.reject(error)
        }

        // Redirigir al login
        router.push('/')
        return Promise.reject(err)
      }
    }

    /**
     * --------------------------------------------
     * 2.5 OTROS ERRORES
     * --------------------------------------------
     * Si el error no es 401 o no cumple las condiciones anteriores,
     * simplemente lo rechazamos para que el componente lo maneje
     * (ej: error 400, 404, 500, etc.)
     */
    return Promise.reject(err)
  },
)

/**
 * ============================================
 * 3. EXPORTACIÓN
 * ============================================
 * Exportamos la instancia configurada para usar en toda la app
 *
 * USO EN COMPONENTES:
 * import api from '@/api/axios'
 * api.get('/me')
 * api.post('/auth/login', { email, password })
 */
export default api
