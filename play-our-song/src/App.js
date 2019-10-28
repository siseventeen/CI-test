import React, { useEffect, useState } from 'react';
import Playlist from './components/Playlist';
import TopBar from './components/TopBar';
import EventPlaylistConfig from './components/EventPlaylistConfig';
import { fade,makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

//-----------------START OF SPOTIFY BACKEND SETUP--------------------


// Get the hash of the url
const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function(initial, item) {
    if (item) {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});

window.location.hash = "";

//-----------------END OF SPOTIFY BACKEND SETUP--------------------

export const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  formControl: {
    marginTop: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
  grow: {
    flexGrow: 1,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: '200',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      maxWidth: 800,
    },
  },
  playList: {
    margin: theme.spacing(10, 0, 0, 0),
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
  },
  inline: {
    display: 'inline',
  },
}));

const useForceUpdate = () => {
  const [value, set] = useState(true);
  console.log(value);
  return () => {
    console.log('Force updating...')
    set(value=> !value);
  };
}



const App = () =>  {
  const classes = useStyles();
  const [tracks, setTracks] = useState([]);
  const forceUpdate = useForceUpdate();
  const [tokens, setTokens] = useState();
  const [profilePic, setProfilePic] = useState();
  const [username, setUsername] = useState();
  const [userId, setUserId] = useState();

  useEffect(() => {
    // Set access token for spotify
    let _token = hash.access_token;
    if (_token) {
      setTokens(_token);
      console.log(_token);
    }
    setTracks(tracks);

    if (_token){
      fetch('https://api.spotify.com/v1/me', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + _token,
        }
      })
      .then(res => res.json())
      .then((data) => {
        //user information returned as a JSON file
        console.log(data);
        setProfilePic(data.images[0].url);
        setUsername(data.display_name);
        setUserId(data.id);
      })
      .catch(console.log)
    }
  }, []);



  return(
  <React.Fragment>
  <TopBar token={ tokens } username = {username} profilePic = {profilePic} className={classes.grow } />
  <Container maxWidth="md" >
    <Playlist tracks={ tracks } />
  </Container>
  <EventPlaylistConfig tracks={ tracks } userId={ userId } authToken={ tokens } forceUpdate={ forceUpdate }/>
  </React.Fragment>

);}


export default App;
