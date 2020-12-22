import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import { ChatView } from "../views/ChatView";
import { AuthRouter } from "./AuthRouter";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";

export const AppRouter = () => {

  const { auth, verifyToken } = useContext(AuthContext);


  /* 
    Each time app refreshes this has to verify token exists
  */
  useEffect( () => { 
    verifyToken();
  },[verifyToken]);

  if( auth.checking ){
    return <h1> Wait please </h1>
  }

  return (
    <Router>
      <div>               
          <Switch>            
            <PublicRoute 
              isAuthenticated={ auth.logged}
              path="/auth" 
              component={ AuthRouter } 
            />
            <PrivateRoute
              isAuthenticated={ auth.logged}
              path="/" 
              component={ ChatView }
            />            
            <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};
