import React from "react";
import { Typography } from "@material-ui/core";

const Comments = ({ name, comment }) => {
  return (
    <>
      <Typography paragraph>
        {name} : {comment}
      </Typography>
    </>
  );
};

export default Comments;
