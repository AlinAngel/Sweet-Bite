import { Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import {
  FormGrid,
  Image,
  AuthContainer,
  RegButton,
  RegText,
  StyledButton,
  StyledPaper,
  StyledTextField,
} from "./Auth.styles";
import desserts from "../../assets/desserts.jpg";
import { useNavigate } from "react-router-dom";
import ConfectionerRegistration from "./ConfectionerRegistration";
import LoginForm from "./Login";
import UserRegistration from "./UserRegistration";
import Registration from "./Registration";

const Auth = ({ isLoginPage, setIsAuth }) => {
  const navigate = useNavigate();
  const [isConfectioner, setIsConfectioner] = useState(false);
  const [chooseRole, setChooseRole] = useState(true); // выбор типа регистрации

  const renderPage = () => {
    if (isLoginPage) {
      return <LoginForm setIsAuth={setIsAuth} />;
    } else if (chooseRole) {
      return (
        <Registration
          setChooseRole={setChooseRole}
          setIsConfectioner={setIsConfectioner}
        />
      );
    } else if (!chooseRole && !isConfectioner) {
      return (
        <UserRegistration
          setChooseRole={setChooseRole}
          setIsConfectioner={setIsConfectioner}
          setIsAuth={setIsAuth}
        />
      );
    } else if (!chooseRole && isConfectioner) {
      return (
        <ConfectionerRegistration
          setChooseRole={setChooseRole}
          setIsConfectioner={setIsConfectioner}
          setIsAuth={setIsAuth}
        />
      );
    }
  };

  return (
    <AuthContainer>
      <StyledPaper elevation={5}>
        <Grid container sx={{ height: "100%" }}>
          {renderPage()}
        </Grid>
      </StyledPaper>
    </AuthContainer>
  );
};

export default Auth;
