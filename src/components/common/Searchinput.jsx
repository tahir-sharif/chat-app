import React, { useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import SearchIcon from "@mui/icons-material/Search";
import "./searchbox.scss";
import { Box } from "@mui/system";

export default function SearchInput(props) {
  const [open, setOpen] = useState(false);
  const inputRef = useRef();

  const openHandler = () => {
    if (inputRef.current.value) {
      setOpen(true);
    }
    props.onOpen();
  };

  const closeHandler = () => {
    setOpen(false);
    props.onClose();
  };

  let _search_timeout;
  const onChangeHandler = ({ target: { value } }) => {
    clearTimeout(_search_timeout);
    props.onImmediateChange(value);
    _search_timeout = setTimeout(() => {
      props.onChange(value);
    }, 800);
    if (!value) {
      setOpen(false);
    }
  };

  return (
    <Autocomplete
      className="bg-light searchbox"
      fullWidth
      open={open}
      onOpen={openHandler}
      onClose={closeHandler}
      isOptionEqualToValue={(user, value) => user._id === value._id}
      getOptionLabel={(user) => user.name}
      options={props.options}
      loading={props.loading}
      onChange={props.onselect}
      renderOption={(props, user) => {
        return (
          <Box
            component="li"
            key={user._id}
            // sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...props}
          >
            <div className="profile-img-wrapper">
              <img
                loading="lazy"
                src={user.profileImage}
                className="search-profile"
                alt="profile"
              />
            </div>
            {user.name}
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField
          inputRef={inputRef}
          {...params}
          sx={{
            input: {
              color: "white",
            },
          }}
          placeholder="Search for a user"
          variant="filled"
          onChange={onChangeHandler}
          InputProps={{
            ...params.InputProps,
            startAdornment: <SearchIcon color="white" />,
            endAdornment: props.loading ? (
              <CircularProgress color="inherit" size={20} />
            ) : null,
          }}
        />
      )}
    />
  );
}
