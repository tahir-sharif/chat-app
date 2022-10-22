import { useState } from "react";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch } from "react-redux";
import cookie from "react-cookies";
import { useEffect } from "react";
import { getMe } from "../store/actions/auth";

const UserAccess = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const jwt = cookie.load("jwt");

  useEffect(() => {
    if (jwt) {
      dispatch(getMe()).then(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [jwt, dispatch]);

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
