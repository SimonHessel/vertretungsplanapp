import React, { useState } from "react";
import { User } from "../interfaces/User";

interface loginProps {
  updateUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const Login: React.FC<loginProps> = ({ updateUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // DEMO

    const res = await fetch("/user.json", {
      // method: "POST",
      // body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200) updateUser(await res.json());
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
