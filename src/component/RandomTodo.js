import React, { useState, useEffect } from "react";
import { Grid, TextField, Box, IconButton } from "@mui/material";
import "./RandomTodo.css";
import Button from "@mui/joy/Button";
import { useNavigate } from "react-router-dom";
import Close from "@mui/icons-material/Close";
import PropTypes from 'prop-types';

const RandomTodo = (props) => {
  const navigate = useNavigate();
  const { pickedRandomItem, closeModal } = props;
  
  function redirectToPomo() {
    navigate("/pomo");
  }

  return (
    <Box
      className="effect"
      display="flex"
      style={{ background: "#003090" }}
      spacing={2}
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Box className="blocks" xs={12}>
        {pickedRandomItem.title}
      </Box>

      <Box className="buttons" xs={12} style={{ marginTop: "10px" }}>
        <Button
          className="pomoButton"
          variant="soft"
          color="danger"
          size="md"
          onClick={redirectToPomo}
        >
          Pomo
        </Button>
        <IconButton
          color="error"
          size="medium"
          style={{ background: "#ffffff", marginLeft: "20px" }}
          onClick={closeModal}
        >
          <Close />
        </IconButton>
      </Box>
    </Box>
  );
};

RandomTodo.propTypes = {
  pickedRandomItem: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default RandomTodo;
