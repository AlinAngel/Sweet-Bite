import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SideMenu from "../../components/SideMenu";
import { ProfileContainer } from "./Profile.styles";

const ProfileWrapper = ({ children, isAuth }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const settings = [
    { name: "Личные данные", route: "/profile" },
    { name: "Избранное", route: "/profile/favourite" },
    {
      name: "Моё портфолио",
      route: `/confectioner/${isAuth?.id}`,
      confectioner: true,
    },
    { name: "Мои десерты", route: "/profile/my-desserts", confectioner: true },
    {
      name: "Стать кондитером",
      route: "/profile/become-confectioner",
      user: true,
    },
    { name: "Выйти" },
  ];

  const [selectedListItem, setSelectedListItem] = useState(location.pathname);
  useEffect(() => {
    setSelectedListItem(location.pathname);
  }, [location]);

  const handleListItemClick = (event, index) => {
    if (index) navigate(index);
    setSelectedListItem(index);
  };
  return (
    <ProfileContainer>
      <Grid container spacing={5}>
        <Grid item xs={3}>
          {isAuth && (
            <SideMenu
              list={settings.filter((setting) => {
                return (
                  (setting.confectioner &&
                    isAuth?.role.name === "CONFECTIONER") ||
                  (setting.user && isAuth?.role.name === "USER") ||
                  (!setting.user && !setting.confectioner)
                );
              })}
              selectedListItem={selectedListItem}
              selectedValue="route"
              handleListItemClick={handleListItemClick}
            />
          )}
        </Grid>
        <Grid item xs={9}>
          {children}
        </Grid>
      </Grid>
    </ProfileContainer>
  );
};

export default ProfileWrapper;
