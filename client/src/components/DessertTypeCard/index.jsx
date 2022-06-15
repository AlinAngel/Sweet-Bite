import { Box, Grid } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Title } from "./DessertTypeCard.style";

const DessertTypeCard = ({ type }) => {
  const navigate = useNavigate();

  return (
    <Grid item xs={4}>
      <Card
        sx={{
          background: `url(images/types/${type.name
            .split(" ")
            .join("")}.jpg) no-repeat center center`,
          backgroundSize: "cover",
        }}
        elevation={2}
        onClick={() => navigate("/desserts/" + type?.id)}
      >
        <Box
          sx={{
            width: "100%",
            padding: "15px 25px",
          }}
        >
          <Title variant="h6">{type.name}</Title>
        </Box>
      </Card>
    </Grid>
  );
};

export default DessertTypeCard;
