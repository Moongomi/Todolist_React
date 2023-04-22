import React from 'react'
import { Grid, TextField, Button, IconButton, Typography,Box } from "@mui/material";

import Close from "@mui/icons-material/Close";

const PomoSetting = ({ visible,
                    toggleSettingsVisibility,
                    pomoLength,
                    setPomoLength,
                    restLength,
                    setRestLength,
                    closeSettings,
                    setSecondsLeft,
                    timerMode,
                  }) => {

  const applySettings = (event) => {
    event.preventDefault();

    setPomoLength(event.target.pomodoro.value);
    setRestLength(event.target.break.value);
    closeSettings();

    switch(timerMode) {
      case 'rest':
        setSecondsLeft(event.target.break.value * 60);
        break;
      default:
        setSecondsLeft(event.target.pomodoro.value * 60);
    }
  };

  if (visible) {
    return (
        <Box sx={{
            border: "2px solid black",
            borderRadius: "10px",
            p: "20px",
            backgroundColor: "#f8f8f8",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}>
            <IconButton
              color="error"
              size="medium"
              style={{ background: "#ffffff", position: "absolute", top: "10px", right: "10px" }}
              onClick={toggleSettingsVisibility}
            >
              <Close />
            </IconButton>
            <h2>Settings</h2>
            <form onSubmit={applySettings}>
              <div className="pane__time-settings" style={{ marginBottom: "20px" }}>
                <h3>Time (Minutes)</h3>
                <div action="" className="time-settings__form">
                  <label htmlFor="pomodoro" style={{ marginRight: "10px" }}>pomodoro</label>
                  <input type="number" name="pomodoro" id="pomodoro" min="1" max="90" defaultValue={pomoLength} style={{ padding: "5px", borderRadius: "5px", border: "none", backgroundColor: "#ffffff" }} />
                  <label htmlFor="break" style={{ marginLeft: "10px", marginRight: "10px" }}>rest time</label>
                  <input type="number" name="break" id="break" min="1" max="90" defaultValue={restLength} style={{ padding: "5px", borderRadius: "5px", border: "none", backgroundColor: "#ffffff" }} />
                </div>
              </div>
              <Button type="submit" variant="contained" color="primary">
                Apply
              </Button>
            </form>
          </Box>
          
    );
  }
  
  return(null);
};

export default PomoSetting;