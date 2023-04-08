import React, { useState,useRef } from "react";
import { Checkbox, InputBase, ListItem, ListItemText, ListItemSecondaryAction,IconButton } from "@mui/material";
import Close from "@mui/icons-material/Close";

const Todo = (props) => {
  const [item, setItem] = useState(props.item);
  const [readOnly, setReadOnly] = useState(true);
  const deleteItem = props.deleteItem
  const editItem = props.editItem

  const delItemEvent = () =>{
    deleteItem(item);
  };

  const turnOffReadOnly = () =>{
    setReadOnly(false);
  };

  const turnOnReadOnly = (e) =>{
    if(e.key === "Enter" && !readOnly){
      setReadOnly(true);
      editItem(item);

    }
  };

  const editItemEvent = (e) =>{
    setItem({...item,title:e.target.value});
  };

  const checkboxEvnet = (e) =>{
    item.done = e.target.checked;
    editItem(item);
  }

  return (
    <ListItem>
      <Checkbox checked={item.done} onChange={checkboxEvnet} />
      <ListItemText>
        <InputBase
          inputProps={{ "aria-label": "naked",
          readOnly: readOnly
         }}
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
