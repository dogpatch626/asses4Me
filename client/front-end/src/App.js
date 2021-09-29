import logo from './logo.svg';
import {
  BrowserRouter as Router,
  
  Route,
  Redirect
  
} from "react-router-dom";

import CreateIssue from './components/CreateIssue';
import Navbar from './components/Navbar';
import { useMemo, useState } from 'react';
import './App.css';
import { useContext } from 'react';
import { UserContext, JwtContext } from './components/UserContext';
import Home from './components/Home';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Account from './components/Account';
import ProtectedRoutetwo from './components/ProtectedRoutetwo';
import  jwt  from 'jsonwebtoken';
function App() {
  const [user, setUser] = useState(localStorage.getItem('user')||null)
  const value = useMemo(()=>({user,setUser}), [user,setUser])
  const [jwtTok, setJwt] = useState(localStorage.getItem('Jwt')||null)
  const jwtVal= useMemo(()=>({jwt,setJwt}), [jwt,setJwt])
  const [_id, setId] = useState(localStorage.getItem('_id')||null)
  const idVal= useMemo(()=>({_id,setId}), [_id,setId])
 
 
  return (
    <div className="App">
      <Router>
        
     <UserContext.Provider value={ value}>
      <JwtContext.Provider value={jwtVal}>
        {user? <Navbar />:<fragment />}
        <Route exact path="/" component={Login} />
       {/* {user? <Redirect to='/home' />: <Route exact path="/" component={Login} />} */}
      <ProtectedRoute exact path='/home' component={Home} />
      <ProtectedRoute exact path='/create' component={CreateIssue} />
      <ProtectedRoutetwo exact path='/account' component={Account} />
       </JwtContext.Provider>
     </UserContext.Provider>
     </Router>
    </div>
  );
}

export default App;
