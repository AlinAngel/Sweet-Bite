import { List, ListItemButton } from "@mui/material";
import React from "react";
import { ListWrapper, StyledListItemText } from "./SideMenu.styles";

const SideMenu = ({
  list,
  selectedListItem,
  selectedValue,
  handleListItemClick,
  withAll,
}) => {
  return (
    <ListWrapper>
      <List component="nav" aria-label="main mailbox folders">
        {withAll && (
          <ListItemButton
            selected={!selectedListItem}
            onClick={(event) => handleListItemClick(event, null)}
          >
            <StyledListItemText selected={!selectedListItem} primary={"Все"} />
          </ListItemButton>
        )}
        {list.map((item) => (
          <ListItemButton
            key={item.name}
            selected={selectedListItem == item[selectedValue]}
            onClick={(event) => handleListItemClick(event, item[selectedValue])}
          >
            <StyledListItemText
              selected={selectedListItem == item[selectedValue]}
              primary={item.name}
            />
          </ListItemButton>
        ))}
      </List>
    </ListWrapper>
  );
};

export default SideMenu;
