import { Autocomplete, Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import FileUpload from "../../components/FileUpload";
import InputMask from "react-input-mask";
import { StyledTextField } from "../Auth/Auth.styles";
import {
  Image,
  StyledDivider,
  StyledGridItem,
  StyledTitle,
} from "./Profile.styles";
import noAvatar from "../../assets/noAvatar.png";
import {
  becomeConfectioner,
  getProfile,
  getSocialMediaTypes,
  updateAvatar,
  updateProfile,
} from "../../http/userAPI";
import cities from "../../json/cities.json";
import { useNavigate } from "react-router-dom";

const BecomeConfectioner = ({ setIsAuth }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [socialMedia, setSocialMedia] = useState({
    vk: "",
    whatsApp: "",
    telegram: "",
  });
  const [socialMediaTypesList, setSocialMediaTypesList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const types = await getSocialMediaTypes();
        setSocialMediaTypesList(types);
      } catch (err) {}
    };
    fetchData();
  }, []);

  const handleUserChange = (e) => {
    return setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleBecomeConfectioner = async (e) => {
    const res = await becomeConfectioner({
      ...user,
      socialMedia: socialMediaTypesList,
    });
    setIsAuth(res);
    setIsEdit(!isEdit);
    navigate("/profile");
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

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="flex-end">
        <StyledTitle>Стать кондитером</StyledTitle>
        <Button variant="primary" onClick={() => handleBecomeConfectioner()}>
          Сохранить
        </Button>
      </Box>
      <Box mt={2}>
        <Box>
          <Typography variant="subTitle">Личная информация</Typography>

          <StyledDivider />
          <Grid
            container
            rowSpacing={2}
            columnSpacing={4}
            sx={{ marginTop: "0" }}
          >
            <Grid item xs={4}>
              <Autocomplete
                getOptionLabel={(option) => option.city}
                disablePortal
                id="combo-box-demo"
                options={cities}
                onChange={(e, value) => setUser({ ...user, city: value.city })}
                renderInput={(params) => (
                  <StyledTextField {...params} label="Город" />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <StyledTextField
                onChange={handleUserChange}
                fullWidth
                id="outlined-basic"
                label="Кондитерская"
                name="pastryShop"
                value={user?.pastryShop || ""}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <StyledTextField
                onChange={handleUserChange}
                fullWidth
                id="outlined-basic"
                label="О себе"
                name="description"
                value={user?.description || ""}
                multiline
                rows={4}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ marginTop: "25px" }}>
          <Typography variant="subTitle">Контакты</Typography>
          <StyledDivider />
          <Grid
            container
            rowSpacing={2}
            columnSpacing={4}
            sx={{ marginTop: "0" }}
          >
            <>
              <Grid item xs={3}>
                <InputMask
                  mask="+7 (999) 999-99-99"
                  disabled={false}
                  maskChar={"_"}
                  value={user?.phone || ""}
                  onChange={handleUserChange}
                >
                  {() => (
                    <StyledTextField
                      onChange={handleUserChange}
                      fullWidth
                      id="outlined-basic"
                      label="Номер телефона"
                      name="phone"
                      value={user.phone}
                      variant="outlined"
                    />
                  )}
                </InputMask>
              </Grid>
              <Grid item xs={3}>
                <StyledTextField
                  onChange={handleChangeSocial}
                  fullWidth
                  id="outlined-basic"
                  name="whatsApp"
                  value={socialMedia.whatsApp}
                  label="WhatsApp"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={3}>
                <StyledTextField
                  onChange={handleChangeSocial}
                  fullWidth
                  id="outlined-basic"
                  name="vk"
                  value={socialMedia.vk}
                  label="ВКонтакте"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={3}>
                <StyledTextField
                  onChange={handleChangeSocial}
                  fullWidth
                  id="outlined-basic"
                  name="telegram"
                  value={socialMedia.telegram || ""}
                  label="Telegram"
                  variant="outlined"
                />
              </Grid>
            </>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default BecomeConfectioner;
