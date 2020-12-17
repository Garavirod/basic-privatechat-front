import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { ChatView } from "../views/ChatView";
import { AuthRouter } from "./AuthRouter";

export const AppRouter = () => {
  return (
    <Router>
      <div>               
          <Switch>
            <Route path="/auth" component={ AuthRouter }/>
            <Route exact path="/" component={ ChatView }/>
            <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};
