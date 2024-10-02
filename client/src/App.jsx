import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/Home'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { ForgotPassword } from './pages/Password-Reset/ForgotPassword'
import { ResetPassword } from './pages/Password-Reset/ResetPassword'
import { Header } from './components/Header'
import {
  CskAllItems,
  CreateClient,
  ClientTrash,
  ClientFavroite
} from './pages/Client'
import { CreateSite, SiteAllItems, SiteFavroite, SiteTrash } from './pages/site'
import { Logout } from './pages/Logout'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route
            path='/reset-password/:emailId/:token'
            element={<ResetPassword />}
          />
          <Route path='/client/all-items' element={<CskAllItems />} />
          <Route path='/client/trash' element={<ClientTrash />} />
          <Route path='/client/fav' element={<ClientFavroite />} />
          <Route path='/client-create' element={<CreateClient />} />
          <Route
            path='/client/all-items/:clientId/site-data'
            element={<SiteAllItems />}
          />
          <Route
            path='/client/all-items/:clientId/site-data/create-site'
            element={<CreateSite />}
          />
          <Route path='/valut/fav/:clientId' element={<SiteFavroite />} />
          <Route path='/valut/trash/:clientId' element={<SiteTrash />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
