import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { Box, Link, Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { useHistory } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { useEffect } from 'react';

const Welcome  = () => {
  const history = useHistory();

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
  



  return (
    <Container component="main" maxWidth="xs">
      <Box p={5}>
        <Box mb={4}>
          <Skeleton variant="circle" width={60} height={60}  />
        </Box>
        <Box mb={4}>
          <Typography component="h1" variant="h1" mt={4}>
            Start your adventure
          </Typography>
        </Box>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={()=>{ history.push('/login')}}          
        >
          Log In
        </Button>
        <Box mt={4}>
          Don't have an account? <Link variant="body2" href="/signup">Register Here</Link>
        </Box>
      </Box>
    </Container>
  )
}

export default Welcome;