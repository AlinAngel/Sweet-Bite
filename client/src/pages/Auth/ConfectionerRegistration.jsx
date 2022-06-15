import {
  Autocomplete,
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
import React, { useEffect, useState } from "react";
import InputMask from "react-input-mask";
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
import {
  confectionerRegistration,
  getSocialMediaTypes,
} from "../../http/userAPI";
import cities from "../../json/cities.json";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const steps = ["Личные данные", "Контакты", "Аккаунт"];

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <CakeIcon />,
    2: <IcecreamIcon />,
    3: <RestaurantIcon />,
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

const ConfectionerRegistration = ({
  setIsConfectioner,
  setChooseRole,
  setIsAuth,
}) => {
  const [activeStep, setActiveStep] = useState(0);

  const [firstStepError, setFirstStepError] = useState(false);
  const [secondStepError, setSecondStepError] = useState(false);
  const [thirdStepError, setThirdStepError] = useState(false);
  const [emailError, setEmailError] = useState("");

  const [user, setUser] = useState({});
  const [socialMedia, setSocialMedia] = useState({
    vk: "",
    whatsApp: "",
    telegram: "",
  });
  const [repeatedPassword, setRepeatedPassword] = useState("");

  const navigate = useNavigate();

  const [socialMediaTypesList, setSocialMediaTypesList] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const types = await getSocialMediaTypes();
        setSocialMediaTypesList(types);
      } catch (err) {}
    };
    fetchData();
  }, []);

  const handleClickShowPassword = (e) => {
    setShowPassword(!showPassword);
  };

  const next = async () => {
    if (activeStep === 0) {
      if (!user?.city && !user?.name && !user?.lastName) {
        return setFirstStepError(true);
      }
      setFirstStepError(false);
      setActiveStep((prev) => prev + 1);
    } else if (activeStep === 1) {
      if (!user?.phone) {
        return setSecondStepError(true);
      }
      setSecondStepError(false);
      setActiveStep((prev) => prev + 1);
    } else {
      if (
        user?.password === repeatedPassword &&
        emailValidation(user?.email) &&
        user?.password?.length > 7 &&
        user?.email
      ) {
        const res = await confectionerRegistration({
          ...user,
          socialMedia: socialMediaTypesList,
        });
        if (res.errorMessage) {
          setEmailError(res.errorMessage);
          return setThirdStepError(true);
        }
        setIsAuth(res);
        navigate("/");
      } else {
        setThirdStepError(true);
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
    if (firstStepError && user?.name && user?.lastName && user?.city) {
      setFirstStepError(false);
    }
    if (secondStepError && user.phone) {
      setSecondStepError(false);
    }
  };

  const chooseCity = (value) => {
    setUser({ ...user, city: value.city });
    if (firstStepError && user?.name && user?.lastName) {
      setFirstStepError(false);
    }
  };

  const handleChangeSocial = (e) => {
    const index = socialMediaTypesList.findIndex((i) => {
      return i.name === e.target.name;
    });
    let newArr = [...socialMediaTypesList];
    newArr[index].link = e.target.value;
    setSocialMedia({ ...socialMedia, [e.target.name]: e.target.value });
    setSocialMediaTypesList(newArr);
  };

  const handleChangeRepeatedPassword = (e) => {
    setRepeatedPassword(e.target.value);
    if (
      user?.password === e.target.value &&
      emailValidation(user?.email) &&
      user?.password?.length > 7 &&
      user?.email
    ) {
      setThirdStepError(false);
    }
  };

  const emailErrorMessage = () => {
    if (thirdStepError && !emailValidation(user.email)) {
      return "Некорректная эл. почта";
    }
    if (thirdStepError && emailError?.includes("эл. почтой")) {
      return emailError;
    }
  };

  return (
    <>
      <FormGrid xs={8} item>
        <Typography variant="h5">Регистрация кондитера</Typography>
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
              <Grid item xs={6}>
                <Autocomplete
                  getOptionLabel={(option) => option.city}
                  disablePortal
                  id="combo-box-demo"
                  options={cities}
                  onChange={(e, value) => chooseCity(value)}
                  renderInput={(params) => (
                    <StyledTextField
                      {...params}
                      error={firstStepError && !user?.city}
                      helperText={
                        firstStepError &&
                        !user?.city &&
                        "Поле не должно быть пустым"
                      }
                      label="Город"
                    />
                  )}
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
                  label="ВКонтакте"
                  value={socialMedia?.vk || ""}
                  variant="outlined"
                  name="vk"
                  onChange={handleChangeSocial}
                />
              </Grid>
              <Grid item xs={6}>
                <StyledTextField
                  fullWidth
                  id="outlined-basic"
                  label="What`sApp"
                  variant="outlined"
                  value={socialMedia.whatsApp || ""}
                  name="whatsApp"
                  onChange={handleChangeSocial}
                />
              </Grid>
              <Grid item xs={6}>
                <StyledTextField
                  fullWidth
                  id="outlined-basic"
                  label="Telegram"
                  variant="outlined"
                  name="telegram"
                  value={socialMedia.telegram || ""}
                  onChange={handleChangeSocial}
                />
              </Grid>
              <Grid item xs={6}>
                <InputMask
                  mask="+7 (999) 999-99-99"
                  disabled={false}
                  maskChar={"_"}
                  value={user?.phone || ""}
                  onChange={handleUserChange}
                >
                  {() => (
                    <StyledTextField
                      fullWidth
                      id="outlined-basic"
                      label="Номер телефона"
                      name="phone"
                      variant="outlined"
                      error={secondStepError && !user?.phone}
                      helperText={
                        secondStepError &&
                        !user?.phone &&
                        "Поле не должно быть пустым"
                      }
                    />
                  )}
                </InputMask>
              </Grid>
            </>
          )}
          {activeStep === 2 && (
            <>
              <Grid item xs={6}>
                <StyledTextField
                  fullWidth
                  id="outlined-basic"
                  label="Эл. почта"
                  variant="outlined"
                  name="email"
                  value={user?.email || ""}
                  onChange={handleUserChange}
                  error={
                    emailError?.includes("эл. почтой") ||
                    (thirdStepError && !emailValidation(user.email))
                  }
                  helperText={emailErrorMessage()}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl
                  error={
                    thirdStepError &&
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
                  {thirdStepError &&
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
                  name="reapetedPassword"
                  type={showPassword ? "text" : "password"}
                  value={repeatedPassword}
                  error={thirdStepError && repeatedPassword !== user?.password}
                  helperText={
                    thirdStepError &&
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
                (activeStep === 1 && secondStepError) ||
                (activeStep === 2 && thirdStepError)
              }
            >
              {activeStep !== 2 ? "Далее" : "Зарегистрироваться"}
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

export default ConfectionerRegistration;
