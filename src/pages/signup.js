import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Icon, IconButton, Link, Snackbar } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Alert } from '@material-ui/lab';
import { Auth } from 'aws-amplify';

const Signup  = ()=> {
  const history = useHistory();

  const [newUser, setNewUser] = useState({email:'',password:'',username:''});
  const [message, setMessage] = useState({open:false, message: '', type:'success'});

  const getUser = async () => {
    const user = await Auth.currentUserInfo()
    console.log('user:', user)
    if(user){
      history.replace('/todo')
    }
  }

  useEffect(() => {    
    getUser()
  });

  const register = async () => {
    try{
      const { user } = await Auth.signUp({
        username: newUser.email,
        password: newUser.password,
        attributes: {
            email: newUser.email
        }
      });
      setMessage({message:'User created succesfully', type:'success', open:true});
      history.replace('/todo');
    }catch(error){
      setMessage({message:error.message, type:'error', open:true})
    }
    
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setMessage({open:false});
  };


  return (
    <Container component="main" maxWidth="xs">
      <IconButton aria-label="back" onClick={()=>{ history.goBack()}}>
        <Icon fontSize="large">arrow_back</Icon>
      </IconButton>
      <Typography component="h1" variant="h3">
          New Account
      </Typography>
      <Snackbar open={message.open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={message.type}>
          {message.message}
        </Alert>
      </Snackbar>
      <form>
      < TextField
            variant="filled"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Create Username"
            name="username"
            autoFocus
            value={newUser.username}
            onChange={(event)=>{ setNewUser({...newUser, username: event.target.value})}}
          />
      < TextField
            variant="filled"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={newUser.email}
            onChange={(event)=>{ setNewUser({...newUser, email: event.target.value})}}
            
          />
        <TextField
            variant="filled"
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            type="password"
            autoFocus
            value={newUser.password}
            onChange={(event)=>{ setNewUser({...newUser, password: event.target.value})}}
          />
        <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            onClick={()=> {register()}}
          >
            Create
          </Button>
          <Box mt={4}>
            Already have an account? <Link variant="body2" href="/login">Login Here</Link>
          </Box>
      </form>
    </Container>
  )
}

export default Signup;