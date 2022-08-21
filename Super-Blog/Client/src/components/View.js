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
} from "@material-ui/core";
import { ChatOutlined } from "@material-ui/icons";

//import { NavLink } from "react-router-dom";

import Comments from "./Comment";

const View = ({
  id,
  image,
  title,
  description,
  userid,
  name,
  comments,
  creator,
}) => {
  const paperStyle = {
    padding: 20,
    width: 450,
    margin: "20px auto",
  };

  //const navigate = useNavigate();

  const [expanded, setExpanded] = React.useState(false);
  const [comment, setComment] = React.useState("");

  const handleChange = (e) => {
    setComment(e.target.value);
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
            <div className="m-3">
              <h6 className="fw=bold">Posted By : {creator}</h6>
            </div>
            <CardMedia component="img" height="250" image={image} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {description}
              </Typography>
            </CardContent>
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
