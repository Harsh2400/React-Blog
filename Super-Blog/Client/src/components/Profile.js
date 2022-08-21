import React from "react";
import axios from "axios";
import { Grid, Paper, Button } from "@material-ui/core";
import { NavLink, useNavigate } from "react-router-dom";

import ProfileView from "./ProfileView";

const Profile = ({ userid, email, id }) => {
  const paperStyle = {
    padding: 20,
    width: 500,
    margin: "20px auto",
  };
  const navigate = useNavigate();

  const [data, setdata] = React.useState([]);

  React.useEffect(() => {
    axios
      .post("http://localhost:4000/myarticle", { id: id })
      .then((res) => {
        //console.log(res.data.success);
        setdata(res.data.success);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  if (!userid) {
    return (
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <div className="d-flex  mt-3 ">
            <NavLink to="/login">
              <h4>Log In first to View your Complete Profile </h4>
            </NavLink>
          </div>
        </Paper>
      </Grid>
    );
  }

  const lookDraft = (e) => {
    navigate("/draft");
  };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <div className="d-flex flex-column mt-1">
          <h4 className="fst-italic">Welcome Back , {userid}</h4>
          <h5>{email}</h5>
          <Button
            variant="outlined"
            color="primary"
            onClick={lookDraft}
            fullWidth
          >
            Check Your Drafts Here
          </Button>
          <div className="d-flex justify-content-center">
            <p className="fw-bold text-decoration-underline mt-3">
              You can Edit your posts here
            </p>
          </div>
          <Button variant="outlined" color="default" fullWidth>
            Your Active Posts
          </Button>
        </div>
        <div className="mt-3">
          {data?.map((article) => (
            <ProfileView
              key={article._id}
              id={article._id}
              image={article.image}
              title={article.title}
              comments={article.comments}
              description={article.description}
              userid={id}
              name={userid}
            />
          ))}
        </div>
      </Paper>
    </Grid>
  );
};

export default Profile;
