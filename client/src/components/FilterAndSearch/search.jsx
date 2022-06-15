import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";

const Search = ({ searchQuery, handleChange, handleSearch }) => {
  return (
    <TextField
      id="outlined-start-adornment"
      fullWidth
      placeholder="Поиск..."
      variant="standard"
      value={searchQuery}
      onChange={handleChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconButton onClick={() => handleSearch()}>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default Search;
