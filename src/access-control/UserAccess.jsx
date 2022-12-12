import { useState } from "react";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch } from "react-redux";
import cookie from "react-cookies";
import { useEffect } from "react";
import { getMe } from "../store/actions/auth";

const UserAccess = ({ children, onLoad = () => {}, onError = () => {} }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const jwt = cookie.load("jwt");

  useEffect(() => {
    if (jwt) {
      dispatch(getMe())
        .then(() => {
          setLoading(false);
          onLoad();
        })
        .catch((error) => {
          console.error(error);
          onError();
        });
    } else {
      setLoading(false);
    }
  }, [jwt, dispatch, onError, onLoad]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      {loading ? <CircularProgress /> : children}
    </Box>
  );
};

export default UserAccess;
