import React from "react";
import axios from "axios";
import {
  Grid,
  Paper,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Button,
} from "@material-ui/core";
import { DeleteOutline } from "@material-ui/icons";

const View = ({ id, image, title, description, userid, name, comments }) => {
  const paperStyle = {
    padding: 20,
    width: 450,
    margin: "20px auto",
  };

  //const navigate = useNavigate();
  const [localTitle, setTitle] = React.useState(title);
  const [desc, setDesc] = React.useState(description);
  const [change, setChange] = React.useState(false);

  const handleDelete = (e) => {
    e.preventDefault();
    try {
      axios
        .post("http://localhost:4000/deletedraft", {
          _id: id,
        })
        .then((res) => {
          if (res.data.success) {
            alert("Your draft has been deleted");
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

  const handleTitle = (e) => {
    setTitle(e.target.value);
    setChange(true);
  };

  const handleDesc = (e) => {
    setDesc(e.target.value);
    setChange(true);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    try {
      axios
        .post("http://localhost:4000/draftupload", {
          _id: id,
          userid: userid,
          image: image,
          title: localTitle,
          description: desc,
        })
        .then((res) => {
          if (res.data.success) {
            alert("Your blog has been posted");
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

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <div className="d-flex flex-column mt-3">
          <Card sx={{ maxWidth: 345 }}>
            <div className="d-flex justify-content-end m-2">
              <DeleteOutline className="m-2" onClick={handleDelete} />
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
                onClick={handleUpload}
              >
                Save & Share
              </Button>
            ) : null}
          </Card>
        </div>
      </Paper>
    </Grid>
  );
};

export default View;
