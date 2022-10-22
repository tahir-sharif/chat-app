import React, { useState } from "react";
import { Box, Grid, IconButton, TextField } from "@mui/material";
import "./style.scss";

const MessageFooter = (props) => {
  const [text, setText] = useState("");

  const sendMessageHandler = () => {
    if (text) {
      props.onSend(text);
      setText("");
    }
  };

  const sendWithEnterKey = (e) => {
    if (e.keyCode === 13) {
      sendMessageHandler();
    }
  };

  return (
    <Box className="footer">
      <Grid container>
        <Grid item xs={1} md={1}>
          <IconButton className="emoji-btn">
            <div className="emoji-icon"></div>
          </IconButton>
        </Grid>
        <Grid item xs={9} md={10}>
          <TextField
            autoFocus={!text}
            fullWidth
            value={text}
            autoComplete="off"
            onChange={(e) => setText(e.target.value)}
            onKeyDown={sendWithEnterKey}
            placeholder="Type Message"
            variant="standard"
          />
        </Grid>
        <Grid item xs={2} md={1}>
          <IconButton
            className="emoji-btn send-btn"
            disabled={!text}
            onClick={sendMessageHandler}
          >
            <div className="emoji-icon"></div>
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MessageFooter;
