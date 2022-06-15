import {
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Grid,
  Link,
  Paper,
  Rating,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  DessertPageContainer,
  StyledCarousel,
  TagChip,
  CurvedDescription,
  StyledDivider,
  Price,
} from "./DessertPage.styles.js";
import pic from "../../assets/cakeCard.jpg";
import pic2 from "../../assets/desserts.jpg";
import pic3 from "../../assets/main-cake.jpg";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import BasicTabs from "./Tabs.jsx";
import { IconButton } from "../../components/DessertCard/DessertCard.styles.js";
import heartIcon from "../../assets/icons/heartBtn.svg";
import {
  addOrDeleteFavorite,
  addReview,
  getDessert,
} from "./../../http/dessertAPI";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import noAvatar from "../../assets/noAvatar.png";

const wordEnding = (num, word) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return word[
    num % 100 > 4 && num % 100 < 20 ? 2 : cases[num % 10 < 5 ? num % 10 : 5]
  ];
};

const countDessertRating = (reviews) => {
  let totalRating = 0;
  reviews.forEach((review) => (totalRating += review.rating));
  return totalRating / reviews.length;
};

const DessertPage = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const { id } = useParams();
  const [dessert, setDessert] = useState(null);

  const fetchData = async () => {
    const data = await getDessert(id);
    setDessert(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddOrDeleteFav = async (id) => {
    try {
      await addOrDeleteFavorite(id);
      fetchData();
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleAddReview = async (rating, review) => {
    await addReview(rating, review, id);
    fetchData();
  };

  if (!dessert) return <></>;
  return (
    <DessertPageContainer>
      <Paper elevation={5} sx={{ padding: "20px" }}>
        <div role="presentation">
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              sx={{ cursor: "pointer" }}
              underline="hover"
              color="inherit"
              onClick={() => navigate("/desserts")}
            >
              Десерты
            </Link>
            <Typography color="text.primary">
              {dessert.dessert_info.name}
            </Typography>
          </Breadcrumbs>
        </div>
        <Box sx={{ margin: "30px 0 30px" }}>
          <Typography variant="h5">{dessert.dessert_info.name}</Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Rating
              name="read-only"
              value={countDessertRating(dessert.reviews)}
              precision={0.5}
              readOnly
            />
            <Typography variant="h6" sx={{ marginLeft: "10px" }}>
              {dessert?.reviews?.length || 0}{" "}
              {wordEnding(dessert?.reviews?.length, [
                "отзыв",
                "отзыва",
                "отзывов",
              ])}
            </Typography>
          </Box>
        </Box>
        <Grid container columnSpacing={10}>
          <Grid item xs={6}>
            <StyledCarousel infiniteLoop dynamicHeight={true}>
              {dessert?.dessert_info?.dessert_images?.map((image, index) => (
                <div key={index}>
                  <img
                    src={`${process.env.REACT_APP_API_URL}${image.img}`}
                    alt={dessert?.dessert_info?.name}
                  />
                </div>
              ))}
            </StyledCarousel>
          </Grid>
          <Grid item xs={6}>
            <TagChip label={"#" + dessert.type.name} />
            <CurvedDescription sx={{ marginTop: "10px" }}>
              {dessert.dessert_info.description}
            </CurvedDescription>
            <StyledDivider />
            <Typography sx={{ fontSize: "18px" }}>
              Цена{" "}
              <Price>
                {dessert.dessert_info.price} {dessert.dessert_info.pricePer}
              </Price>
            </Typography>
            <StyledDivider />
            <Box
              sx={{
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
              }}
            >
              <Avatar
                alt="Кондитер"
                src={
                  dessert.user.img
                    ? process.env.REACT_APP_API_URL + dessert.user.img
                    : noAvatar
                }
                sx={{ width: 56, height: 56 }}
              />
              <Typography
                variant="h6"
                sx={{ fontSize: "18px", marginLeft: "10px" }}
              >
                {dessert.user.name + " " + dessert.user.lastName}
              </Typography>
            </Box>
            <StyledDivider />
            <Button
              variant="primary"
              onClick={() => navigate(`/confectioner/${dessert.user.id}/true`)}
            >
              Связаться с кондитером
            </Button>
            <IconButton
              disabled={!localStorage.getItem("token")}
              variant="primary"
              sx={{ marginLeft: "10px" }}
            >
              {dessert.favourite_desserts.length ? (
                <FavoriteIcon
                  sx={{ fontSize: "22px" }}
                  onClick={() => handleAddOrDeleteFav(dessert.id)}
                />
              ) : (
                <FavoriteBorderIcon
                  sx={{ fontSize: "22px" }}
                  onClick={() => handleAddOrDeleteFav(dessert.id)}
                />
              )}
            </IconButton>
          </Grid>
        </Grid>
        <BasicTabs
          handleAddReview={handleAddReview}
          tab={tab}
          setTab={setTab}
          dessert={dessert}
        />
      </Paper>
    </DessertPageContainer>
  );
};

export default DessertPage;
