import React, { useContext, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { StoreContext } from "./StoreContext";
import axios from "axios"

const LoginPopup = ({ setShowLogin }) => {
  const { url,setToken } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Log In");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };
  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currState === "Log In") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }
    const response = await axios.post(newUrl,data);
    if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token",response.data.token);
        setShowLogin(false)
    }
    else{
        alert(response.data.message)
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "Log In" ? (
            <></>
          ) : (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              required
              placeholder="Your Name"
            />
          )}

          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            required
            placeholder="Your Email"
          />
          <input
            type="password"
            required
            placeholder="Your Password"
            name="password"
            onChange={onChangeHandler}
            value={data.password}
          />
        </div>
        <button type="submit">
          {currState === "Sign Up" ? "Create account" : "Log In"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" name="" required id="" />
          <p>By Clicking, I agree to the terms of use & privacy policy</p>
        </div>
        {currState === "Log In" ? (
          <p>
            Create a New Account?{" "}
            <span onClick={() => setCurrState("Sign Up")}>Click Here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrState("Log In")}>Login Here</span>{" "}
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
