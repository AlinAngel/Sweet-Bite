import { Avatar, Grid, Typography } from "@mui/material";
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
import desserts from "../../assets/assortment-pieces-cake.jpg";
import userAvatar from "../../assets/userLogo.png";
import confectionerAvatar from "../../assets/confectionerLogo.png";
import { useNavigate } from "react-router-dom";

const Registration = ({ setIsConfectioner, setChooseRole }) => {
  const navigate = useNavigate();
  return (
    <>
      <FormGrid xs={8} item>
        <Typography variant="h5" sx={{ marginBottom: "10px" }}>
          Регистрация
        </Typography>
        <Typography variant="h6">
          Выберите, какой аккаунт Вы хотите создать
        </Typography>
        <Grid
          container
          rowSpacing={2}
          columnSpacing={4}
          sx={{ marginTop: "0" }}
        >
          <Grid
            item
            xs={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              alt="Клиент"
              src={userAvatar}
              sx={{ width: 180, height: 180 }}
            />
            <StyledButton
              variant="primary"
              onClick={() => {
                setIsConfectioner(false);
                setChooseRole(false);
              }}
            >
              Клиент
            </StyledButton>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              alt="Кондитер"
              src={confectionerAvatar}
              sx={{ width: 180, height: 180 }}
            />
            <StyledButton
              variant="primary"
              onClick={() => {
                setIsConfectioner(true);
                setChooseRole(false);
              }}
            >
              Кондитер
            </StyledButton>
          </Grid>
          <Grid item xs={12}>
            <RegText variant="h6">
              Есть аккаунт?{" "}
              <RegButton onClick={() => navigate("/login")}>Войти</RegButton>
            </RegText>
          </Grid>
        </Grid>
      </FormGrid>
      <Grid xs={4} item>
        <Image src={desserts} right={true} />
      </Grid>
    </>
  );
};

export default Registration;
