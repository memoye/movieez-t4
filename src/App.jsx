import './App.css'
import NavBar from './components/NavBar'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './pages/Home'
import { AuthContextProvider } from './context/AuthContext'
import Login from './pages/Login'
import Signup from './pages/SignUp'
import Account from './pages/Account'
import ProtectedRoute from './components/ProtectedRoute'
import Details from './pages/Details'

function App() {



  return (
    <>
      <AuthContextProvider>
        <Router>
          <NavBar />
          <Routes>
            <Route path='/' element={ <Home /> } />
            <Route path='/login' element={ <Login /> } />
            <Route path='/signup' element={ <Signup /> } />

            <Route path='/details/:id' element={ <Details /> } />

            <Route path='/account' element={ <ProtectedRoute>
              <Account />
            </ProtectedRoute> } />


          </Routes>
        </Router>
      </AuthContextProvider>
    </>
  )
}

export default App
