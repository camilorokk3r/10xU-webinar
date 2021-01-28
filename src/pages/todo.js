import { 
  Avatar,
  BottomNavigation, 
  BottomNavigationAction, 
  Box, 
  Button, 
  CircularProgress, 
  Container, 
  Fab, 
  Icon, 
  IconButton, 
  Input, 
  List, 
  ListItem, 
  ListItemAvatar, 
  ListItemSecondaryAction, 
  ListItemText, 
  makeStyles, 
  Paper, 
  Popover, 
  Slide, 
  Snackbar, 
  TextField, 
  Typography 
} from "@material-ui/core";
import firebase from "firebase/app";
import "firebase/storage"
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
  },
  file:{
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0,
    opacity:0
  },
  modalContainer:{
    position: 'absolute',
    zIndex: 1,
    width:'400px',
    height:'600px',
    display: 'flex',
    alignItems: 'center'
  },
  fabClose:{
    position:'absolute',
    bottom:'5%',
    left:'44%'
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
  const [modal, setModal] = useState({image:null, checked: false});
  const [uploading, setUploading] = useState(false);

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

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setMessage({ open:false})
  };

  const uploadImage = async (event) => {
    try{
      console.log('event:', event, event.target, event.target.files);
      const files = event.target.files || [];
      const file = files[0]
      console.log('The file:', file);
      const ref = firebase.storage().ref().child(file.name)
      setUploading(true);
      const snapshot = await ref.put(file)
      console.log(snapshot);
      const imageURL = await snapshot.ref.getDownloadURL()
      newTodo.image = imageURL;
      setUploading(false);
    }catch(error){
      console.error(error);
      setMessage({message: error.message, open:true, type: 'error'});
      setUploading(false);
    }
    
  }

  const showImage = async(item) => {
    console.log('item.image:', item.image)
    if(item.image){
      setModal({image: item.image, checked: true});
    }
  }

  useEffect(() => {
    getToDos()
  },[]);

  return (
    <Container component="main" maxWidth="xs">
      <Typography variant="h3">
        Today
      </Typography>
      <Snackbar open={message.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={message.type}>
          {message.message}
        </Alert>
      </Snackbar>
      <Box className={styles.list}>
        <Slide direction="up" in={modal.checked} mountOnEnter unmountOnExit>
          <Paper elevation={4} className={styles.modalContainer}>
            <div style={{width:'400px',height:'400px',backgroundSize:'cover', backgroundImage: `url(${modal.image})`, flex:'1'}}>
              &nbsp;
            </div>
            <Fab color="primary" aria-label="add" onClick={()=>{setModal({checked:false})}} className={styles.fabClose}>
              <Icon>close</Icon>
            </Fab>
          </Paper>
        </Slide>
        <List>
          {todos.map(item=>(
            <ListItem key={item.id} divider="true" onClick={()=>{showImage(item)}}>
              <ListItemAvatar>
                <Avatar src={item.image}>
                  N/A        
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={item.title} secondary={item.description}></ListItemText>
              
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
              type="date"
              defaultValue={Date.now}
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
            <Button
              type="button"                
              variant="outlined"
              color="primary"
            >
              Add Image
              <Input type="file" accept="image/*" className={styles.file} onChange={uploadImage}></Input>
              <Input type="hidden" value={newTodo.image} onChange={(event)=>{ setNewTodo({...newTodo, image: event.target.value})}}></Input>
            </Button>
            {uploading? <CircularProgress  /> : null}
            
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