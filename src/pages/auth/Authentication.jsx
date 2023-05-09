import React, { useState } from 'react';
import { Box, Button, CircularProgress, Grow, Typography } from '@mui/material';
import TextField from '../../components/TextFields/TextField';
import PasswordInput from '../../components/common/PasswordInput';
import { useDispatch } from 'react-redux';
import { validators } from './validators';
import {
  checkIfUserCanRegister,
  login,
  register
} from '../../store/actions/auth';
import { useLocation } from 'react-router-dom';
import './auth.scss';

const Authentication = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const prevHistoryPath = location.state?.navigateTo;

  const initialState = {
    name: '',
    userName: '',
    password: '',
    confirmPassword: ''
  };
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [step, setStep] = useState(0);
  const [newUser, setNewUser] = useState(true);

  const finalLoginStep = step === 1;
  const finalRegisterStep = step === 2;

  const registerHandler = async () => {
    setLoading('Creating your account.. ❤ 🔥');
    try {
      await dispatch(
        register({ ...data, navigateTo: prevHistoryPath })
      ).unwrap();
    } catch (e) {
      setError(
        typeof e == 'string'
          ? e
          : 'something went wrong , try Reload your page !'
      );
      setLoading(false);
    }
  };

  const loginHanlder = async () => {
    setLoading('Signing in to your account.. ❤');
    try {
      await dispatch(login({ ...data, navigateTo: prevHistoryPath })).unwrap();
    } catch (e) {
      console.log(e);
      setError(
        typeof e == 'string'
          ? e
          : 'something went wrong , try Reload your page !'
      );
      setLoading(false);
    }
  };

  const changeStepHandler = (_, back = false) => {
    setError(false);
    if (back) {
      return setStep((prev) => prev - 1);
    }
    if (newUser) {
      // Register
      const error = validators.registerValidators[step](data);
      if (error) {
        setError(error);
      } else {
        setError(false);
        if (finalRegisterStep) {
          registerHandler();
        } else setStep(step + 1);
      }
    } else {
      // Login
      const error = validators.loginValidators[step](data);
      if (error) {
        setError(error);
      } else {
        setError(false);
        if (finalLoginStep) {
          loginHanlder();
        } else setStep(step + 1);
      }
    }
  };

  const checkifNewUserHandler = () => {
    const error = validators.registerValidators[step](data);
    if (error) {
      setError(error);
    } else {
      setLoading(true);
      dispatch(checkIfUserCanRegister({ userName: data.userName }))
        .then((res) => {
          const { canRegister } = res.payload;
          setNewUser(canRegister);
          setLoading(false);
          changeStepHandler();
        })
        .catch((e) => {
          setError(
            typeof e == 'string' ? e : 'we are sorry , Something went wrong !'
          );
          setLoading(false);
        });
    }
  };

  const onChangeHandler = (e) => {
    let { name, value } = e.target;
    if (name === 'userName') {
      value = value.toLowerCase();
    }
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
    setError(false);
  };

  const handleEnter = (e) => {
    if (e.code === 'Enter') {
      if (step === 0 && !loading) {
        checkifNewUserHandler();
      } else {
        changeStepHandler();
      }
    }
  };

  const loginFields = (
    <>
      {step === 1 && (
        <Grow in={true} timeout={1000}>
          <div>
            <Typography>Login</Typography>
            <Typography fontSize={13} mb={3}>
              Welcome again 😀 plz verify yourself !
            </Typography>
            <PasswordInput
              autoFocus
              fullWidth
              placeholder="Enter your Password"
              value={data.password}
              name="password"
              onChange={onChangeHandler}
              onKeyDown={handleEnter}
              error={!!error}
              helperText={error}
            />
          </div>
        </Grow>
      )}
    </>
  );

  const registerFields = (
    <>
      {step === 1 && (
        <Grow in={true} timeout={1000}>
          <div>
            <Typography>Register</Typography>
            <Typography fontSize={13} mb={3}>
              you are not in our record 😳 you're most welcome !
            </Typography>
            <TextField
              autoFocus
              fullWidth
              value={data.name}
              placeholder="What's Your Name ?"
              name="name"
              onChange={onChangeHandler}
              onKeyDown={handleEnter}
              error={error}
            />
          </div>
        </Grow>
      )}

      {step === 2 && (
        <Grow in={true} timeout={1000}>
          <div>
            <Typography fontSize={13} mb={3}>
              Now Create a Password 💪 and register yourself !
            </Typography>
            <PasswordInput
              autoFocus
              fullWidth
              placeholder="Create a Password"
              value={data.password}
              name="password"
              onChange={onChangeHandler}
              onKeyDown={handleEnter}
              error={!!error}
              helperText={error}
              style={{ marginBottom: '20px' }}
            />
            <PasswordInput
              fullWidth
              placeholder="Confirm Password"
              value={data.confirmPassword}
              name="confirmPassword"
              onChange={onChangeHandler}
              onKeyDown={handleEnter}
              error={!!error}
              helperText={error}
            />
          </div>
        </Grow>
      )}
    </>
  );

  return (
    <Box className="page-center">
      <Box className="info-wrapper">
        <Box sx={{ width: 1 }}>
          {step === 0 && (
            <Grow in={true} timeout={1000}>
              <div>
                <Typography marginBottom={2}>Chat App</Typography>
                <TextField
                  autoFocus
                  fullWidth
                  value={data.userName}
                  placeholder="Enter Your Username"
                  name="userName"
                  onChange={onChangeHandler}
                  onKeyDown={handleEnter}
                  error={error}
                />
                <Typography variant="caption" color="#8fa100">
                  For Example Tahir.shareef ❤️
                  <p>Note : It will be Your Authentication username</p>
                </Typography>
              </div>
            </Grow>
          )}

          {newUser ? registerFields : loginFields}
        </Box>

        {loading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: 1
            }}
          >
            <CircularProgress size={30} />
            <p>{loading}</p>
          </Box>
        ) : step === 0 ? (
          <Button
            onClick={checkifNewUserHandler}
            sx={{ justifyContent: 'flex-end' }}
          >
            {loading ? <CircularProgress size={30} /> : 'Continue'}
          </Button>
        ) : (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: 1,
              mt: 2
            }}
          >
            <Button onClick={() => changeStepHandler(null, true)}>Back</Button>
            <Button onClick={changeStepHandler}>
              {newUser ? (
                <>{finalRegisterStep ? 'Register' : 'Continue'}</>
              ) : (
                <>{finalLoginStep ? 'Login' : 'Continue'}</>
              )}
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Authentication;
