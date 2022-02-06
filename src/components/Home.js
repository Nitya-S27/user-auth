import { React, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./home.scss";

const Home = () => {
  const history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      history.push("/login");
    }
  }, [history]);

  const logoutHandler = () => {
    localStorage.removeItem("user");
    history.push("/login");
  };

  return (
    <div className="homeWrapper">
      <h1>Congratulations, you are successfully authenticated!</h1>
      <button onClick={logoutHandler}>Logout</button>
    </div>
  );
};

export default Home;
