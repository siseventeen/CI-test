import React, { useEffect, useState } from 'react';
import { reactContext } from './utils/store';
import Playlist from './components/Playlist';
import TopBar from './components/TopBar';
import EventPlaylistConfig from './components/EventPlaylistConfig';
import { fade,makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBbCXkK69d0bTOb4E5WBdgg9mbchMNzFak",
  authDomain: "ci-test-11a9a.firebaseapp.com",
  databaseURL: "https://ci-test-11a9a.firebaseio.com",
  projectId: "ci-test-11a9a",
  storageBucket: "ci-test-11a9a.appspot.com",
  messagingSenderId: "281561229382",
  appId: "1:281561229382:web:8d9f2af7cbd523ef750247",
};

firebase.initializeApp(firebaseConfig);


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

  const [playlistTitle, setPlaylistTitle] = React.useState('Untitled Playlist');
	const [playlistEvents, setPlaylistEvents] = React.useState([]);
  const [open, setOpen] = React.useState(true);

  const store = {
		playlistTitle: [playlistTitle, setPlaylistTitle],
		playlistEvents: [playlistEvents, setPlaylistEvents],
		open: [open, setOpen],
	}
  
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  return(
  <React.Fragment>
  <reactContext.Provider value={store}>
  <TopBar token={ tokens } username = {username} profilePic = {profilePic} className={classes.grow } />
  <Container maxWidth="md" >
    <Playlist tracks={ tracks } />
  </Container>
  <EventPlaylistConfig setTracks={ setTracks } userId={ userId } authToken={ tokens } forceUpdate={ forceUpdate }/>
  </reactContext.Provider>
  </React.Fragment>

);}


export default App;
