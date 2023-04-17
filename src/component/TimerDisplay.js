import React, { useState,useEffect } from "react";
import { Grid, TextField, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import CircularProgress from '@mui/joy/CircularProgress';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const TimerDisplay = (props) => {
  const [age, setAge] = useState('');
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <div>

    
    <div className="effect" style={{ background: '#003090' }}>
    </div>
    <CircularProgress size="lg" determinate value={3}>
    2 / 3
  </CircularProgress>

  <Box sx={{marginTop: '20px'}}>
      <FormControl sx={{background:'#ffffff',minWidth: 500 }}>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </Box>
  </div>

  );
};

export default TimerDisplay;
