import './App.css';
import Todo from "./Todo";
import React, {useEffect, useState} from "react";
import { Paper,List, Container,Grid,Button,AppBar,Toolbar,Typography } from '@mui/material';
import AddTodo from './AddTodo';
import {call,signout} from "./service/ApiService";
import Loading from './Loading';

function App() {
  const [items,setItems] = useState([
    /*
    {
    id: "0",
    title: "Hello World",
    done: true
    },
    */
  ]);

  const [loading,setLoading] = useState(true);

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
    .then((res)=>setItems(res.data));
  };

  const deleteItem = (item) =>{
    call("/todo","DELETE",item)
    .then((res)=>setItems(res.data));
  };

  const editItem = (item) =>{
    call("/todo","PUT",item)
    .then((res)=>setItems(res.data));
  };

  let navigationBar = (
    <AppBar position="static">
      <Toolbar>
        <Grid justifyContent="space-between" container>
          <Grid item>
            <Typography variant='h6'>TodoList</Typography>
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
