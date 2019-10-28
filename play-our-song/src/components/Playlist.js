import React from 'react';
import PlaylistItem from './PlaylistItem';
import {useStyles} from '../App';

import List from '@material-ui/core/List';

const Playlist = ({ tracks }) => {
  const classes = useStyles();
    return(
    <List className={classes.playList}>
      { tracks.map(track => <PlaylistItem track={ track } key={ track.id } />) }
    </List>
  );
};




export default Playlist;
