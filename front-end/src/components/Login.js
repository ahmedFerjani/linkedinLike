import React, { useState } from "react";

export default function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(loginData);
  };

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <input
        type="email"
        placeholder="Email Address"
        name="email"
        onChange={(e) => onChange(e)}
        value={loginData.email}
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        onChange={(e) => onChange(e)}
        value={loginData.password}
      />
      <button type="submit">Login</button>
      <div className="forget">
        Forgot your password? <a href="#.">Click Here</a>
      </div>
    </form>
  );
}
