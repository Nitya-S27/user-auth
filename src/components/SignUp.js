import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import "./styles.scss";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const [input, setInput] = useState({
    username: "",
    password: "",
    email: "",
    age: "",
  });

  const inputChangeHandler = (event) => {
    setInput((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };

  const signupHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (
      input.password.trim().length >= 8 &&
      input.email.includes("@") &&
      input.email.includes(".")
    ) {
      await axios
        .post(
          "https://react-http-81f2f-default-rtdb.firebaseio.com/users.json",
          input
        )
        .then((response) => {
          setIsLoading(false);
          localStorage.setItem("user", JSON.stringify(response.data));
          history.push("/home");
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
        });
    } else {
      alert("Password should be greater than 8 characters without space!!!");
    }
  };

  return (
    <div className="signUpWrapper">
      {isLoading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : (
        <form onSubmit={signupHandler}>
          <p>SignUp</p>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            onChange={inputChangeHandler}
            type="text"
            value={input.username}
            name="username"
            autocomplete="off"
            required
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            onChange={inputChangeHandler}
            type="password"
            value={input.password}
            name="password"
            autocomplete="off"
            required
          />
          <label htmlFor="email">E-Mail</label>
          <input
            id="email"
            onChange={inputChangeHandler}
            type="email"
            value={input.email}
            name="email"
            autocomplete="off"
            required
          />
          <label htmlFor="age">Age</label>
          <input
            id="age"
            onChange={inputChangeHandler}
            type="number"
            min="0"
            value={input.age}
            name="age"
            autocomplete="off"
            required
          />
          <button type="submit">SignUp</button>
          <Link to="/login">Already Registered? Login</Link>
        </form>
      )}
    </div>
  );
};

export default SignUp;
