import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import "./login.scss";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      history.push("/home");
    }
  }, [history]);

  const [loginInput, setLoginInput] = useState({
    username: "",
    password: "",
  });

  const inputChangeHandler = (event) => {
    setLoginInput((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    await axios
      .get("https://react-http-81f2f-default-rtdb.firebaseio.com/users.json")
      .then((response) => {
        setIsLoading(false);
        let userFound = false;
        let users = response.data;
        for (let user in users) {
          if (
            users[user]["username"] === `${loginInput.username}` &&
            users[user]["password"] === `${loginInput.password}`
          ) {
            localStorage.setItem("user", JSON.stringify(users[user]));
            userFound = true;
          }
        }
        if (userFound) {
          setIsLoading(false);
          history.push("/home");
        } else {
          alert("Invalid Credentials");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  return (
    <div className="loginWrapper">
      {isLoading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : (
        <form onSubmit={formSubmitHandler}>
          <p>Login</p>
          <label htmlFor="username">Username</label>
          <input
            onChange={inputChangeHandler}
            type="text"
            value={loginInput.username}
            name="username"
            autocomplete="off"
            required
          />
          <label htmlFor="password">Password</label>
          <input
            onChange={inputChangeHandler}
            type="password"
            value={loginInput.password}
            name="password"
            autocomplete="off"
            required
          />
          <button type="submit">Login</button>
          <Link to="/signup">New User? SignUp yourself</Link>
        </form>
      )}
    </div>
  );
};

export default Login;
