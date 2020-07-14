import axios from "axios";
import { REGISTER_SUCCESS, REGISTER_Failed } from "./types";
import { setAlert } from "./alert";
//Create user
export const register = ({ name, email, password }) => (dispatch) => {
  const newUser = {
    name,
    email,
    password,
  };

  axios
    .post("http://localhost:5000/api/users", newUser)
    .then((res) => {
      console.log(res);

      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      setAlert("error", "error");
      dispatch({
        type: REGISTER_Failed,
      });
    });
};
