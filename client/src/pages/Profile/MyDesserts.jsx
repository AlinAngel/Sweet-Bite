import { Box, Button, Grid, Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import React, { useState, useEffect } from "react";
import DessertCard from "../../components/DessertCard";
import { StyledTitle } from "./Profile.styles";
import { useNavigate } from "react-router-dom";
import { getMyDesserts } from "./../../http/dessertAPI";

const MyDesserts = () => {
  const navigate = useNavigate();

  const [desserts, setDesserts] = useState([]);
  const [dessertsNumber, setDessertsNumber] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);

  const fetchData = async () => {
    try {
      const myDesserts = await getMyDesserts(page, limit);
      // обновление состояния desserts для отображения десертов на странице
      setDesserts(myDesserts.rows); 
      // обновление состяния dessertsNumber для правильного отображения 
      // количества страниц (пагинация)
      setDessertsNumber(myDesserts.count); 
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="flex-end">
        <StyledTitle>Мои десерты</StyledTitle>
        <Box>
          <Button variant="primary" onClick={() => navigate("/create")}>
            Создать
          </Button>
        </Box>
      </Box>
      <Box mt={2}>
        {desserts.length ? (
          <>
            <Grid container rowSpacing={4} columnSpacing={8}>
              {desserts?.map((dessert) => {
                return (
                  <Grid item xs={4}>
                    <DessertCard
                      key={dessert.id}
                      editable
                      dessert={dessert}
                      fetchData={fetchData}
                    />
                  </Grid>
                );
              })}
            </Grid>
            <Pagination
              sx={{ mt: 4 }}
              count={Math.ceil(dessertsNumber / limit)}
              page={page}
              onChange={(e, value) => setPage(value)}
              size="large"
              variant="outlined"
              shape="rounded"
              color="pagination"
            />
          </>
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

export default MyDesserts;
