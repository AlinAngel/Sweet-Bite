import {
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Grid,
  Icon,
  Link,
  Paper,
  Rating,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ConfectionerPageContainer,
  StyledCarousel,
  TagChip,
  CurvedDescription,
  StyledDivider,
  Price,
} from "./ConfectionerPage.styles.js";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import BasicTabs from "./Tabs.jsx";
import { IconButton } from "../../components/DessertCard/DessertCard.styles.js";
import heartIcon from "../../assets/icons/heartBtn.svg";
import noAvatar from "../../assets/noAvatar.png";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { getConfectionerByID } from "../../http/userAPI.js";

const wordEnding = (num, word) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return word[
    num % 100 > 4 && num % 100 < 20 ? 2 : cases[num % 10 < 5 ? num % 10 : 5]
  ];
};

const ConfectionerPage = () => {
  const navigate = useNavigate();
  const { confectionerId, isContact } = useParams();

  const [user, setUser] = useState(null);
  const [tab, setTab] = useState(!isContact ? 0 : 1);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getConfectionerByID(confectionerId);

      let rating = 0;
      let reviewCount = 0;

      data.desserts.forEach((dessert) => {
        dessert.reviews.forEach((review) => {
          rating += review.rating;
        });
        reviewCount += dessert.reviews.length;
      });

      setUser({ ...data, rating: rating / reviewCount, reviewCount });
    };
    fetchData();
  }, [confectionerId]);

  if (!user) return <></>;

  let dessertsTypes = [];
  user.desserts.forEach((item) => {
    if (!dessertsTypes.includes(item.type.name)) {
      return dessertsTypes.push(item.type.name);
    }
  });

  return (
    <ConfectionerPageContainer>
      <Paper elevation={5} sx={{ padding: "20px" }}>
        <div role="presentation">
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              sx={{ cursor: "pointer" }}
              underline="hover"
              color="inherit"
              onClick={() => navigate("/confectioners")}
            >
              Кондитеры
            </Link>
            <Typography color="text.primary">
              {user.name + " " + user.lastName}
            </Typography>
          </Breadcrumbs>
        </div>

        <Grid container spacing={4} mt={1}>
          <Grid
            item
            xs={5}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Avatar
              src={
                user.img ? process.env.REACT_APP_API_URL + user.img : noAvatar
              }
              sx={{ width: 250, height: 250 }}
            />
            <Button
              sx={{ height: 56, maxWidth: 250, mt: 2 }}
              fullWidth
              variant="primary"
              onClick={() => setTab(1)}
            >
              Связаться с кондитером
            </Button>
          </Grid>
          <Grid
            item
            sx={7}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Box sx={{ display: "flex", flexDirection: "column" }} fullWidth>
              <Typography variant="h5">
                {user.name + " " + user.lastName}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mt: "5px" }}>
                <Rating
                  name="read-only"
                  value={user.rating || 0}
                  precision={0.5}
                  readOnly
                />
                <Typography variant="review" sx={{ ml: "5px" }}>
                  ({user.reviewCount || 0}{" "}
                  {wordEnding(user.reviewCount, ["отзыв", "отзыва", "отзывов"])}
                  )
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mt: "15px" }}>
                <Icon>
                  <LocationOnIcon />
                </Icon>
                <Typography sx={{ lineHeight: 1 }} variant="h6">
                  {user.confectioner_info.city}
                </Typography>
              </Box>
              <Typography sx={{ lineHeight: 1, mt: "7px" }} variant="h6">
                {user.confectioner_info.pastryShop}
              </Typography>
              <Box sx={{ mt: "15px" }}>
                {dessertsTypes.map((item) => {
                  return <TagChip label={"#" + item} sx={{ mr: "7px" }} />;
                })}
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* <Grid container columnSpacing={10}></Grid> */}
        <BasicTabs tab={tab} setTab={setTab} user={user} />
      </Paper>
    </ConfectionerPageContainer>
  );
};

export default ConfectionerPage;
