import './App.css'
import { Route, Routes } from 'react-router'
import {Home} from './components/Home'
import { Header } from './components/Header/Header'
import {Categories} from './components/Categories/Categories'
import { Product } from './components/Products/Product'
import { Panier } from './components/Panier/Panier'
import PanierContext from './PanierContext'
import { Error } from './components/Error'
import Login from './components/Login/Login'
import { Admin } from './components/Admin/Admin'
import PrivateRoutes from './components/PrivateRoutes'

function App() {
  return (
    <>
      <PanierContext>
        <Header />
        <Routes>
          <Route path="/" element={<Home/>}>
            <Route index element={<Categories/>} />
            <Route path="/electronics" element={<Categories categorie="electronics"/>} />
            <Route path="/jewelery" element={<Categories categorie="jewelery"/>} />
            <Route path="/men_clothing" element={<Categories categorie="men's clothing"/>} />
            <Route path="/women_clothing" element={<Categories categorie="women's clothing"/>} />
            <Route path="/:category/:product" element={<Product />} />
          </Route>
          <Route path='/login' element={<Login />} />
          {/* On sécurise la page admin */}
          <Route element={<PrivateRoutes />}>
            <Route path='/admin' element={<Admin />} />
          </Route>
          <Route path="/panier" element={<Panier />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </PanierContext>
    </>
  )
}

export default App
