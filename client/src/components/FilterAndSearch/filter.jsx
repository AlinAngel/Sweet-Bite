import React, { useState } from "react";
import dessersTypesList from "../../json/dessert-types.json";
import { FormControl, Grid, MenuItem, Select } from "@mui/material";

const Filter = ({ list, isFilter, menuItem, setMenuItem }) => {
  const handleChangeItem = (event) => {
    setMenuItem(event.target.value);
  };
  return (
    <FormControl fullWidth>
      {isFilter ? (
        <Select
          defaultValue={""}
          onChange={handleChangeItem}
          displayEmpty
          variant="standard"
          inputProps={{ "aria-label": "Without label" }}
        >
          {isFilter && <MenuItem value="">Все</MenuItem>}
          {list.map((item) => (
            <MenuItem value={item.id} key={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      ) : (
        <Select
          value={""}
          renderValue={() => menuItem.title}
          onChange={handleChangeItem}
          displayEmpty
          variant="standard"
          inputProps={{ "aria-label": "Without label" }}
        >
          {list.map((item) => (
            <MenuItem value={item} key={item.id}>
              {item.title}
            </MenuItem>
          ))}
        </Select>
      )}
    </FormControl>
  );
};

export default Filter;
