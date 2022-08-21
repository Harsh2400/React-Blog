import React from "react";
import axios from "axios";
import { Grid, Paper, Button, TextField } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const Create = ({ userid, _id }) => {
  const paperStyle = {
    padding: 20,
    width: 500,
    margin: "20px auto",
  };

  const navigate = useNavigate();

  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [file, setFile] = React.useState();
  const [error, setError] = React.useState("");

  const [minute, setMinute] = React.useState(0);

  const handleMinute = (e) => {
    if (userid) {
      setMinute(e.target.value);
    } else {
      document.getElementById("close").click();
      navigate("/login");
    }
  };

  const handleTitle = (e) => {
    if (userid) {
      setTitle(e.target.value);
    } else {
      document.getElementById("close").click();
      navigate("/login");
    }
  };

  const handleDescription = (e) => {
    if (userid) {
      setDescription(e.target.value);
    } else {
      document.getElementById("close").click();
      navigate("/login");
    }
  };

  const saveFile = async (e) => {
    if (userid) {
      const image = await image_to_base64(e.target.files[0]);
      setFile(image);
    } else {
      document.getElementById("close").click();
      navigate("/login");
    }
  };

  async function image_to_base64(file) {
    let result_base64 = await new Promise((resolve) => {
      let fileReader = new FileReader();
      fileReader.onload = (e) => resolve(fileReader.result);
      fileReader.onerror = (error) => {
        console.log(error);
        alert("An Error occurred please try again, File might be corrupt");
      };
      if (file && file.type.match("image.*")) {
        fileReader.readAsDataURL(file);
      }
    });
    return result_base64;
  }

  const handleSubmit = async (e) => {
    try {
      const res = await axios.post("http://localhost:4000/upload", {
        title: title,
        description: description,
        image: file,
        _id: _id,
      });
      if (!res.data.success) {
        setError(res.data.error);
      }
      if (res.data.success) {
        setTitle("");
        setDescription("");
        setFile();
        setError("");
        alert("Uploaded");
        document.getElementById("close").click();
        window.location.reload(false);
      }
    } catch (error) {
      setError("Oops Something went wrong");
    }
  };

  const handleSchedule = async (e) => {
    try {
      console.log("hello");
      const res = await axios.post("http://localhost:4000/schedule", {
        title: title,
        description: description,
        image: file,
        _id: _id,
        minute: minute,
      });
      if (!res.data.success) {
        setError(res.data.error);
      }
      if (res.data.success) {
        setTitle("");
        setDescription("");
        setFile();
        setError("");
        document.getElementById("minuteclose").click();
        document.getElementById("close").click();
        alert(`Scheduled to post after ${minute} minute(s)`);
      }
    } catch (error) {
      setError("Oops Something went wrong");
    }
  };

  const handleDraft = async (e) => {
    try {
      const res = await axios.post("http://localhost:4000/draft", {
        title: title,
        description: description,
        image: file,
        _id: _id,
      });
      if (!res.data.success) {
        setError(res.data.error);
      }
      if (res.data.success) {
        setTitle("");
        setDescription("");
        setFile();
        setError("");
        alert("Drafted");
        document.getElementById("close").click();
      }
    } catch (error) {
      setError("Oops Something went wrong");
    }
  };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <div className="d-flex flex-column mt-3">
          {userid ? <h4 className="fst-italic">Hello {userid}</h4> : null}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            What's On Your Mind ?
          </Button>

          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Create a Super(b)log
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    id="close"
                  ></button>
                </div>
                <div className="modal-body">
                  <section>
                    <div className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
                      <form>
                        <TextField
                          className="mt-2"
                          fullWidth
                          label="Title"
                          name="title"
                          value={title}
                          onChange={handleTitle}
                          placeholder="Choose a title"
                          required
                        />
                        <div className="mb-6">
                          <label className="m-2">Description</label>
                          <textarea
                            name="description"
                            rows={5}
                            cols={60}
                            value={description}
                            onChange={handleDescription}
                            placeholder="Write Something"
                            required
                          ></textarea>
                        </div>
                        <div className="mb-6">
                          <label>Select Image</label>
                          <input
                            className="file-input m-2"
                            type="file"
                            onChange={saveFile}
                            accept="image/*"
                            name="image"
                            required
                          />
                        </div>
                        {error && (
                          <p className="mb-2 fw-bold text-danger ">{error}</p>
                        )}
                        <div className="modal-footer d-flex justify-content-between">
                          <Button
                            variant="outlined"
                            color="secondary"
                            data-bs-toggle="modal"
                            data-bs-target="#schedule"
                          >
                            Schedule
                          </Button>
                          <div
                            className="modal fade"
                            id="schedule"
                            tabIndex="-1"
                            aria-labelledby="scheduleLabel"
                            aria-hidden="true"
                          >
                            <div className="modal-dialog">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    id="minuteclose"
                                  ></button>
                                </div>
                                <div className="modal-body">
                                  <TextField
                                    className="mt-2"
                                    fullWidth
                                    label="Minutes"
                                    name="Enter minutes to schedule"
                                    value={minute}
                                    onChange={handleMinute}
                                    placeholder="How much minutes to schedule this post ?"
                                  />
                                </div>
                                <div className="modal-footer d-flex justify-content-between">
                                  <Button
                                    variant="outlined"
                                    color="secondary"
                                    data-bs-dismiss="modal"
                                  >
                                    Close
                                  </Button>
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSchedule}
                                  >
                                    Schedule Now
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <Button variant="outlined" onClick={handleDraft}>
                            Draft
                          </Button>
                          <Button
                            onClick={handleSubmit}
                            variant="contained"
                            color="primary"
                          >
                            Share
                          </Button>
                        </div>
                      </form>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Paper>
    </Grid>
  );
};

export default Create;
