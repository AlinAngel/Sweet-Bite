import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import DessertCard from "../../components/DessertCard";
import Filter from "../../components/FilterAndSearch/filter";
import Search from "../../components/FilterAndSearch/search";
import { addOrDeleteFavorite, fetchTypes, getFafouriteDesserts } from "../../http/dessertAPI";
import { StyledTitle } from "./Profile.styles";

const Favourite = () => {
  const [desserts, setDesserts] = useState([]);

  const [selectedListItem, setSelectedListItem] = useState(null);
  const [dessertsTypesList, setDessertsTypesList] = useState([]);

  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const types = await fetchTypes();
        const allDesserts = await getFafouriteDesserts("", page, 7);
        setDessertsTypesList(types);
        setSelectedListItem("");
        setDesserts(allDesserts);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const allDesserts = await getFafouriteDesserts(
        selectedListItem,
        page,
        7
      );

      setDesserts(allDesserts);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedListItem, page]);

  const handleAddOrDeleteFav = async (id) => {
    try {
      await addOrDeleteFavorite(id);
      fetchData();
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <Box display="flex">
        <StyledTitle>Избранное</StyledTitle>
      </Box>
      <Box mt={2}>
        {desserts.length ? (
          <Grid container rowSpacing={4} columnSpacing={8}>
            {desserts.map((dessert) => {
              return (
                <Grid item xs={4} key={dessert.id}>
                  <DessertCard dessert={dessert} favourite={true} handleAddOrDeleteFav={handleAddOrDeleteFav} />
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="notFoundTitle">
              Вы еще не добавили ни одного десерта
            </Typography>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Favourite;
