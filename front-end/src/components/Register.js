import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { setAlert } from "../actions/alert";
import { register } from "../actions/auth";
import PropTypes from "prop-types";
const Register = (props) => {
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    rpassword: "",
  });

  const onChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (registerData.password !== registerData.rpassword) {
      console.log("password does not match");
      props.setAlert("password does not match", "danger");
    } else {
      //console.log(registerData);
      // const newUser = {
      //   name: registerData.name,
      //   email: registerData.email,
      //   password: registerData.password,
      // };

      // axios
      //   .post("http://localhost:5000/api/users", newUser)
      //   .then((res) => {
      //     console.log(res);
      //   })
      //   .catch((err) => {
      //     console.log(err.request.response);
      //   });
      props.register({
        name: registerData.name,
        email: registerData.email,
        password: registerData.password,
      });
    }
  };
  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <input
        type="text"
        placeholder="Full Name"
        value={registerData.name}
        name="name"
        onChange={(e) => onChange(e)}
      />
      <input
        type="email"
        placeholder="Email Address"
        value={registerData.email}
        name="email"
        onChange={(e) => onChange(e)}
      />
      <input
        type="password"
        placeholder="Password"
        value={registerData.password}
        name="password"
        onChange={(e) => onChange(e)}
      />
      <input
        type="password"
        placeholder="Password"
        value={registerData.rpassword}
        name="rpassword"
        onChange={(e) => onChange(e)}
      />
      <button type="submit">Register</button>
    </form>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
};

export default connect(null, { setAlert, register })(Register);
