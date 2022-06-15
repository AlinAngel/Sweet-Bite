import React, { useState } from "react";

import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";

import Container from "@mui/material/Container";

import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import {
  CityTypography,
  Logo,
  Pages,
  StyledAppBar,
  StyledIconButton,
  StyledToolbar,
} from "./Header.styles";
import logo from "../../assets/logo.svg";
import searchIcon from "../../assets/icons/search.svg";
import profileIcon from "../../assets/icons/profile.svg";
import heartIcon from "../../assets/icons/heart.svg";
import { useNavigate } from "react-router-dom";
import SelectCityModal from "../SelectCityModal";
import { Autocomplete, Popover } from "@mui/material";
import { StyledTextField } from "../../pages/Auth/Auth.styles";

import cities from "../../json/cities.json";

const Header = ({ isAuth, setCity, setIsAuth }) => {
  const navigate = useNavigate();

  const pages = [
    { title: "Главная", route: "/" },
    { title: "Десерты", route: "/desserts" },
    { title: "Кондитеры", route: "/confectioners" },
  ];

  const settings = [
    { title: "Личные данные", route: "/profile" },
    { title: "Избранное", route: "/profile/favourite" },
    {
      title: "Моё портфолио",
      route: `/confectioner/${isAuth?.id}`,
      confectioner: true,
    },
    { title: "Мои десерты", route: "/profile/my-desserts", confectioner: true },
    {
      title: "Стать кондитером",
      route: "/profile/become-confectioner",
      user: true,
    },
    { title: "Выйти", route: "/", isLogout: true },
  ];

  const [anchorElUser, setAnchorElUser] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (route, isLogout = false) => {
    if (isLogout) {
      setIsAuth(false);
      localStorage.removeItem("token");
    }
    if (route) navigate(route);
    setAnchorElUser(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleChoose = (city) => {
    localStorage.setItem("city", city);
    setCity(city);
    setOpen(false);
  };

  return (
    <StyledAppBar position="static">
      <Container>
        <StyledToolbar disableGutters>
          <Logo
            src={logo}
            alt="Sweet bite"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          />
          <Pages>
            {pages.map((page) => (
              <Typography
                variant="navElement"
                sx={{
                  color: "text.menu",
                  "&:hover": { opacity: 0.7 },
                }}
                key={page.route}
                onClick={() => navigate(page.route)}
              >
                {page.title}
              </Typography>
            ))}
          </Pages>
          <Box
            sx={{
              flexGrow: 0,
              float: "right",
              display: "flex",
              alignItems: "center",
            }}
          >
            {!open ? (
              <CityTypography
                sx={{ color: "text.menu", "&:hover": { opacity: 0.7 } }}
                variant="navElement"
                onClick={(e) => setOpen(true)}
              >
                г. {localStorage.getItem("city") || "Таганрог"}
              </CityTypography>
            ) : (
              <Autocomplete
                getOptionLabel={(option) => option.city}
                disablePortal
                id="combo-box-demo"
                options={cities}
                open={open}
                onChange={(e, value) => handleChoose(value.city)}
                renderInput={(params) => (
                  <StyledTextField
                    variant="standard"
                    sx={{ width: "150px" }}
                    {...params}
                  />
                )}
              />
            )}
            {isAuth ? (
              <>
                <Tooltip title="Open settings">
                  <StyledIconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <img src={profileIcon} alt={"profile"} />
                  </StyledIconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => {
                    if (
                      (setting.confectioner &&
                        isAuth?.role?.name === "CONFECTIONER") ||
                      (setting.user && isAuth?.role?.name === "USER") ||
                      (!setting.user && !setting.confectioner)
                    ) {
                      return (
                        <MenuItem
                          key={setting.title}
                          onClick={() =>
                            handleCloseNavMenu(setting.route, setting.isLogout)
                          }
                        >
                          <Typography
                            sx={{ color: "text.menu" }}
                            variant="navElement"
                            textAlign="center"
                          >
                            {setting.title}
                          </Typography>
                        </MenuItem>
                      );
                    }
                  })}
                </Menu>
              </>
            ) : (
              <Typography
                variant="navElement"
                sx={{
                  color: "text.menu",
                  "&:hover": { opacity: 0.7 },
                }}
                onClick={() => navigate("/login")}
              >
                Войти
              </Typography>
            )}
          </Box>
        </StyledToolbar>
      </Container>
      {/* <SelectCityModal open={open} setOpen={setOpen} /> */}
    </StyledAppBar>
  );
};
export default Header;
