import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import ProductDetailPage from './pages/productDetails/ProductDetailPage';
import Cart from './pages/cart/Cart';
import CategoriesPage from './pages/categories/CategoriesPage';
import ProductsPage from './pages/productsPage/ProductsPage';
import { useSelector } from 'react-redux';

function App() {
  const user = useSelector(state => state.auth.user);
  console.log(user);

  
  return (
    <>
    <Router>
      <Switch>
      <Route path='/' exact >
        <Home />
      </Route>

      <Route path='/login'>
       {user ? <Redirect to='/' /> : <Login />}
      </Route>

      <Route path='/register'>
        {user ? <Redirect to='/' /> : <Register />}
      </Route>

      <Route path='/productdetailpage/:productid'>
        <ProductDetailPage />
      </Route>

      <Route path='/productspage'>
        <ProductsPage />
      </Route>

      <Route path='/cart/:userid'>
       { !user ? <Redirect to='/' /> : <Cart />}
      </Route>

      <Route path='/categoriespage'>
        <CategoriesPage />
      </Route>
      </Switch>
      </Router>
    </>
  );
}

export default App;
