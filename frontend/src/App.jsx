import { useState } from 'react'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom'

const SESSION_TOKEN_KEY = 'session_token'
const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000'

function hasTokenInSession() {
  return Boolean(sessionStorage.getItem(SESSION_TOKEN_KEY))
}

function ProtectedRoute({ children }) {
  if (!hasTokenInSession()) {
    return <Navigate to="/login" replace />
  }

  return children
}

function LoginPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setErrorMessage('')
    setIsLoading(true)

    try {
      const response = await fetch(`${API_BASE_URL}/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          username,
          password,
        }),
      })

      if (!response.ok) {
        const error = await response.json().catch(() => ({}))
        setErrorMessage(error.detail ?? 'No se pudo iniciar sesión.')
        return
      }

      const data = await response.json()
      sessionStorage.setItem(SESSION_TOKEN_KEY, data.access_token)
      navigate('/welcome', { replace: true })
    } catch {
      setErrorMessage('No fue posible conectar con el backend.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="page">
      <section className="card">
        <h1 className="title">Login</h1>
        <p className="body">
          Ingresá con las credenciales del backend para acceder a la bienvenida.
        </p>
        <form className="form" onSubmit={handleSubmit}>
          <label className="label" htmlFor="username">
            Usuario
          </label>
          <input
            id="username"
            className="input"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />

          <label className="label" htmlFor="password">
            Contraseña
          </label>
          <input
            id="password"
            className="input"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          {errorMessage && <p className="error">{errorMessage}</p>}

          <button className="button-primary" type="submit" disabled={isLoading}>
            {isLoading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
      </section>
    </main>
  )
}

function WelcomePage() {
  const navigate = useNavigate()

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_TOKEN_KEY)
    navigate('/login', { replace: true })
  }

  return (
    <main className="page">
      <section className="card">
        <h1 className="title">Bienvenido</h1>
        <p className="body">Sesión iniciada correctamente.</p>
        <button className="button-primary" type="button" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </section>
    </main>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            hasTokenInSession() ? (
              <Navigate to="/welcome" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/welcome"
          element={
            <ProtectedRoute>
              <WelcomePage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
