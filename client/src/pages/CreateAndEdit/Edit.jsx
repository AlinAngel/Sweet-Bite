import {
  Alert,
  Box,
  Breadcrumbs,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import FileUpload from "../../components/FileUpload";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
  CreatePageContainer,
  Image,
  StyledCarousel,
  StyledSlider,
} from "./CreateAndEdit.styles";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { StyledTextField } from "../Auth/Auth.styles";
import { StyledGridItem } from "../Profile/Profile.styles";
import { editDessert, fetchTypes, getDessert } from "../../http/dessertAPI";
import {
  IconButton,
  IconsForEdit,
} from "../../components/DessertCard/DessertCard.styles";

const settings = {
  className: "",
  dots: true,
  arrows: false,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  appendDots: (dots) => (
    <div
      style={{
        borderRadius: "10px",
      }}
    >
      <ul style={{ margin: "0px", padding: 0 }}> {dots} </ul>
    </div>
  ),
};

const Edit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const [images, setImages] = useState(null);
  const [type, setType] = useState("");
  const [pricePer, setPricePer] = useState("₽/кг");
  const [dessert, setDessert] = useState({});
  const [dessertsTypesList, setDessertsTypesList] = useState([]);
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const types = await fetchTypes();
        setDessertsTypesList(types);

        const dessertForEdit = await getDessert(id);
        const {
          description,
          ingredients,
          name,
          price,
          shelfLife,
          pricePer,
          storageTemp,
        } = dessertForEdit.dessert_info;
        setDessert({
          description,
          ingredients,
          name,
          price: price,
          shelfLife,
          storageTemp,
        });
        setType(dessertForEdit.type.id);
        setPricePer(pricePer);
        let files = [];
        dessertForEdit.dessert_info.dessert_images.forEach((img) =>
          files.push(img.img)
        );
        setImages(files);
      } catch (err) { }
    };
    fetchData();
  }, []);

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const removeImage = (index) => {
    const files = [...images];
    files.splice(index, 1);
    setImages(files);
  };

  const handleChangeDessert = (event) => {
    setDessert({ ...dessert, [event.target.name]: event.target.value });
  };

  const handleChangePricePer = (event) => {
    setPricePer(event.target.value);
  };

  const handleAddImages = (e) => {
    if (!images) return setImages(Object.values(e.target.files));
    setImages((prev) => [...prev, ...Object.values(e.target.files)]);
  };

  const handleEdit = async (e) => {
    try {
      const formData = new FormData();
      formData.append("name", dessert.name);
      formData.append("price", dessert.price);
      formData.append("pricePer", pricePer);
      images?.forEach((image) => {
        if (typeof image !== "string") {
          return formData.append("imgs", image);
        } else {
          return formData.append("oldImages", image);
        }
      });

      formData.append("description", dessert.description);
      formData.append("ingredients", dessert.ingredients);
      formData.append("storageTemp", dessert.storageTemp);
      formData.append("shelfLife", dessert.shelfLife);
      formData.append("typeId", type);
      formData.append("dessertId", id);

      const res = await editDessert(formData);
      if (res?.error) {
        return setError(res.error)
      }
      navigate("/profile/my-desserts");
    } catch (err) {

    }
  };

  if (Object.keys(dessert).length === 0) return <></>;

  return (
    <CreatePageContainer>
      <Paper elevation={5} sx={{ padding: "20px" }}>
        <div role="presentation">
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              sx={{ cursor: "pointer" }}
              underline="hover"
              color="inherit"
              onClick={() => navigate("/profile/my-desserts")}
            >
              Мои десерты
            </Link>
            <Typography color="text.primary">
              {location.pathname === "/create"
                ? "Создание десерта"
                : "Редактирование"}
            </Typography>
          </Breadcrumbs>
        </div>

        <Grid container columnSpacing={10} sx={{ mt: "30px" }}>
          <Grid item xs={5}>
            {images && (
              <StyledSlider {...settings} sx={{ paddingTop: "15px" }}>
                {images?.map((image, index) => (
                  <Box sx={{ position: "relative" }}>
                    <IconsForEdit>
                      <IconButton
                        variant="primary"
                        sx={{ ml: 0 }}
                        onClick={() => removeImage(index)}
                      >
                        <DeleteOutlineIcon />
                      </IconButton>
                    </IconsForEdit>
                    {typeof image === "string" ? (
                      <Image
                        key={Math.random()}
                        src={process.env.REACT_APP_API_URL + image}
                        alt={"qwe"}
                      />
                    ) : (
                      <Image
                        key={Math.random()}
                        src={URL.createObjectURL(image)}
                        alt={"qwe"}
                      />
                    )}
                  </Box>
                ))}
              </StyledSlider>
            )}
            {!images?.length && error &&
              <Alert sx={{ mb: "16px" }} severity="error">Добавьте изображение</Alert>
            }
            <Box>
              <FileUpload
                multiple={true}
                setFile={handleAddImages}
                accept="image/*"
              >
                <Button sx={{ height: "56px" }} fullWidth variant="primary">
                  Добавить изображение
                </Button>
              </FileUpload>
            </Box>
          </Grid>
          <Grid item xs={7}>
            <Grid
              container
              rowSpacing={2}
              columnSpacing={4}
              sx={{ marginTop: "0" }}
            >
              <StyledGridItem item xs={4}>
                <StyledTextField
                  fullWidth
                  id="outlined-basic"
                  label="Название"
                  variant="outlined"
                  onChange={handleChangeDessert}
                  name="name"
                  value={dessert.name}
                  error={(!dessert.name) && error}
                  helperText={(!dessert.name) && error && "Обязательное поле"}

                />
              </StyledGridItem>
              <StyledGridItem item xs={4}>
                <StyledTextField
                  fullWidth
                  id="outlined-basic"
                  label="Цена, ₽"
                  variant="outlined"
                  onChange={handleChangeDessert}
                  name="price"
                  value={dessert.price}
                  error={(!dessert.price) && error}
                  helperText={(!dessert.price) && error && "Поле должно быть числом"}

                />
              </StyledGridItem>
              <StyledGridItem item xs={4}>
                <FormControl error={!pricePer && error} fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Цена за...
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={pricePer}
                    label="Цена за..."
                    onChange={handleChangePricePer}
                  >
                    <MenuItem value={"₽/кг"}>₽/кг</MenuItem>
                    <MenuItem value={"₽/100гр"}>₽/100гр</MenuItem>
                    <MenuItem value={"₽/шт"}>₽/шт</MenuItem>
                  </Select>
                  {!pricePer && error && <FormHelperText>Обязательное поле</FormHelperText>}
                </FormControl>
              </StyledGridItem>
              <Grid item xs={4}>
                <StyledTextField
                  fullWidth
                  id="outlined-basic"
                  label="Температура хранения"
                  variant="outlined"
                  onChange={handleChangeDessert}
                  name="storageTemp"
                  value={dessert.storageTemp}
                />
              </Grid>
              <Grid item xs={4}>
                <StyledTextField
                  fullWidth
                  id="outlined-basic"
                  label="Срок хранения"
                  variant="outlined"
                  onChange={handleChangeDessert}
                  name="shelfLife"
                  value={dessert.shelfLife}
                />
              </Grid>
              <Grid item xs={4}>
                <FormControl
                  fullWidth
                  error={!type && error}
                >
                  <InputLabel id="demo-simple-select-label">Тип</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={type}
                    label="тип"
                    onChange={handleChange}
                  >
                    {dessertsTypesList.map((type) => {
                      return (
                        <MenuItem key={type.id} value={type.id}>
                          {type.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  {!type && error && <FormHelperText>Обязательное поле</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <StyledTextField
                  fullWidth
                  id="outlined-basic"
                  label="Ингредиенты"
                  variant="outlined"
                  onChange={handleChangeDessert}
                  name="ingredients"
                  value={dessert.ingredients}
                />
              </Grid>
              <Grid
                item
                xs={12}
                display="flex"
                flexDirection="column"
                alignItems="flex-end"
              >
                <StyledTextField
                  fullWidth
                  id="outlined-basic"
                  label="Описание"
                  multiline
                  rows={4}
                  variant="outlined"
                  onChange={handleChangeDessert}
                  name="description"
                  value={dessert.description}
                  error={!dessert.description && error}
                  helperText={!dessert.description && error && "Обязательное поле"}
                />
                <Box sx={{ display: 'flex', alignItems: 'center', mt: "16px" }}>
                  {error && <Alert severity="error">{error}</Alert>}
                  <Button
                    sx={{ ml: "16px" }}
                    variant="primary"
                    onClick={() => handleEdit()}
                  >
                    Сохранить
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </CreatePageContainer>
  );
};

export default Edit;
