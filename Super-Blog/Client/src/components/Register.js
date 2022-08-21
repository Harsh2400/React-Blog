import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Grid, Paper, Typography, TextField, Button } from "@material-ui/core";

const Register = () => {
  const paperStyle = { padding: "30px 20px", width: 400, margin: "20px auto" };
  const headerStyle = { margin: 0 };

  const navigate = useNavigate();

  const [data, setData] = React.useState({
    userid: "",
    email: "",
    password: "",
  });

  const [error, setError] = React.useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:4000/register";
      axios.post(url, data).then((res) => {
        if (!res.data.success) {
          setError(res.data.error);
        }
        if (res.data.success) {
          navigate("/login");
        }
      });
    } catch (error) {
      setError("Something went wrong");
    }
  };

  return (
    <Grid>
      <Paper elevation={20} style={paperStyle}>
        <Grid align="center">
          <h2 style={headerStyle}>Register</h2>
          <Typography variant="caption" gutterBottom>
            Please fill this form to create an account !
          </Typography>
        </Grid>

        <form onSubmit={handleSubmit}>
          <TextField
            className="mt-2"
            fullWidth
            label="User ID"
            name="userid"
            placeholder="Enter your desired User ID"
            value={data.userid}
            onChange={handleChange}
            required
          />
          <TextField
            className="mt-2"
            fullWidth
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={data.email}
            onChange={handleChange}
            required
          />
          <TextField
            className="mt-2"
            fullWidth
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={data.password}
            onChange={handleChange}
          />

          <div className="d-flex flex-column mt-3">
            <p className="fst-italic fs-6">
              * A user ID may only contain lowercase letters, underscores &
              numbers.Any other character is not permitted. * First letter must
              be lowercase. * White space are not permitted.
            </p>
            {error && <p className="mb-2 fw-bold text-danger ">{error}</p>}
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Register
            </Button>
          </div>
        </form>
      </Paper>
    </Grid>
  );
};

export default Register;
