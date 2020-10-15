import React, { useContext, useState } from "react";
import userData from "../data/user.json";
import { AppContext } from "../context/AppProvider";
interface loginProps {}

export const Login: React.FC<loginProps> = () => {
  const { dispatch } = useContext(AppContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // DEMO

    dispatch({
      payload: userData,
      type: "UPDATE_USER",
    });
  };

  return (
    <div className="container">
      <div className="main">
        <form className="login" id="login" onSubmit={submit}>
          <div className="message hidden">
            <p></p>
          </div>
          <input
            type="text"
            id="username"
            placeholder="Benutzername"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            id="password"
            placeholder="Passwort"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input id="submit" className="btn" type="submit" value="Anmelden" />
        </form>
      </div>
    </div>
  );
};
