import React, { useState } from "react";
import {
  Checkbox,
  InputBase,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import Close from "@mui/icons-material/Close";
import Schedule from "@mui/icons-material/Schedule";

const Todo = (props) => {
  const [item, setItem] = useState(props.item);
  const [readOnly, setReadOnly] = useState(true);
  const deleteItem = props.deleteItem;
  const editItem = props.editItem;

  const delItemEvent = () => {
    deleteItem(item);
  };

  const turnOffReadOnly = () => {
    setReadOnly(false);
  };

  const turnOnReadOnly = (e) => {
    if (e.key === "Enter" && !readOnly) {
      setReadOnly(true);
      editItem(item);
    }
  };

  const editItemEvent = (e) => {
    setItem({ ...item, title: e.target.value });
  };

  const checkboxEvnet = (e) => {
    item.done = e.target.checked;
    editItem(item);
  };

  return (
    <ListItem>
      <Checkbox checked={item.done} onChange={checkboxEvnet} />
      <ListItemText>
        <InputBase
          inputProps={{ "aria-label": "naked", readOnly: readOnly }}
          type="text"
          id={item.id}
          name={item.id}
          value={item.title}
          multiline={true}
          fullWidth={true}
          onClick={turnOffReadOnly}
          onKeyDown={turnOnReadOnly}
          onChange={editItemEvent}
        />

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Schedule />
          <Typography
            variant="body2"
            align="justify"
            sx={{ color: "text.secondary", ml: 1 }}
          >
            {item.daysago === 0
              ? "D Day"
              : item.daysago > 0
              ? `D+${item.daysago}`
              : `D${item.daysago}`}
          </Typography>

          <Typography
            variant="body2"
            align="justify"
            sx={{ color: "text.secondary", ml: 1 }}
          >
            Spend time : {item.spendtime}s
          </Typography>
        </Box>
      </ListItemText>
      <ListItemSecondaryAction>
        <IconButton aria-label="delete" onClick={delItemEvent}>
          <Close />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default Todo;
