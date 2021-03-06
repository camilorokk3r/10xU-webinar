import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { Box, Link, Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { useHistory } from 'react-router-dom';
import { FirebaseAuthConsumer } from '@react-firebase/auth';

const Welcome  = ()=> {
  const history = useHistory();
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

export default Welcome;