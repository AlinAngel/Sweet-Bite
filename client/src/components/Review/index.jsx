import { Avatar, Box, Rating, Typography } from "@mui/material";
import React from "react";
import noAvatar from "../../assets/noAvatar.png";
import { StyledPaper } from "./Review.styles";

const Review = ({ review }) => {
  return (
    <StyledPaper elevation={5}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
          }}
        >
          <Avatar
            alt={review.user.name}
            src={
              review.user.img
                ? process.env.REACT_APP_API_URL + review.user.img
                : noAvatar
            }
          />
          <Typography sx={{ marginLeft: "10px" }} component={"span"}>
            {review.user.name}
          </Typography>
          <Rating
            sx={{ marginLeft: "10px" }}
            name="read-only"
            value={review.rating}
            precision={0.5}
            readOnly
            size="small"
          />
        </Box>
        <Typography>
          {new Date(review.createdAt).toLocaleDateString()}
        </Typography>
      </Box>
      <Typography>{review.review}</Typography>
    </StyledPaper>
  );
};

export default Review;
