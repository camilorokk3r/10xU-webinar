import { 
  BottomNavigation, 
  BottomNavigationAction, 
  Box, 
  Button, 
  Container, 
  Fab, 
  Icon, 
  IconButton, 
  List, 
  ListItem, 
  ListItemSecondaryAction, 
  ListItemText, 
  makeStyles, 
  Paper, 
  Popover, 
  Snackbar, 
  TextField, 
  Typography 
} from "@material-ui/core";
import firebase from "firebase/app";
import 'firebase/firestore';
import { FirebaseAuthConsumer } from "@react-firebase/auth";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  list:{
    minHeight:'500px'
  },
  drawer:{
    padding:'20px', 
    maxWidth: '400px'
    // position:'absolute'
    
  },
  buttonContainer:{
    textAlign: 'right',
    '& > *': {
      margin: theme.spacing(1),
    }
  },
  rotated:{
    transform: 'rotate(45deg)'
  }
}))

const ToDo = () => {
  const history = useHistory()
  const styles  = useStyles()
  const [value, setValue] = useState()
  const [todos, setTodos] = useState([]);

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [fabClass, setFabClass] = useState();
  const [newTodo, setNewTodo] = useState({id:'',title:'', description: '', date: ''})
  const [message, setMessage] = useState({open:false, message: '', type:'success'});

  const markToDo = (item, completed) => {
    const index = todos.findIndex(search => { 
      return item.id === search.id
    })
    console.log(index);
    if(index !== -1){
      
      todos[index].completed = completed;
      console.log('todos:', todos);
      setTodos([...todos]);
    }
    
  }

  const saveToDo = async ()=> {
    try {
      const user  = firebase.auth().currentUser;
      newTodo.user = user.uid;
      console.log(newTodo);

      const todoDB = firebase.firestore().collection('todo');
      
      const docRef = await todoDB.add(newTodo)
      newTodo.id  = docRef.id;
      
      setNewTodo({title:'', description: '', date: ''})
      handleClose()  
      setMessage({message:'ToDo created successfully', type:'success', open:true})
      getToDos()
    } catch (error) {
      setMessage({message:error.message, type:'error', open:true})
    }
    
  }

  const getToDos = async () => {
    try {
      const user  = firebase.auth().currentUser;
      const todoDB = firebase.firestore().collection('todo');
      const querySnapshot = await todoDB.where("user", "==", user.uid).get()
      let todosFromDB = querySnapshot.docs.map(doc => {
        console.log(doc.id, doc.data())
        return {
          ...doc.data(),
          id: doc.id
        }
      })
      console.log('todosFromDB:', todosFromDB);
      setTodos([...todosFromDB])  
    } catch (error) {
      setMessage({message:error.message, type:'error', open:true})
    }
    
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
    setOpen(true);
    setFabClass(styles.rotated);
  }
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
    setFabClass('');
  }

  useEffect(() => {
    getToDos()
  },[]);

  return (
    <Container component="main" maxWidth="xs">
      <Typography variant="h3">
        Today
      </Typography>
      <Snackbar open={message.open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={message.type}>
          {message.message}
        </Alert>
      </Snackbar>
      <Box className={styles.list}>
        <List>
          {todos.map(item=>(
            <ListItem key={item.id} divider="true">
              <ListItemText>{item.title}</ListItemText>
              <ListItemSecondaryAction>
                {item.completed === true ?                 
                  <IconButton edge="end" aria-label="check" onClick={()=>{markToDo(item, false)}}>
                    <Icon>check_circle</Icon>
                  </IconButton>
                  : 
                  <IconButton edge="end" aria-label="check" onClick={()=>{markToDo(item, true)}}>
                    <Icon>radio_button_unchecked</Icon>
                  </IconButton>
                }
              </ListItemSecondaryAction>
            </ListItem>
          ))}
          
        </List>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
        >
          <Paper className={styles.drawer}>
            <Typography variant="h5">Add Item</Typography>
            <TextField
              variant="filled"
              margin="normal"
              required
              fullWidth
              id="title"
              label="Add Title"
              name="title"
              value={newTodo.title}
              onChange={(event)=>{ setNewTodo({...newTodo, title: event.target.value})}}
              autoFocus
            />
            <TextField
              variant="filled"
              margin="normal"
              required
              fullWidth
              id="date"
              label="Add Date"
              name="date"   
              value={newTodo.date}      
              onChange={(event)=>{ setNewTodo({...newTodo, date: event.target.value})}}   
              autoFocus
            />
            <TextField
              variant="filled"
              margin="normal"
              required
              fullWidth
              id="description"
              label="Description"
              name="description"  
              value={newTodo.description} 
              onChange={(event)=>{ setNewTodo({...newTodo, description: event.target.value})}}         
              autoFocus
            />
            <Box className={styles.buttonContainer}>
              <Button
                type="button"
                
                variant="outlined"
                color="primary"
                onClick={handleClose}          
              >
                Cancel
              </Button>
              <Button
                type="submit"
                
                variant="contained"
                color="primary"
                onClick={()=>{ saveToDo() }}          
              >
                Save
              </Button>
            </Box>
          </Paper>
        </Popover>
      </Box>
      
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        
      >
        <BottomNavigationAction label="Profile" value="profile" icon={<Icon>person</Icon>} />
        <Fab color="primary" aria-label="add" onClick={handleClick} className={fabClass}>
          <Icon>add</Icon>
        </Fab>
        
        <BottomNavigationAction label="Settings" value="settings" icon={<Icon>settings</Icon>}  />
      </BottomNavigation>
      <FirebaseAuthConsumer>
        {({ isSignedIn, user, providerId }) => {
          
          if (!isSignedIn || !user){
            console.log(user, history)
            history.replace('/')
          }
          
        }}
      </FirebaseAuthConsumer>
    </Container>
  );
}

export default ToDo;