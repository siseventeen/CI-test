import React from 'react';
import {useStyles} from '../App';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';


const giveThumbUp = () =>{

}

const PlaylistItem = ({ track }) => {
  const classes = useStyles();

  return(

  <ListItem>
  <ListItemText
          primary={track.name}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                color="textPrimary"
              >
              {track.artists[0].name}   •
              </Typography>
              •   {track.album.name}
            </React.Fragment>
          }
        />
  <ListItemSecondaryAction>
      <IconButton  className={classes.button} aria-label="Give a thumb up" onClick={() => giveThumbUp()}>
        <ThumbUpIcon />
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>)
};


export default PlaylistItem;
