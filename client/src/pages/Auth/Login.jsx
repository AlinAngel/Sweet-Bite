import {
  FilledInput,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FormGrid,
  Image,
  RegButton,
  RegText,
  StyledButton,
  StyledTextField,
} from "./Auth.styles";
import desserts from "../../assets/desserts.jpg";
import { login } from "../../http/userAPI";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const LoginForm = ({ setIsAuth }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [isError, setIsError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [dirtyEmail, setDirtyEmail] = useState(false);
  const [dirtyPassword, setDirtyPassword] = useState(false);

  const handleUserChange = (e) => {
    return setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    if (!emailValidation(user.email)) {
      setDirtyEmail(true);
    }

    if (!user.password) {
      return setDirtyPassword(true);
    }
    setIsError(null);
    setDirtyPassword(false);
    setDirtyEmail(false);
    const res = await login(user);
    if (res.errorMessage) {
      return setIsError(res.errorMessage);
    }
    setIsAuth(res);
    navigate("/desserts");
  };

  const handleClickShowPassword = (e) => {
    setShowPassword(!showPassword);
  };
  const emailValidation = (email) => {
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return regex.test(email) === true;
  };
  const emailErrorMessage = () => {
    if (dirtyEmail && !emailValidation(user.email)) {
      return "Некорректный эл. адрес";
    }
    if (isError?.includes("эл. почта")) {
      return isError;
    }
  };
  return (
    <>
      <Grid xs={4} item>
        <Image src={desserts} />
      </Grid>
      <FormGrid xs={8} item>
        <Typography variant="h5">Авторизация</Typography>
        <Grid
          container
          rowSpacing={2}
          columnSpacing={3}
          justifyContent="center"
          sx={{ marginTop: "0", width: "70%" }}
        >
          <Grid item xs={12}>
            <StyledTextField
              fullWidth
              error={
                isError?.includes("эл. почта") ||
                (dirtyEmail && !emailValidation(user.email))
              }
              id="outlined-basic"
              label="Эл. почта"
              name="email"
              helperText={emailErrorMessage()}
              value={user?.email || ""}
              variant="outlined"
              onChange={handleUserChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl
              error={isError?.includes("пароль") || dirtyPassword}
              fullWidth
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Пароль
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                value={user?.password || ""}
                name="password"
                onChange={handleUserChange}
                label="Пароль"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => handleClickShowPassword()}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {isError?.includes("пароль") && (
                <FormHelperText id="my-helper-text">{isError}</FormHelperText>
              )}
              {dirtyPassword && (
                <FormHelperText id="my-helper-text">
                  Введите пароль
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <StyledButton variant="primary" onClick={() => handleLogin()}>
              Войти
            </StyledButton>
          </Grid>
          <Grid item xs={12}>
            <RegText variant="h6">
              Нет аккаунта?{" "}
              <RegButton onClick={() => navigate("/registration")}>
                Зарегистрироваться
              </RegButton>
            </RegText>
          </Grid>
        </Grid>
      </FormGrid>
    </>
  );
};

export default LoginForm;
