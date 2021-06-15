import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { getCurrentUser } from "./services/auth.service";
import home from "./pages";
import login from "./pages/login";
import review from "./pages/review";
import project from "./pages/project";
import inbox from "./pages/inbox";

const App = () => {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
    } else {
      history.push("/login");
    }
    return () => {
      setCurrentUser(user);
    };
  }, []);

  return (
    <Switch>
      <Route path="/" component={home} exact />
      <Route path="/login" component={login} exact />
      <Route path="/project" component={project} exact />
      <Route path="/review" component={review} exact />
      <Route path="/inbox" component={inbox} exact />
    </Switch>
  );
};

export default App;
