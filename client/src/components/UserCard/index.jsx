import { Avatar, Box, Button, CardContent, Typography } from "@mui/material";
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  Statistic,
  StatisticText,
  Tag,
} from "./UserCard.styles";
import noAvatar from "../../assets/noAvatar.png";
import { StyledDivider } from "../../pages/DessertPage/DessertPage.styles";
import { useNavigate } from "react-router-dom";

const UserCard = ({ user }) => {
  const navigate = useNavigate();
  let dessertsTypes = [];
  user.desserts.forEach((item) => {
    if (!dessertsTypes.includes(item.type.name)) {
      return dessertsTypes.push(item.type.name);
    }
  });

  return (
    <Card elevation={2}>
      <CardHeader>
        <Avatar
          alt={`${user.name} ${user.lastName}`}
          src={user.img ? process.env.REACT_APP_API_URL + user.img : noAvatar}
          sx={{ width: 72, height: 72 }}
        />

        <CardTitle
          align="center"
          paragraph={false}
          component="h1"
        >{`${user.name} ${user.lastName}`}</CardTitle>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            mt: "10px",
            alignContent: "center",
            flexWrap: "wrap",
          }}
        >
          {dessertsTypes.slice(0, 3).map((item) => {
            return <Tag label={item} variant="outlined" />;
          })}
          {dessertsTypes.length > 3 && (
            <Typography variant="moreTypes">...</Typography>
          )}
        </Box>
      </CardHeader>
      <Box
        sx={{ pb: "0 !important", display: "flex", flexDirection: "column" }}
      >
        <StyledDivider />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Statistic>
            <StatisticText>{user.desserts.length}</StatisticText>
            <StatisticText>Десертов</StatisticText>
          </Statistic>
          <Statistic>
            <StatisticText>{+user?.rating.toFixed(2) || 0} / 5</StatisticText>
            <StatisticText>Рейтинг</StatisticText>
          </Statistic>
          <Statistic>
            <StatisticText>{user.reviewCount}</StatisticText>
            <StatisticText>Отзывов</StatisticText>
          </Statistic>
        </Box>
        <StyledDivider />
        <Button
          variant="primary"
          fullWidth
          onClick={() => navigate("/confectioner/" + user.id)}
        >
          Посмотреть профиль
        </Button>
      </Box>
    </Card>
  );
};

export default UserCard;
