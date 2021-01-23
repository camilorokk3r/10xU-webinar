import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { IconButton, Link } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Icon from '@material-ui/core/Icon';
import { useHistory } from 'react-router-dom';




const Login  = ()=> {
  const history = useHistory();

  return (
    <Container component="main" maxWidth="xs">
      <IconButton aria-label="back" onClick={()=>{ history.goBack()}}>
        <Icon fontSize="large">arrow_back</Icon>
      </IconButton>
      <Typography component="h1" variant="h3">
          Log in
      </Typography>
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
          />
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            
          >
            Log In
          </Button>
          <Box mt={4}>
            Don't have an account? <Link variant="body2" href="/signup">Register Here</Link>
          </Box>
      </form>
    </Container>
  )
}

export default Login;