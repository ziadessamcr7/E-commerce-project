import './App.css';
import { RouterProvider, createBrowserRouter, useNavigate } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import Categories from './Components/Categories/Categories';
import Brands from './Components/Brands/Brands';
import NotFound from './Components/NotFound/NotFound';
import AuthProvider from './Components/Context/Authentication';
import Profile from './Components/Profile/Profile';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CartContextProvider } from './Components/Context/CartContext';
import Cart from './Components/Cart/Cart';
import { Toaster } from 'react-hot-toast';
import Wishlist from './Components/Wishlist/Wishlist';
import Payment from './Components/Payment/Payment';
import AllOrders from './Components/AllOrders/AllOrders';
import Products from './Components/Products/Products';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import ResetPassword from './Components/ResetPassword/ResetPassword';


const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '', element: <Layout />, children: [
      { path: '/', element: <Login /> },
      { path: 'e-commerce-login', element: <Login /> },
      { path: 'register', element: <Register /> },
      {
        path: 'productdetails/:id', element: <ProtectedRoute>
          <ProductDetails />
        </ProtectedRoute>
      },
      {
        path: 'home', element: <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      },
      {
        path: 'categories', element: <ProtectedRoute>
          <Categories />
        </ProtectedRoute>
      },
      {
        path: 'brands', element: <ProtectedRoute>
          <Brands />
        </ProtectedRoute>
      },
      {
        path: 'wishlist', element: <ProtectedRoute>
          <Wishlist />
        </ProtectedRoute>
      },
      {
        path: 'payment', element: <ProtectedRoute>
          <Payment />
        </ProtectedRoute>
      },
      {
        path: 'allorders', element: <ProtectedRoute>
          <AllOrders />
        </ProtectedRoute>
      },
      {
        path: 'products', element: <ProtectedRoute>
          <Products />
        </ProtectedRoute>
      },
      {
        path: 'cart', element: <ProtectedRoute>
          <Cart />
        </ProtectedRoute>
      },
      {
        path: 'profile', element: <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      },
      {
        path: 'forgetpassword', element: <ForgetPassword />
      },
      {
        path: 'resetpassword', element: <ResetPassword />
      },

      { path: '*', element: <NotFound /> }


    ]
  }
])


function App() {

  return <>


    <QueryClientProvider client={queryClient}>

      <CartContextProvider>
        <AuthProvider>

          <RouterProvider router={router} />

        </AuthProvider>
      </CartContextProvider>

    </QueryClientProvider>



    <Toaster />

  </>


}

export default App;
