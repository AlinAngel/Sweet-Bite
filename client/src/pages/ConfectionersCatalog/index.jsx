import { Box, Grid, Pagination, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Search from "../../components/FilterAndSearch/search";
import SideMenu from "../../components/SideMenu";
import { CatalogContainer } from "./ConfectionersCatalog.style";
import confectionersTypesList from "../../json/confectioner-types.json";
import UserCard from "../../components/UserCard";
import { fetchTypes } from "../../http/dessertAPI";
import { getConfectioners } from "./../../http/dessertAPI";
import notFound from "../../assets/notFound.png";
const ConfectionersCatalog = ({ city }) => {
  const [selectedListItem, setSelectedListItem] = useState(null);

  const [confectioners, setConfectioners] = useState([]);
  const [confectionersNumber, setConfectionersNumber] = useState(0);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(7);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let allConfectioners = await getConfectioners(city, page, limit);

        const conf = allConfectioners.rows.map((user) => {
          let rating = 0;
          let reviewCount = 0;

          user.desserts.forEach((dessert) => {
            dessert.reviews.forEach((review) => {
              rating += review.rating;
            });
            reviewCount += dessert.reviews.length;
          });
          return { ...user, rating: rating / reviewCount, reviewCount };
        });
        setConfectioners(conf);
        setConfectionersNumber(allConfectioners.count);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, [city]);

  return (
    <CatalogContainer>
      <Grid container spacing={3}>
        {/* <Grid item xs={12}>
          <Grid mb={2} container rowSpacing={4} columnSpacing={8}>
            <Grid xs={3} item>
              <Search />
            </Grid>
          </Grid>
        </Grid> */}
        <Grid item xs={12}>
          {confectioners.length ? (
            <>
              <Grid container rowSpacing={4} columnSpacing={4}>
                {confectioners.map((user) => {
                  return (
                    <Grid item xs={3} key={user.id}>
                      <UserCard user={user} />
                    </Grid>
                  );
                })}
              </Grid>
              <Pagination
                sx={{ mt: 4 }}
                count={Math.ceil(confectionersNumber / limit)}
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
              <img width="450px" height="450px" src={notFound} />
              <Typography variant="notFoundTitle">
                Увы, ничего не найдено...
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </CatalogContainer>
  );
};

export default ConfectionersCatalog;
