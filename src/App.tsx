import React, { useContext, useEffect } from "react";

import { BrowserRouter as Router, Switch } from "react-router-dom";

import { AppProvider } from "./context/AppProvider";

import { AuthGuard } from "./components/AuthGuard";

import { Welcome } from "./pages/Welcome";
import { Main } from "./pages/Main";
import { Login } from "./pages/Login";
import { Settings } from "./pages/Settings";

export const App: React.FC = () => {
  return (
    <AppProvider>
      <Router basename="/vertretungsplanapp">
        <Switch>
          <AuthGuard
            path="/login"
            secure={false}
            redirect="/"
            component={Login}
          />
          <AuthGuard
            path="/welcome"
            secure={false}
            redirect="/"
            component={Welcome}
          />

          <AuthGuard
            path="/settings"
            secure={true}
            redirect="/login"
            component={Settings}
          />
          <AuthGuard
            path="/"
            secure={true}
            redirect="/login"
            component={Main}
          />
        </Switch>
      </Router>
    </AppProvider>
  );
};
