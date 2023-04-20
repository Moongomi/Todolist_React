import React, { useState, useEffect } from "react";
import { Grid, TextField, Button, IconButton } from "@mui/material";
import CircularProgress from "@mui/joy/CircularProgress";
import Box from "@mui/material/Box";
import useSound from "use-sound";
import startSfx from "../sound/start.mp3";
import pauseSfx from "../sound/pause.mp3";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect, { SelectChangeEvent } from "@mui/material/NativeSelect";
import Close from "@mui/icons-material/Close";
import VolumeUp from "@mui/icons-material/VolumeUp";
import VolumeOff from "@mui/icons-material/VolumeOff";

const Pomo = (props) => {
  const { items, pickedRandomItem, closeModal } = props;
  const [setItems] = useState("");
  const [selectedValue, setSelectedValue] = useState(pickedRandomItem.title);
  const [sound,setSound] = useState(1);
  const [isActive, setIsActive] = useState(false);
  const [buttonText, setButtonText] = useState('Start');
  const leftTime = '5:00';
  const ratio = 40;

  const [play] = useSound(startSfx, {
    interrupt: true,
    volume: sound,
  });
  const [pause] = useSound(pauseSfx, {
    interupt: true,
    volume: sound,
  });

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handlePomoClick = (event)=>{
    if (isActive) {
      pause()
    }
    else {
      play()
    }

    setButtonText( buttonText === 'Start'
    || buttonText === 'Resume'
      ? 'Pause'
      : 'Resume'
  )
    setIsActive(!isActive)
  };

  const handleSoundClick = (event) => {
    setSound((prevVolume) => prevVolume === 0 ? 1 : 0);
  };

  let selectBox = (
    <Box sx={{ marginTop: "20px" }}>
          <FormControl sx={{ background: "#ffffff", minWidth: 500 }}>
            <InputLabel id="demo-simple-select-label">Todo</InputLabel>
            <NativeSelect value={selectedValue} onChange={handleChange}>
              {items.map((item) => (
                <option value={item.title} key={item.id}>
                  {" "}
                  {item.title}{" "}
                </option>
              ))}
            </NativeSelect>
          </FormControl>
        </Box>
  );

  return (
    <>
      <div>
        <div className="pomobox" style={{ background: "#ffffff" }}></div>
        <CircularProgress size="lg" determinate value={ratio} >
          {leftTime}
        </CircularProgress>

        {selectBox}

        <Box className="buttons" xs={12} style={{ marginTop: "10px" }}>
          <Button
            className="pomoButton"
            variant="soft"
            color="primary"
            size="md"
            onClick={handlePomoClick}
            sx={{ background: "#ffffff"}}
          >
            {buttonText}
          </Button>
          {sound === 1 ? (
            <IconButton
              color="error"
              size="medium"
              style={{ background: "#ffffff", marginLeft: "20px" }}
              onClick={handleSoundClick}
            >
              <VolumeUp />
            </IconButton>
          ) : (
            <IconButton
              color="error"
              size="medium"
              style={{ background: "#ffffff", marginLeft: "20px" }}
              onClick={handleSoundClick}
            >
              <VolumeOff />
            </IconButton>
          )}

          <IconButton
            color="error"
            size="medium"
            style={{ background: "#ffffff", marginLeft: "20px" }}
            onClick={closeModal}
          >
            <Close />
          </IconButton>
        </Box>
      </div>
    </>
  );
};

export default Pomo;
