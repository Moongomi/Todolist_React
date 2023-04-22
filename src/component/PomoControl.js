import React, { useState, useEffect } from "react";
import { Grid, TextField, Button, IconButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import useSound from "use-sound";
import Settings from "@mui/icons-material/Settings";
import timesUpSfx from "../sound/timesUp.mp3";
import PomoDisplay from "./PomoDisplay";
import PomoSetting from "./PomoSetting";

const PomoControl = (props) => {
  const { items, pickedRandomItem, closeModal, setItems } = props;
  const [isActive, setIsActive] = useState(false);
  const [buttonText, setButtonText] = useState("Start");
  const editItem = props.editItem;
  const [ settingsVisible, setSettingsVisible ] = useState(false)
  const [timerMode, setTimerMode] = useState("pomo"); // options: pomo, rest
  const [pomoLength, setPomoLength] = useState(3);
  const [restLength, setRestLength] = useState(5);
  const [secondsLeft, setSecondsLeft] = useState(pomoLength * 60);
  const [spendSecond, setSpendSecond] = useState(0);

  const [volume, setVolume] = useState(1);
  const [timesUp] = useSound(timesUpSfx, {
    volume: volume,
  });

  useEffect(() => {
    console.log('Control Effect');
    if (isActive) {
      const interval = setInterval(() => {
        setSecondsLeft((secondsLeft) => secondsLeft - 1);
        if (timerMode === "pomo"){
          setSpendSecond((spendSecond) => spendSecond + 1);
        }
      }, 1000);

      if (secondsLeft === 0) {
        clearInterval(interval);
        setIsActive(false);
        setButtonText("Start");
        timesUp();
      }

      return () => clearInterval(interval);
    }
  }, [isActive, secondsLeft, timesUp]);

  
  const toggleSettingsVisibility = (event) => {
    setSettingsVisible(!settingsVisible)
  }

  const formatTimeLeft = (seconds) => {
    return `${Math.floor(seconds / 60)}:${
      seconds % 60 > 9 ? seconds % 60 : "0" + (seconds % 60)
    }`;
  };

  const calcPercentage = () => {
    let percentage = 0;
    if (timerMode === "pomo") {
      percentage = ((pomoLength * 60 - secondsLeft) / (pomoLength * 60)) * 100;
    }
    if (timerMode === "rest") {
      percentage = ((restLength * 60 - secondsLeft) / (restLength * 60)) * 100;
    }
    return percentage;
  };

  const handleModeClick = (event) => {
    setIsActive(false);
    setButtonText('Start');
    const { className, textContent } = event.target;
    if (textContent === 'Pomo') {
      setSecondsLeft(pomoLength * 60);
      setTimerMode('pomo');
    } else if (textContent === 'Rest') {
      setSecondsLeft(restLength * 60);
      setTimerMode('rest');
    }
  };

  return (
    <>
        <Box className="tabs" xs={12} style={{ marginTop: "10px" }}>
        <Button
          className="pomoTap"
          variant="soft"
          color="primary"
          size="md"
          onClick={handleModeClick}
          sx={{ background: "#ffffff"}}
        >
          Pomo
        </Button>
        <Button
          className="restTap"
          variant="soft"
          color="primary"
          size="md"
          onClick={handleModeClick}
          sx={{ background: "#ffffff"}}
        >
          Rest
        </Button>
        <IconButton
            color="primary"
            size="medium"
            style={{ background: "#ffffff", marginLeft: "20px" }}
            onClick={toggleSettingsVisibility}
          >
            <Settings />


      </IconButton>
      <PomoSetting visible={settingsVisible}
                toggleSettingsVisibility={toggleSettingsVisibility} 
                pomoLength={pomoLength}
                setPomoLength={setPomoLength}
                restLength={restLength}
                setRestLength={setRestLength}
                closeSettings={toggleSettingsVisibility}
                setSecondsLeft={setSecondsLeft}
                timerMode={timerMode}
                />


      </Box>

    <PomoDisplay
      closeModal={closeModal}
      pickedRandomItem={pickedRandomItem}
      items={items}
      timerMode={timerMode}
      percentage={calcPercentage()}
      timeLeft={formatTimeLeft(secondsLeft)}
      isActive={isActive}
      setIsActive={setIsActive}
      buttonText={buttonText}
      setButtonText={setButtonText}
      volume={volume}
      setVolume={setVolume}
      editItem={editItem}
      spendSecond={spendSecond}
      setSpendSecond={setSpendSecond}
    />
                </>
  );
};

export default PomoControl;
