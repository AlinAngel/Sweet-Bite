import { Button, Typography, Box } from "@mui/material";
import React, { useState } from "react";
import {
  ButtonsGroup,
  Card,
  CardContent,
  CardTitle,
  IconButton,
  IconsForEdit,
  Image,
} from "./DessertCard.styles";
import cake from "../../assets/cakeCard.jpg";
import heartIcon from "../../assets/icons/heartBtn.svg";
import { useNavigate } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import DeleteModal from "../DeleteModal";
import Slider from "react-slick";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { deleteDessert } from "../../http/dessertAPI";

const settings = {
  dots: false,
  infinite: true,
  arrows: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  cssEase: "linear",
  adaptiveHeight: true,
};

const DessertCard = ({
  dessert,
  editable,
  handleAddOrDeleteFav,
  fetchData,
  favourite,
}) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleDelete = (dessertId) => {
    deleteDessert(dessertId);
    fetchData();
    setOpen(false);
  };

  return (
    <>
      <Card elevation={2}>
        {editable && (
          <IconsForEdit>
            <IconButton
              variant="primary"
              onClick={() => navigate("/edit/" + dessert.id)}
              sx={{ ml: 0 }}
            >
              <EditIcon />
            </IconButton>
            <IconButton variant="primary" onClick={() => setOpen(true)}>
              <DeleteOutlineIcon />
            </IconButton>
          </IconsForEdit>
        )}
        <Slider {...settings}>
          {dessert?.dessert_info?.dessert_images?.map((image) => (
            <Image
              src={`${process.env.REACT_APP_API_URL}${image.img}`}
              alt={dessert?.dessert_info?.name}
            />
          ))}
        </Slider>
        <CardContent>
          <CardTitle variant="h6">{dessert?.dessert_info?.name}</CardTitle>
          <div>
            <Typography
              variant="h6"
              fontSize={"19px"}
              sx={{ color: "text.secondary" }}
              mb="6px"
            >
              {dessert.dessert_info.price} {dessert.dessert_info.pricePer}
            </Typography>
            <ButtonsGroup>
              <Button
                fullWidth
                variant="primary"
                onClick={() => navigate("/dessert/" + dessert.id)}
              >
                Подробнее
              </Button>
              <IconButton
                variant="primary"
                sx={{ ml: "20px" }}
                disabled={!localStorage.getItem("token")}
              >
                {dessert?.favourite_desserts?.length || favourite ? (
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
            </ButtonsGroup>
          </div>
        </CardContent>
      </Card>
      <DeleteModal
        handleDelete={handleDelete}
        open={open}
        setOpen={setOpen}
        dessert={dessert}
      />
    </>
  );
};

export default DessertCard;
