import React, { useState } from 'react'
import Login from './Login';
import Admin from './Admin';
import { useHttpClient } from '../../shared/hooks/http-hook';

const AdminData = props => {
  const { sendRequest } = useHttpClient();
  const [loggedIn, setLoggedIn] = useState(false); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const loginSubmithandler = async event => {
    event.preventDefault();
    try {
      const response = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/admin/login",
        'POST',
        JSON.stringify({
          email: email,
          password: password
        }),
        { 'Content-Type': 'application/json' }
      );
      setLoggedIn(response);
    } catch (err) {}
  }

        return (
            <>
            {loggedIn ? (
               <Admin />
            ) : (
              <Login loginHandler={loginSubmithandler}
              setEmail={setEmail}
              setPassword={setPassword}
              email={email}
              password={password} />
            )}
            </>
        )
}

export default AdminData;
