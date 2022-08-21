import React from "react";
import axios from "axios";
import { Grid, Paper, Button } from "@material-ui/core";
import { NavLink } from "react-router-dom";

import DraftView from "./DraftView";

const Draft = ({ userid, email, id }) => {
  const paperStyle = {
    padding: 20,
    width: 500,
    margin: "20px auto",
  };

  const [data, setdata] = React.useState([]);

  React.useEffect(() => {
    axios
      .post("http://localhost:4000/mydraft", { id: id })
      .then((res) => {
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
              <h4>Log In first to View Drafts </h4>
            </NavLink>
          </div>
        </Paper>
      </Grid>
    );
  }

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <div className="d-flex flex-column mt-1">
          <Button variant="outlined" color="primary" fullWidth>
            {userid}, Here is Your Drafts
          </Button>
          <div className="d-flex justify-content-center">
            <p className="fw-bold text-decoration-underline mt-3 ">
              You can Edit & Share your drafts here
            </p>
          </div>
          <p className="fw-bold mt-3 ">*First make any changes to Upload*</p>
        </div>
        <div className="mt-3">
          {data?.map((article) => (
            <DraftView
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

export default Draft;
