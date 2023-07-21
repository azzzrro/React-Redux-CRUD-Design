import './App.css';
import signupPage from './pages/user/signup';
import adminLoginPage from './pages/admin/login';
import adminHomePage from './pages/admin/home';
import homePage from './pages/user/home';
import LoginPage from './pages/user/login';
import {BrowserRouter,Routes,Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
       <Route Component={LoginPage} path='/'/>
       <Route Component={signupPage} path='/signup' />
       <Route Component={homePage} path='/home'/>
       <Route Component={adminLoginPage} path='/admin' />
       <Route Component={adminHomePage} path='/dashboard' />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
