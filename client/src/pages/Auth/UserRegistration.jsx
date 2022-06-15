import {
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Step,
  Stepper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import {
  FormGrid,
  Image,
  StyledButton,
  StyledTextField,
  ColorlibStepIconRoot,
  ColorlibConnector,
  StyledStepLabel,
} from "./Auth.styles";
import desserts from "../../assets/desserts.jpg";
import CakeIcon from "@mui/icons-material/Cake";
import IcecreamIcon from "@mui/icons-material/Icecream";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { useNavigate } from "react-router-dom";
import { registration } from "../../http/userAPI";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const steps = ["Личные данные", "Аккаунт"];

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <CakeIcon />,
    2: <IcecreamIcon />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const UserRegistration = ({ setIsConfectioner, setChooseRole, setIsAuth }) => {
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const [firstStepError, setFirstStepError] = useState(false);
  const [secondStepError, setSecondStepError] = useState(false);
  const [emailError, setEmailError] = useState("");

  const [user, setUser] = useState({});
  const [repeatedPassword, setRepeatedPassword] = useState("");

  const handleClickShowPassword = (e) => {
    setShowPassword(!showPassword);
  };

  const next = async () => {
    if (activeStep !== 1) {
      if (!user?.name || !user?.lastName) {
        return setFirstStepError(true);
      }
      setFirstStepError(false);
      setActiveStep((prev) => prev + 1);
    } else {
      if (
        user?.password === repeatedPassword &&
        emailValidation(user?.email) &&
        user?.password?.length > 7
      ) {
        const res = await registration(user);
        if (res.errorMessage) {
          setEmailError(res.errorMessage);
          return setSecondStepError(true);
        }
        setIsAuth(res);
        navigate("/");
      } else {
        setSecondStepError(true);
      }
    }
  };

  const back = () => {
    if (activeStep !== 0) {
      setActiveStep((prev) => prev - 1);
    } else {
      setIsConfectioner(false);
      setChooseRole(true);
    }
  };

  const emailValidation = (email) => {
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return regex.test(email) === true;
  };

  const handleUserChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    if (firstStepError && user?.name && user?.lastName) {
      setFirstStepError(false);
    }
  };

  const emailErrorMessage = () => {
    if (secondStepError && !emailValidation(user.email)) {
      return "Некорректная эл. почта";
    }
    if (secondStepError && emailError?.includes("эл. почтой")) {
      return emailError;
    }
  };

  const handleChangeRepeatedPassword = (e) => {
    setRepeatedPassword(e.target.value);
    if (
      user?.password === e.target.value &&
      emailValidation(user?.email) &&
      user?.password?.length > 7 &&
      user?.email
    ) {
      setSecondStepError(false);
    }
  };

  return (
    <>
      <FormGrid xs={8} item>
        <Typography variant="h5">Регистрация клиента</Typography>
        <Grid
          container
          rowSpacing={2}
          columnSpacing={4}
          sx={{ marginTop: "0" }}
        >
          <Grid item xs={12}>
            <Stepper
              activeStep={activeStep}
              alternativeLabel
              connector={<ColorlibConnector />}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StyledStepLabel StepIconComponent={ColorlibStepIcon}>
                    {label}
                  </StyledStepLabel>
                </Step>
              ))}
            </Stepper>
          </Grid>
          {activeStep === 0 && (
            <>
              <Grid item xs={6}>
                <StyledTextField
                  fullWidth
                  id="outlined-basic"
                  label="Имя"
                  name="name"
                  value={user?.name || ""}
                  variant="outlined"
                  onChange={handleUserChange}
                  error={firstStepError && !user?.name}
                  helperText={
                    firstStepError &&
                    !user?.name &&
                    "Поле не должно быть пустым"
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <StyledTextField
                  fullWidth
                  id="outlined-basic"
                  label="Фамилия"
                  name="lastName"
                  value={user?.lastName || ""}
                  variant="outlined"
                  onChange={handleUserChange}
                  error={firstStepError && !user?.lastName}
                  helperText={
                    firstStepError &&
                    !user?.lastName &&
                    "Поле не должно быть пустым"
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <StyledTextField
                  fullWidth
                  id="outlined-basic"
                  label="Отчество"
                  name="middleName"
                  value={user?.middleName || ""}
                  variant="outlined"
                  onChange={handleUserChange}
                />
              </Grid>
            </>
          )}
          {activeStep === 1 && (
            <>
              <Grid item xs={6}>
                <StyledTextField
                  fullWidth
                  id="outlined-basic"
                  label="Эл. почта"
                  name="email"
                  value={user?.email || ""}
                  variant="outlined"
                  onChange={handleUserChange}
                  error={
                    emailError?.includes("эл. почтой") ||
                    (secondStepError && !emailValidation(user?.email || ""))
                  }
                  helperText={emailErrorMessage()}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl
                  error={
                    secondStepError &&
                    (user?.password?.length < 8 || !user.password)
                  }
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
                  {secondStepError &&
                    (user?.password?.length < 8 || !user.password) && (
                      <FormHelperText>
                        Пароль должен быть больше 7 символов
                      </FormHelperText>
                    )}
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <StyledTextField
                  fullWidth
                  id="outlined-basic"
                  label="Подтвердите пароль"
                  type={showPassword ? "text" : "password"}
                  name="reapetedPassword"
                  value={repeatedPassword}
                  error={secondStepError && repeatedPassword !== user?.password}
                  helperText={
                    secondStepError &&
                    repeatedPassword !== user?.password &&
                    "Пароли должны совпадать"
                  }
                  onChange={handleChangeRepeatedPassword}
                  variant="outlined"
                />
              </Grid>
            </>
          )}
        </Grid>
        <Grid container justifyContent="space-between" marginY={2}>
          <Grid item>
            <StyledButton variant="primary" onClick={back}>
              Назад
            </StyledButton>
          </Grid>
          <Grid item>
            <StyledButton
              variant="primary"
              onClick={next}
              disabled={
                (activeStep === 0 && firstStepError) ||
                (activeStep === 1 && secondStepError)
              }
            >
              {activeStep !== 1 ? "Далее" : "Зарегистрироваться"}
            </StyledButton>
          </Grid>
        </Grid>
      </FormGrid>
      <Grid xs={4} item>
        <Image src={desserts} right={true} />
      </Grid>
    </>
  );
};

export default UserRegistration;
