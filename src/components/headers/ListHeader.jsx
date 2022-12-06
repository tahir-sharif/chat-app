import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/reducers/auth-slice";
import {
  Box,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  IconButton,
  Typography,
  Tooltip,
} from "@mui/material";
import cookie from "react-cookies";
import Logout from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";

const ListHeader = (props) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const { user } = props;

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    // waiting for jwt to remove token
    cookie.remove("jwt");
    setTimeout(() => {
      dispatch(logout());
    }, 500);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          py: 1,
          minHeight: "50px",
        }}
        className="bg-light"
      >
        <Link
          to="/"
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          Chat App
        </Link>
        <Typography sx={{ minWidth: 100 }}>{user.name}</Typography>

        {/* Right Button */}
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }} src={user.profileImage}>
              T
            </Avatar>
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={logoutHandler}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
};
export default ListHeader;
