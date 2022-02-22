import './App.css';
import React, { useState, useEffect } from "react";

import HeaderAppBar from './components/Appbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import axios from "axios";

import { Box, TextField, Grid, 
  CardContent, Typography, Divider, 
  Paper, InputAdornment, CssBaseline, 
  Stack} from '@mui/material';

import DeleteIcon from '@mui/icons-material/DeleteOutlined';


import LoadingButton from '@mui/lab/LoadingButton';

import EditIcon from '@mui/icons-material/Edit';
import { blueGrey } from '@mui/material/colors';

import SendIcon from '@mui/icons-material/Send';



function App() {

  const [title, setTitle] = useState('')
  const [noted, setNoted] = useState('')
  const [newNote, setNewNote] = useState('')


  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)

  const [inputValue, setInputValue] = useState(undefined)

  const [darkMode, setDarkmode] = useState(false)

  useEffect(() => {
    axios.get('https://etonote.herokuapp.com/read').then((response) =>{
      setNotes(response.data)
      
    })
  }, [loading, editLoading, deleteLoading])

  const addToList = async () => {
    axios.post('https://etonote.herokuapp.com/insert', {
      title: title, 
      noted: noted})
      setLoading(true)
      setTimeout(() => setLoading(false), 600)
      await setInputValue('')
      await setInputValue()
     
  }

  const updateNote = async (id) => {
    axios.put('https://etonote.herokuapp.com/update',
      {
        id: id, 
        newNote: newNote,
      })
      setEditLoading(true)
      setTimeout(() => setEditLoading(false), 600)
      await setInputValue('')
      await setInputValue()
  }

  const deleteNote = (id) => {
    axios.delete(`https://etonote.herokuapp.com/delete/${id}`, {
      id: id, 
      newNote: newNote,
    })
    setDeleteLoading(true)
    setTimeout(() => setDeleteLoading(false), 600)
  }

 const theme = createTheme({
   palette:{
     primary: blueGrey,
     mode: darkMode ? 'dark' : 'light'
   }
 })


  return (
         <ThemeProvider theme={theme}>
           <CssBaseline/>
           
          <div className="App">

    
      <HeaderAppBar
      check = {darkMode}
      change= {() => setDarkmode(!darkMode)}
      />
      <Stack 
      direction="column"
      display = "flex"
      flexWrap={'wrap'}
      justifyContent="center"
      alignItems="center"
      spacing={1}
      margin ={1}>

        <TextField 
        id="outlined-basic" 
        label="Title" 
        variant="outlined" 
        margin="normal"
        value={inputValue}
        onChange={(event) => {setTitle(event.target.value)}}/>
        
        <TextField
        multiline
        minRows={3}
        maxRows={3}
        value={inputValue}
        placeholder="Write notes here..."
        style={{ width: 400, margin: 10 }}
        InputProps={{
          style: {fontSize: 16},
          endAdornment: (
            <InputAdornment position="end">
              <LoadingButton
        onClick={addToList}
        endIcon={<SendIcon />}
        loading={loading}
        variant="contained"
      > Save
      </LoadingButton>
            </InputAdornment>
          ),
        }}
        onChange={(event) => {setNoted(event.target.value)}}/>
     
      </Stack>
      <div>
      <Grid
          sx={{px: 1}}
          container
          spacing={2}
          direction='row'
          justify='center'
          alignItems='center'
          >
      {notes.map((val, key) => {
        
        return (
          
            <Grid key={key} item xs={12} sm={6} md={4} lg={3}>
          <Paper 
          elevation={5}
          sx={{variant: 'outlined'}}
          >
    <CardContent>
      <Typography variant="h6" component="div">
        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
    {val.title} 
    <LoadingButton
            onClick={() => deleteNote(val._id)}
            endIcon={<DeleteIcon/>}
            loading={deleteLoading}
            ></LoadingButton>

    </Box>
      </Typography>
      <Divider />
      <Typography variant="body5">
        <br/>
      {val.note}
      </Typography>
      
    </CardContent>

    
    <TextField 
    onChange={(event) => {setNewNote(event.target.value)}}
    style={{width: '95%', margin: 10}}
    variant='outlined'
    value={inputValue}
        margin="normal"
        multiline
        minRows={2}
        maxRows={2}
        placeholder="Update note..."
        InputProps={{
          style: {fontSize: 14},
          endAdornment: (
            <InputAdornment position="end">
              
            
            <LoadingButton
            onClick={() => updateNote(val._id)}
            endIcon={<EditIcon/>}
            loading={editLoading}
            ></LoadingButton>

            </InputAdornment>
          ),
        }} />
        
    </Paper>
    </Grid>

        )
      })}
      </Grid>
    
      </div>
    </div>
    </ThemeProvider>
    
  )
}


export default App;


