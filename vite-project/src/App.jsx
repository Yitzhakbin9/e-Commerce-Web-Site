import LogIn from './Components/LogIn'
import Registration from './Components/Registration'
import Categories from './Components/AdminComponents/Categories.jsx'
import AdminHomePage from './Components/AdminComponents/AdminHomePage.jsx'
import Customers from './Components/AdminComponents/Customers.jsx'
import { Route, Routes, Navigate } from "react-router-dom"
import Products from './Components/AdminComponents/Products.jsx'
import Statistics from './Components/AdminComponents/Statistics.jsx'
import CustomerHomePage from './Components/CustomerComponents/CustomerHomePage.jsx'
import Items from './Components/CustomerComponents/Items.jsx'
import MyOrders from './Components/CustomerComponents/MyOrders.jsx'
import MyAccount from './Components/CustomerComponents/MyAccount.jsx'
import ProtectedRoute from './Components/ProtectedRoute.jsx'
import CustomersProducts from "./Components/CustomerComponents/CustomersProducts.jsx";


function App() {

  return (
    <div>
      {/* ROUTS: */}
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<LogIn />} />
        <Route path="/registration" element={<Registration />} />

        <Route element={<ProtectedRoute allowedRole="admin" />}>
          <Route path={"/admin"} element={<AdminHomePage />}>
            <Route path="categories" element={<Categories />} />
            <Route path="products" element={<Products />} />
            <Route path="customers" element={<Customers />} />
            <Route path="statistics" element={<Statistics />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRole="user" />}>
          <Route path={"/customer/:uid"} element={<CustomerHomePage />}>
            <Route path="items" element={<CustomersProducts />} />
            <Route path="orders" element={<MyOrders />} />
            <Route path="account" element={<MyAccount />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App
