import { 
  BottomNavigation, 
  BottomNavigationAction, 
  Box, 
  Container, 
  Fab, 
  Icon, 
  IconButton, 
  List, 
  ListItem, 
  ListItemSecondaryAction, 
  ListItemText, 
  makeStyles, 
  Typography 
} from "@material-ui/core";
import { useState } from "react";

const useStyles = makeStyles({
  list:{
    minHeight:'500px'
  }
})

const ToDo = () => {
  const styles  = useStyles()
  const [value, setValue] = useState()
  const [todos, setTodos] = useState([
    {
      todo:'Todo 1',
      completed: true,
      id: 1
    }, 
    {
      todo:'Todo 2',
      completed: false,
      id: 2
    }, 
    {
      todo:'Todo 3',
      completed: false,
      id: 3
    }, 
  ]);

  const [open, setOpen] = useState(false);

  const markToDo = (item, completed) => {
    console.log('item:', item, 'completed:', completed);
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
              <ListItemText>{item.todo}</ListItemText>
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
      </Box>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        
      >
        <BottomNavigationAction label="Profile" value="profile" icon={<Icon>person</Icon>} />
        <Fab color="primary" aria-label="add" onClick={()=>{setOpen(true)}}>
          <Icon>add</Icon>
        </Fab>
        
        <BottomNavigationAction label="Settings" value="settings" icon={<Icon>settings</Icon>}  />
      </BottomNavigation>
    </Container>
  );
}

export default ToDo;