import './App.css';
import signupPage from './pages/user/signup';
import adminLoginPage from './pages/admin/login';
import adminHomePage from './pages/admin/home';
import homePage from './pages/user/home';
import LoginPage from './pages/user/login';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import profileUpdate from './pages/user/profileUpdate';
import AdminUpdatePage from './pages/admin/update';
import AdminAddUser from './pages/admin/addUser';

function App() {
  const token = localStorage.getItem('token')
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
       <Route Component={token? homePage: LoginPage} path='/'/>
       <Route Component={token? homePage: signupPage} path='/signup'/>
       <Route Component={token? homePage: LoginPage} path='/home'/>
       <Route Component={profileUpdate} path='/profile-update' />
       <Route Component={adminLoginPage} path='/admin' />
       <Route Component={adminHomePage} path='/dashboard' />
       <Route Component={AdminUpdatePage} path='/admin-update' />
       <Route Component={AdminAddUser} path='/admin-addUser' />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
