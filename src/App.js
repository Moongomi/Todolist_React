import './App.css';
import Todo from "./component/Todo";
import React, {useEffect, useState} from "react";
import { Paper,List, Container,Grid,Button,AppBar,Toolbar,Typography } from '@mui/material';
import AddTodo from './component/AddTodo';
import RandomTodo from './component/RandomTodo';
import {call,signout} from "./service/ApiService";
import Loading from './component/Loading';
import { useNavigate  } from "react-router-dom";

function App() {
  const [items,setItems] = useState([]);

  const [loading,setLoading] = useState(true);

  const [randomText, setRandomText] = useState('');
  const navigate = useNavigate();

  useEffect(() =>{
    call("/todo","GET",null)
    .then((res)=>{
      setItems(res.data);
      setLoading(false);
      console.log('read item with duedate',res.data);
    });
  },[]);

  const addItem = (item) =>{
    call("/todo","POST",item)
    .then((res)=>{setItems(res.data)});
  };

  const deleteItem = (item) =>{
    call("/todo","DELETE",item)
    .then((res)=>setItems(res.data));
  };

  const editItem = (item) =>{
    call("/todo","PUT",item)
    .then((res)=>setItems(res.data));
  };

  const randomItem = () =>{
    call("/todo/random","GET",null)
    .then((res)=>{
      setRandomText(res);
      navigate(`/random-todo/${res.title}`);
    });
  };

  let navigationBar = (
    <AppBar position="static" enableColorOnDark sx={{ bgcolor: '#001e7c' }}>
      <Toolbar>
        <Grid justifyContent="space-between" container>
          <Grid item>
            <Typography variant='h6'>TodoList</Typography>
          </Grid>
          <Grid item>
            <Button color="inherit" onClick={randomItem} >
              랜덤
            </Button>
          </Grid>
          <Grid item>
            <Button color="inherit" onClick={signout}>
              로그아웃
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );

  let todoItems = items.length > 0 && (
    <Paper style={{margin: 16}}>
      <List>
        {items.map((item) =>(
          <Todo item={item} key={item.id} deleteItem={deleteItem} editItem={editItem} />
        ))}
      </List>
    </Paper>
  );

  let todoListPage = (
    <div>
      {navigationBar}
      <Container maxWidth="md">
        <AddTodo addItem={addItem} />
        <div className='TodoList'>{todoItems}</div>
      </Container>
    </div>
  );

  let loadingPage = (
    <Loading />
  )
  let content = loadingPage;

  if(!loading){
    content = todoListPage;
  }
  return <div className='App'>{content}</div>;
}

export default App;
