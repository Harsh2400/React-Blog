import React from "react";
import axios from "axios";
import {
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Collapse,
  TextField,
  Button,
} from "@material-ui/core";
import { DeleteOutline } from "@material-ui/icons";
import { ChatOutlined } from "@material-ui/icons";

//import { NavLink } from "react-router-dom";

import Comments from "./Comment";

const View = ({ id, image, title, description, userid, name, comments }) => {
  const paperStyle = {
    padding: 20,
    width: 450,
    margin: "20px auto",
  };

  //const navigate = useNavigate();
  const [localTitle, setTitle] = React.useState(title);
  const [desc, setDesc] = React.useState(description);

  const [expanded, setExpanded] = React.useState(false);
  const [comment, setComment] = React.useState("");
  const [change, setChange] = React.useState(false);

  const handleDelete = (e) => {
    e.preventDefault();
    try {
      axios
        .post("http://localhost:4000/delete", {
          _id: id,
        })
        .then((res) => {
          if (res.data.success) {
            alert("Your post has been deleted");
            window.location.reload(false);
          } else {
            return;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
    setChange(true);
  };

  const handleDesc = (e) => {
    setDesc(e.target.value);
    setChange(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    try {
      axios
        .post("http://localhost:4000/update", {
          _id: id,
          title: localTitle,
          description: desc,
        })
        .then((res) => {
          if (res.data.success) {
            alert("Your post has been updated");
            window.location.reload(false);
          } else {
            return;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    if (e.key === "Enter") {
      console.log("clicked");
      axios
        .post("http://localhost:4000/comment", {
          _id: id,
          comment: comment,
          name: name,
        })
        .then((res) => {
          if (res.data.success) {
            console.log("hello");
            setComment("");
            window.location.reload(false);
          } else {
            return;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <div className="d-flex flex-column mt-3">
          <Card sx={{ maxWidth: 345 }}>
            <div className="d-flex justify-content-end m-2">
              <DeleteOutline onClick={handleDelete} />
            </div>
            <CardMedia component="img" height="250" image={image} />
            <CardContent>
              <TextField
                fullWidth
                label="Title"
                name="title"
                type="text"
                value={localTitle}
                onChange={handleTitle}
              >
                {" "}
              </TextField>{" "}
              <br />
              <br />
              <TextField
                fullWidth
                label="Description"
                name="desc"
                type="text"
                value={desc}
                onChange={handleDesc}
                multiline={true}
              >
                {" "}
              </TextField>
            </CardContent>
            {change === true ? (
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleUpdate}
              >
                Save Changes
              </Button>
            ) : null}
            <CardActions>
              <ChatOutlined onClick={handleExpandClick} />
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <div className="m-2">
                <Typography gutterBottom variant="h6">
                  Comments
                </Typography>
                <TextField
                  fullWidth
                  label="Add comment"
                  name="comment"
                  type="text"
                  value={comment}
                  onChange={handleChange}
                  onKeyPress={handleSubmit}
                  multiline={true}
                  //   inputProps={{ readOnly: true }}
                >
                  {" "}
                </TextField>

                {comments?.map((comment) => (
                  <Comments
                    key={comment._id}
                    name={comment.name}
                    comment={comment.comment}
                  />
                ))}
              </div>
            </Collapse>
          </Card>
        </div>
      </Paper>
    </Grid>
  );
};

export default View;
