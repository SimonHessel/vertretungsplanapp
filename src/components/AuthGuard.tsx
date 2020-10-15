import React, { useContext } from "react";
import { Route, RouteProps, Redirect } from "react-router-dom";

import { AppContext } from "../context/AppProvider";

interface AuthGuardProps extends RouteProps {
  secure: boolean;
  redirect: string;
}
export const AuthGuard: React.FC<AuthGuardProps> = ({
  secure,
  redirect,
  ...rest
}) => {
  const {
    state: { user },
  } = useContext(AppContext);
  return (!!user && secure) || (!user && !secure) ? (
    <Route {...rest} />
  ) : (
    <Redirect to={redirect} />
  );
};
