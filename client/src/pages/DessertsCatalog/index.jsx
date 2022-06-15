import {
  Box,
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import React, { useState, useEffect } from "react";
import DessertCard from "../../components/DessertCard";
import Search from "../../components/FilterAndSearch/search";
import SideMenu from "../../components/SideMenu";
import { CatalogContainer } from "./DessertsCatalog.style";
import {
  addOrDeleteFavorite,
  fetchTypes,
  getDesserts,
} from "./../../http/dessertAPI";
import Filter from "../../components/FilterAndSearch/filter";
import SearchIcon from "@mui/icons-material/Search";
import notFound from "../../assets/notFound.png";
import { useNavigate, useParams } from "react-router-dom";

const sortList = [
  { id: 1, title: "Сначала новые", value: "createdAt", direction: "DESC" },
  {
    id: 2,
    title: "Сначала с наибольшим рейтингом",
    value: "popular",
    direction: "ASC",
  },
  { id: 3, title: "Сначала дешевле", value: "price", direction: "ASC" },
  { id: 4, title: "Сначала дороже", value: "price", direction: "DESC" },
];

const DessertsCatalog = ({ city }) => {
  const navigate = useNavigate();

  const { typeId } = useParams();

  const [selectedListItem, setSelectedListItem] = useState(typeId || null);

  const [desserts, setDesserts] = useState([]);
  const [dessertsTypesList, setDessertsTypesList] = useState([]);

  const [dessertsNumber, setDessertsNumber] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const [sorting, setSorting] = useState(sortList[0]);
  const [searchQuery, setSearchQuery] = useState("");

  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (!dessertsTypesList.length) {
        const types = await fetchTypes();
        setDessertsTypesList(types);
      }
      const allDesserts = await getDesserts(
        searchQuery,
        selectedListItem,
        page,
        limit,
        sorting.direction,
        sorting.value,
        city
      );
      setDesserts(allDesserts.rows);
      setDessertsNumber(allDesserts.count);
    } catch (err) {
      console.log(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [selectedListItem, page, sorting, city]);

  const handleAddOrDeleteFav = async (id) => {
    try {
      await addOrDeleteFavorite(id);
      const allDesserts = await getDesserts(
        searchQuery,
        selectedListItem,
        page,
        limit,
        sorting.direction,
        sorting.value,
        city
      );
      setDesserts(allDesserts.rows);
      setDessertsNumber(allDesserts.count);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleListItemClick = (e, selectedValue) => {
    if (!selectedValue) {
      navigate("/desserts");
    } else {
      navigate(`/desserts/${selectedValue}`);
    }
    setSelectedListItem(selectedValue);
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = async (e) => {
    try {
      const allDesserts = await getDesserts(
        searchQuery,
        selectedListItem,
        page,
        limit,
        sorting.direction,
        sorting.value,
        city
      );
      setDesserts(allDesserts.rows);
      setDessertsNumber(allDesserts.count);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <CatalogContainer>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <SideMenu
            withAll
            list={dessertsTypesList}
            selectedListItem={selectedListItem}
            selectedValue="id"
            handleListItemClick={handleListItemClick}
          />
        </Grid>
        <Grid item xs={9}>
          <Grid mb={2} container rowSpacing={4} columnSpacing={8}>
            <Grid item xs={4}>
              <Filter
                list={sortList}
                isFilter={false}
                menuItem={sorting}
                setMenuItem={setSorting}
              />
            </Grid>
            <Grid item xs={4}>
              <Search
                searchQuery={searchQuery}
                handleChange={handleChange}
                handleSearch={handleSearch}
              />
            </Grid>
          </Grid>

          {loading ? (
            <Grid
              container
              display="flex"
              justifyContent="center"
              alignContent="center"
            >
              <CircularProgress />
            </Grid>
          ) : desserts.length ? (
            <>
              <Grid container rowSpacing={4} columnSpacing={8}>
                {desserts?.map((dessert) => {
                  return (
                    <Grid key={dessert.id} item xs={4}>
                      <DessertCard
                        dessert={dessert}
                        handleAddOrDeleteFav={handleAddOrDeleteFav}
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
              <img width="400px" height="400px" src={notFound} />
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

export default DessertsCatalog;
