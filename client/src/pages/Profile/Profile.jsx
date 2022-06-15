import { Autocomplete, Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import FileUpload from "../../components/FileUpload";
import { StyledTextField } from "../Auth/Auth.styles";
import {
  Image,
  StyledDivider,
  StyledGridItem,
  StyledTitle,
} from "./Profile.styles";
import noAvatar from "../../assets/noAvatar.png";
import {
  getProfile,
  getSocialMediaTypes,
  updateAvatar,
  updateProfile,
} from "../../http/userAPI";
import cities from "../../json/cities.json";

const Profile = () => {
  const [user, setUser] = useState({});
  const [picture, setPicture] = useState(null);
  const [socialMedia, setSocialMedia] = useState({
    vk: "",
    whatsApp: "",
    telegram: "",
  });
  const [socialMediaTypesList, setSocialMediaTypesList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const fetchData = async () => {
    try {
      const userInfo = await getProfile();
      const types = await getSocialMediaTypes();
      setUser({
        ...userInfo,
        city: userInfo?.confectioner_info?.city,
        pastryShop: userInfo?.confectioner_info?.pastryShop,
        description: userInfo?.confectioner_info?.description,
        phone: userInfo?.confectioner_info?.phone,
      });
      setSocialMediaTypesList(types);
      let newArr = [...types];
      userInfo.confectioner_info.social_media.forEach((item) => {
        const index = types.findIndex((type) => {
          return type.name === item.social_media_type.name;
        });
        newArr[index].link = item.link;

        setSocialMedia((prev) => ({
          ...prev,
          [item.social_media_type.name]: item.link,
        }));
      });
      setSocialMediaTypesList(newArr);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChangeAvatar = (e) => {
    setPicture(e.target.files[0]);

    const formData = new FormData();
    formData.append("avatar", e.target.files[0]);
    updateAvatar(formData);
  };

  const handleUserChange = (e) => {
    return setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUpdateUser = (e) => {
    updateProfile({
      ...user,
      socialMedia: socialMediaTypesList,
    });
    setIsEdit(!isEdit);
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

  if (Object.keys(user).length === 0) return <></>;
  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="flex-end">
        <StyledTitle>Личные данные</StyledTitle>
        <Box>
          {isEdit && (
            <Button
              sx={{ marginRight: "16px" }}
              onClick={() => setIsEdit(false)}
              variant="primary"
            >
              Отменить
            </Button>
          )}
          <Button
            variant="primary"
            onClick={() => {
              isEdit ? handleUpdateUser() : setIsEdit(!isEdit);
            }}
          >
            {isEdit ? "Сохранить" : "Редактировать"}
          </Button>
        </Box>
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
            <StyledGridItem item xs={3}>
              <Box>
                <Grid
                  container
                  rowSpacing={2}
                  columnSpacing={4}
                  sx={{ marginTop: "0" }}
                >
                  <Grid item xs={12}>
                    <Image
                      src={
                        picture
                          ? URL.createObjectURL(picture)
                          : user.img
                          ? process.env.REACT_APP_API_URL + user.img
                          : noAvatar
                      }
                    />
                  </Grid>
                  <StyledGridItem item xs={12}>
                    <Box sx={{ paddingTop: "11px" }}>
                      <FileUpload
                        setFile={handleChangeAvatar}
                        multiple={false}
                        accept="image/*"
                      >
                        <Button
                          sx={{ height: "56px" }}
                          fullWidth
                          variant="primary"
                        >
                          Обновить Аватар
                        </Button>
                      </FileUpload>
                    </Box>
                  </StyledGridItem>
                </Grid>
              </Box>
            </StyledGridItem>
            <StyledGridItem item xs={9}>
              <Grid
                container
                rowSpacing={2}
                columnSpacing={4}
                sx={{ marginTop: "0" }}
              >
                <Grid item xs={4}>
                  <StyledTextField
                    onChange={handleUserChange}
                    fullWidth
                    id="outlined-basic"
                    disabled={!isEdit}
                    label="Имя"
                    name="name"
                    value={user.name}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={4}>
                  <StyledTextField
                    onChange={handleUserChange}
                    fullWidth
                    id="outlined-basic"
                    disabled={!isEdit}
                    label="Фамилия"
                    name="lastName"
                    value={user.lastName}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={4}>
                  <StyledTextField
                    onChange={handleUserChange}
                    fullWidth
                    id="outlined-basic"
                    disabled={!isEdit}
                    label="Отчество"
                    name="middleName"
                    value={user?.middleName || ""}
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={4}>
                  <StyledTextField
                    onChange={handleUserChange}
                    fullWidth
                    id="outlined-basic"
                    disabled={!isEdit}
                    label="Email"
                    name="email"
                    value={user.email}
                    variant="outlined"
                  />
                </Grid>
                {user.confectioner_info && (
                  <>
                    <Grid item xs={4}>
                      <Autocomplete
                        getOptionLabel={(option) => option.city}
                        disablePortal
                        disabled={!isEdit}
                        id="combo-box-demo"
                        options={cities}
                        defaultValue={cities.find(
                          (item) => item.city === user.city
                        )}
                        onChange={(e, value) =>
                          setUser({ ...user, city: value.city })
                        }
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
                        disabled={!isEdit}
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
                        disabled={!isEdit}
                        label="О себе"
                        name="description"
                        value={user?.description || ""}
                        multiline
                        rows={4}
                        variant="outlined"
                      />
                    </Grid>
                  </>
                )}
              </Grid>
            </StyledGridItem>
          </Grid>
        </Box>
        {user.confectioner_info && (
          <>
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
                    <StyledTextField
                      onChange={handleUserChange}
                      fullWidth
                      id="outlined-basic"
                      disabled={!isEdit}
                      label="Номер телефона"
                      name="phone"
                      value={user.phone}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <StyledTextField
                      onChange={handleChangeSocial}
                      fullWidth
                      id="outlined-basic"
                      disabled={!isEdit}
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
                      disabled={!isEdit}
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
                      disabled={!isEdit}
                      name="telegram"
                      value={socialMedia.telegram || ""}
                      label="Telegram"
                      variant="outlined"
                    />
                  </Grid>
                </>
              </Grid>
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default Profile;
