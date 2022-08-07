import React from 'react';
import './App.scss';
import Home from './UI/Pages/Home/Home.jsx';
import AdminLogin from './UI/Pages/AdminLogin/AdminLogin.jsx';
import UserLogin from './UI/Pages/UserLogin/UserLogin.jsx';
import AdminDashboard from './UI/Pages/AdminDashboard/AdminDashboard.jsx';
import UserDashboard from './UI/Pages/UserDashboard/UserDashboard.jsx';
import CreateUser from './UI/Pages/CreateUser/CreateUser.jsx';
import Navbar from './UI/Components/Navbar/Navbar.jsx';
import Footer from './UI/Components/Footer/Footer.jsx';
import SingleProduct from './UI/Pages/SingleProduct/SingleProduct';
import CategoryView from './UI/Pages/CategoryView/CategoryView';

import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div className='App-Main'>
      <div className='App-Background' />
      <div className='App-Content'>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/admin-login' element={<AdminLogin />} />
          <Route exact path='/user-login' element={<UserLogin />} />
          <Route exact path='/admin-dashboard' element={<AdminDashboard />} />
          <Route exact path='/user-dashboard' element={<UserDashboard />} />
          <Route exact path='/create-user' element={<CreateUser />} />
          <Route exact path='/product' element={<SingleProduct />} />
          <Route exact path='/category' element={<CategoryView />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
};

export default App;
