import { useState } from 'react';
import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getMe } from '../store/actions/auth';

const UserAccess = ({
  children,
  onLoad = () => {},
  onError = () => {},
  jwt
}) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

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
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
      }}
    >
      {loading ? <CircularProgress /> : children}
    </Box>
  );
};

export default UserAccess;
