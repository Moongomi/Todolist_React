import React, { useState,useEffect } from "react";
import { Grid, TextField, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import "./RandomTodo.css";

const RandomTodo = (props) => {
  //const [text, setRandomText] = useState({title: ""});
  //const text = props.text;
  const { text } = useParams();
  console.log('random text 넘어오는지 테스트',text);
  //const [scroll,setScroll] = useState('out');
  //const addItem = props.addItem
  /*
  useEffect(() => {
    Splitting();
    setScroll('in');
  },[]);
  */
/*
  const onInputChange = (event) =>{
    setItem({title: event.target.value});
  };

  const onButtonClick = () =>{
    addItem(item);
    setItem({title:""})
  }
*/

  return (
    <div className="effect" style={{ background: '#003090' }}>
    <div className="blocks" >
      {text}
    </div>
    </div>
    /*
    <Grid container style={{marginTop: 20}}>
        <Grid xs={11} md={11} item style={{paddingRight: 16}}>
            <TextField placeholder="Add Todo" fullWidth onChange={onInputChange} value={item.title} />
        </Grid>
        <Grid xs={1} md={1} item>
            <Button fullWidth style={{height: '100%'}} color="secondary" variant="outlined" onClick={onButtonClick}>
                +
            </Button>
        </Grid>
    </Grid>*/
  );
};

export default RandomTodo;
