import React from "react";
import { TextField } from "@mui/material";

const TextFieldComponent = (props) => {
  return (
    <TextField
      InputProps={{ autoComplete: "nope" }}
      sx={{
        "& .MuiInput-root:before": {
          borderBottomColor: "#ffffff63 !important",
        },
        "&:hover .MuiInput-root:before": {
          borderBottomColor: "#ffffff63",
        },
        "& .MuiInput-underline:after": {
          borderBottomColor: "#fff",
        },
      }
    }
      variant="standard"
      inputProps={{
        sx: {
          color: "#fff",
        },
      }}
      {...props}
      helperText={props.error}
      error={props.error && props.error.toString().length !== 0}
    />
  );
};

export default TextFieldComponent;
