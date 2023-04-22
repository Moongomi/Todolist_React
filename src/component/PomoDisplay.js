import React, { useState, useEffect } from "react";
import { Grid, TextField, Button, IconButton, Typography } from "@mui/material";
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

const PomoDisplay = (props) => {
  const { items, pickedRandomItem, closeModal } = props;
  const [selectedValue, setSelectedValue] = useState(pickedRandomItem);
  const editItem = props.editItem;
  const {
    timerMode,
    percentage,
    timeLeft,
    isActive,
    setIsActive,
    buttonText,
    setButtonText,
    volume,
    setVolume,
    spendSecond,
    setSpendSecond,
  } = props;

  const [play] = useSound(startSfx, {
    interrupt: true,
    volume: volume,
  });
  const [pause] = useSound(pauseSfx, {
    interupt: true,
    volume: volume,
  });

  const handleChange = (event) => {
    console.log('handleChange');
    const newSelected = event.target.value;
    const selectedItem = items.find((item) => item.id === newSelected);
    setSelectedValue(selectedItem);
    console.log('selected value', selectedValue);
  };
  const handlePomoClick = (event) => {
    if (isActive) {
      pause();
    } else {
      play();
    }

    setButtonText(
      buttonText === "Start" || buttonText === "Resume" ? "Pause" : "Resume"
    );
    setIsActive(!isActive);
  };

  const handleStopClick = (event) => {
    selectedValue.spendtime += spendSecond;
    editItem(selectedValue);
    setSpendSecond(0);
    setIsActive(false);
    setButtonText('Start');
    window.location.href = "/";
  };

  const handleSoundClick = (event) => {
    setVolume((prevVolume) => (prevVolume === 0 ? 1 : 0));
  };

  let selectBox = (
    <Box sx={{ marginTop: "20px" }}>
      <FormControl sx={{ background: "#ffffff", minWidth: 500 }}>
        <InputLabel id="demo-simple-select-label">Todo</InputLabel>
        <NativeSelect value={selectedValue.id} onChange={handleChange}>
          {items.map((item) => (
            <option value={item.id} key={item.id}>
              {item.title}
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
        <CircularProgress size="lg" determinate value={percentage}>
          {timeLeft}
        </CircularProgress>

        <Typography variant="h6">
          Choosed Todo : {selectedValue.title}
        </Typography>

        {selectBox}

        <Box className="buttons" xs={12} style={{ marginTop: "10px" }}>
          <Button
            className="pomoButton"
            variant="soft"
            color="primary"
            size="md"
            onClick={handlePomoClick}
            sx={{ background: "#ffffff" }}
          >
            {buttonText}
          </Button>
          <Button
            className="stopButton"
            variant="soft"
            color="primary"
            size="md"
            onClick={handleStopClick}
            sx={{ background: "#ffffff" }}
          >
            Stop & Save
          </Button>
          {volume === 1 ? (
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
export default PomoDisplay;
