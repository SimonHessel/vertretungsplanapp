import React, { useEffect, useState } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { User } from "./interfaces/User";

import { Welcome } from "./pages/Welcome";
import { Main } from "./pages/Main";
import { Login } from "./pages/Login";
import { Settings } from "./pages/Settings";

export const App: React.FC = () => {
  const [user, updateUser] = useState<User | null>(() => {
    const fetchedUser = localStorage.getItem("user");
    if (fetchedUser) return JSON.parse(fetchedUser);
    return null;
  });

  useEffect(() => localStorage.setItem("user", JSON.stringify(user)), [user]);
  return (
    <Router>
      <Switch>
        <Route path="/login">
          {user ? <Redirect to="" /> : <Login updateUser={updateUser} />}
        </Route>
        <Route path="/settings">
          {user ? (
            <Settings updateUser={updateUser} user={user} />
          ) : (
            <Redirect to="login" />
          )}
        </Route>
        <Route path="/welcome">
          {user ? <Redirect to="/" /> : <Welcome />}
        </Route>
        <Route path="/">
          {user ? <Main user={user} /> : <Redirect to="welcome" />}
        </Route>
      </Switch>
    </Router>
  );
};