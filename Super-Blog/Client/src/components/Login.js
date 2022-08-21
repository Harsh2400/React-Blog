import React from "react";
import axios from "axios";
import { Grid, Paper, TextField, Button, Typography } from "@material-ui/core";
import { NavLink, useNavigate } from "react-router-dom";
import { login } from "../features/userSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const paperStyle = {
    padding: 20,
    width: 400,
    margin: "20px auto",
  };

  const navigate = useNavigate();

  const [data, setData] = React.useState({ userid: "", password: "" });
  const [error, setError] = React.useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:4000/login";
      axios.post(url, data).then((res) => {
        if (!res.data.success) {
          setError(res.data.error);
        }
        if (res.data.success) {
          console.log(res.data.success);
          dispatch(
            login({
              _id: res.data.success._id,
              userid: res.data.success.userid,
              email: res.data.success.email,
            })
          );
          navigate("/");
        }
      });
    } catch (error) {
      setError("Something went wrong");
    }
  };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <h2>Log In</h2>
        </Grid>
        <form onSubmit={handleSubmit}>
          <TextField
            label="User ID"
            placeholder="Your user ID"
            name="userid"
            value={data.userid}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Password"
            placeholder="Your password"
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            fullWidth
            required
          />
          <div className="d-flex flex-column mt-3">
            {error && <p className="mb-2 fw-bold text-danger ">{error}</p>}
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Log In
            </Button>
          </div>
        </form>
        <Typography>
          {" "}
          Don't have an account ?
          <NavLink className="fst-italic" to="/register">
            Register
          </NavLink>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Login;
