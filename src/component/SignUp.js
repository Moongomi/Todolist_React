import React from "react";
import {Grid,Container,TextField,Button,Typography} from "@mui/material";
import {signup,signin} from "../service/ApiService";
import {Link} from 'react-router-dom';

function SignUp(){
  const handleSubmit = (event)=>{
    event.preventDefault();
    const data = new FormData(event.target);
    const username = data.get("username");
    const password = data.get("password");
    signup({username:username,password:password}).then(
        (res) =>{
            signin({username:username,password:password});
        }
    );
  };

  return(
    <Container component="main" maxWidth="xs" style={{marginTop:"8%"}}>
        <form noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography component="h1" variant="h5">
                회원가입
            </Typography>
            </Grid>
            <Grid item xs={12}>
            <TextField
             variant="outlined"
             required
             fullWidth
             id="username"
             label="계정명"
             name="username"
             autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
             variant="outlined"
             required
             fullWidth
             type="password"
             id="password"
             label="비밀번호"
             name="password"
             autoComplete="current-password"
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              회원가입
            </Button>
          </Grid>
        </Grid>
        <Grid container justifyContent="flex-end">
        <Grid item>
          <Link to="/login" variant="body2">
            이미 계정이 있으시다면 로그인 해주세요.
        </Link>
        </Grid>
      </Grid>
      </form>
    </Container>
  );
};


export default SignUp;
