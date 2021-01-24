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
  TextField, 
  Typography 
} from "@material-ui/core";
import { useState } from "react";

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
  const styles  = useStyles()
  const [value, setValue] = useState()
  const [todos, setTodos] = useState([
    {
      title: 'Todo 1',
      completed: true,
      id: 1
    }, 
    {
      title: 'Todo 2',
      completed: false,
      id: 2
    }, 
    {
      title: 'Todo 3',
      completed: false,
      id: 3
    }, 
  ]);

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [fabClass, setFabClass] = useState();

  const markToDo = (item, completed) => {
    console.log('item:', item, 'completed:', completed);
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

  return (
    <Container component="main" maxWidth="xs">
      <Typography variant="h3">
        Today
      </Typography>
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
                onClick={()=>{ }}          
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
    </Container>
  );
}

export default ToDo;