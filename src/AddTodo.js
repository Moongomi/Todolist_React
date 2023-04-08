import React, { useState } from "react";
import { Grid, TextField, Button } from "@mui/material";

const AddTodo = (props) => {
  const [item, setItem] = useState({title: ""});
  const addItem = props.addItem

  const onInputChange = (event) =>{
    setItem({title: event.target.value});
    console.log(item);
  };

  const onButtonClick = () =>{
    addItem(item);
    setItem({title:""})
  }

  const pushEnter = (event) =>{
    if(event.key === 'Enter'){
        onButtonClick();
    }
  }

  return (
    <Grid container style={{marginTop: 20}}>
        <Grid xs={11} md={11} item style={{paddingRight: 16}}>
            <TextField placeholder="Add Todo" fullWidth onChange={onInputChange} value={item.title} onKeyDown={pushEnter} />
        </Grid>
        <Grid xs={1} md={1} item>
            <Button fullWidth style={{height: '100%'}} color="secondary" variant="outlined" onClick={onButtonClick}>
                +
            </Button>
        </Grid>
    </Grid>
  );
};

export default AddTodo;
