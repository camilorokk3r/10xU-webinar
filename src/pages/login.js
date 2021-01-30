import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { IconButton, Link, Snackbar } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Icon from '@material-ui/core/Icon';
import { useHistory } from 'react-router-dom';
import firebase from "firebase/app";
import "firebase/auth";
import { FirebaseAuthConsumer } from '@react-firebase/auth';
import { Alert } from '@material-ui/lab';
import { useState } from 'react';




const Login  = ()=> {
  const history = useHistory();
  const [newUser, setNewUser] = useState({email:'',password:''});
  const [message, setMessage] = useState({open:false, message: '', type:'success'});

  const signin = async () => {
    try{
      await firebase.auth().signInWithEmailAndPassword(newUser.email, newUser.password)
      setMessage({message:'Login succesfull!', type:'success', open:true});
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
          Log in
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
            onClick={()=>{signin()}}
          >
            Log In
          </Button>
          <Box mt={4}>
            Don't have an account? <Link variant="body2" href="/signup">Register Here</Link>
          </Box>
      </form>
      <FirebaseAuthConsumer>
        {({ isSignedIn, user, providerId }) => {
          
          if (isSignedIn && user){
            console.log(user, history)
            history.replace('/todo')
          }
          
        }}
      </FirebaseAuthConsumer>
    </Container>
  )
}

export default Login;