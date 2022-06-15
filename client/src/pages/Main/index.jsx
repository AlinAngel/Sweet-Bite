import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import cakePick from "../../assets/main-cake.jpg";
import { Picture, MainContainer, Title, MainWrapper } from "./Main.styles";
import DessertTypeCard from "../../components/DessertTypeCard";
import DessertCard from "../../components/DessertCard";
import { fetchTypes, getDesserts } from "../../http/dessertAPI";

const Main = ({ city }) => {
  const [dessertsTypes, setDessertsTypes] = useState([]);
  const [desserts, setDesserts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!dessertsTypes.length) {
          const types = await fetchTypes();
          setDessertsTypes(types);
        }
        const allDesserts = await getDesserts(
          "",
          null,
          1,
          4,
          "ASC",
          "popular",
          city
        );
        setDesserts(allDesserts.rows);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, [city]);

  return (
    <MainWrapper>
      <Picture src={cakePick} />
      <MainContainer>
        <Title variant="title">Выберите десерт на свой вкус</Title>
        <Grid container rowSpacing={5} columnSpacing={12}>
          {dessertsTypes.map((type) => {
            return <DessertTypeCard type={type} key={type.name} />;
          })}
        </Grid>
        <Title variant="title">Лучшие предложения</Title>
        <Grid container rowSpacing={4} columnSpacing={10}>
          {desserts.map((dessert) => {
            return (
              <Grid key={dessert.id} item xs={3}>
                <DessertCard dessert={dessert} />
              </Grid>
            );
          })}
        </Grid>
      </MainContainer>
    </MainWrapper>
  );
};

export default Main;
