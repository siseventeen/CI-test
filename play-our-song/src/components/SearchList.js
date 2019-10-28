import React, { useState } from 'react';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import Downshift from 'downshift';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';

//----------Spotify API------------------
var client_id = '690c30f6add5454c8a5660405b6b228c'; // Your client id
var client_secret = '9b9451343b7e425c95f0996e6f35f031'; // Your secret
// var redirect_uri = 'http://www.google.com'; // Your redirect uri
var SpotifyWebApi = require('spotify-web-api-node');
// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId: client_id,
  clientSecret: client_secret,
  redirectUri: 'http://www.example.com/callback'
});
spotifyApi.setAccessToken('BQD_LrnVmPpAqcUWESTBkIADmIaZdHhbpYhSAOgaOmbcOPVHPfO4jwoJFHEHlcC46sn5Xi_7HKfmQVUjhzn5B09D-fu9vDuS1Fbeio3adoK-0dvR9eiyF3hSb02Wxq65Mnc-9zh0lpdPBnhIWDGHErkk7CP9VcyGwA');

const renderInput = (inputProps) => {
  const { InputProps, classes, ref, ...other } = inputProps;

  return (
    <TextField
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
          input: classes.inputInput,
        },
        ...InputProps,
      }}
      {...other}
    />
  );
}

renderInput.propTypes = {
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object.isRequired,
  InputProps: PropTypes.object,
};

const renderSuggestion = (suggestionProps) => {
  const { suggestion, index, itemProps, highlightedIndex, selectedItem } = suggestionProps;
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem ? selectedItem.label : '').indexOf(suggestion.label) > -1;
  return (
    <MenuItem
      {...itemProps}
      key={suggestion.id}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
    >
      {suggestion.label}
    </MenuItem>
  );
}

renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.number]).isRequired,
  index: PropTypes.number.isRequired,
  itemProps: PropTypes.object.isRequired,
  selectedItem: PropTypes.string.isRequired,
  suggestion: PropTypes.shape({
    label: PropTypes.string.isRequired,
  }).isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: 35,
  },
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  chip: {
    margin: theme.spacing(0.5, 0.25),
  },
  inputRoot: {
    flexWrap: 'wrap',
  },
  inputInput: {
    //width: 'auto',
    flexGrow: 1,
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      maxWidth: 800,
    },
  },
  divider: {
    height: theme.spacing(2),
  },
}));

const IntegrationDownshift = ({ tracks, forceUpdate }) => {
  const classes = useStyles();
  const [suggestions, setSuggestions] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [allTracks, setAllTracks] = useState([]);

  const fetchAPISuggestions = (input) => {
    console.log(input);
    spotifyApi.searchTracks('track:' + input)
      .then(function(data) {
        const resp = data.body.tracks.items;
        console.log("called API");
        setAllTracks(Object.values(resp));
        setSuggestions(Object.values(resp).map(track => {return {
          id: track.id,
          label: track.name,
        }}));
      }, function(err) {
        console.error(err);
      });
  }

  const getSuggestions = (value, { showEmpty = false } = {}) => {
    console.log('getSuggestions called');

    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;
    console.log("input", inputValue);
    fetchAPISuggestions(inputValue);
    const _filteredSuggestions = inputLength === 0 && !showEmpty
      ? []
      : suggestions.filter(suggestion => {
          const keep = count < 10;
          if (keep) {
            count += 1;
          }
          return keep;
        });
    setFilteredSuggestions(_filteredSuggestions);
  };

  const getTrack = (trackId) => {
    for(var track in allTracks){
      console.log("allT", allTracks[track].name);
      console.log("ID", trackId);
      if(allTracks[track].id === trackId){

        console.log("found", trackId);
        return allTracks[track];
      }
    }
  }

  const addToPlaylist = (selectedItem) => {
    if (!selectedItem) {
      return;
    }
    console.log(174, getTrack(selectedItem.id));
    tracks.items.push(getTrack(selectedItem.id));
    tracks.setItems(tracks.items);
    forceUpdate();
  };

  return (
    <div className={classes.root}>
      <Downshift
        id="downshift-options"
        onInputValueChange={getSuggestions}
        onChange={addToPlaylist}
        itemToString={item => item ? item.label : ''}>
        {({
          clearSelection,
          getInputProps,
          getItemProps,
          getLabelProps,
          getMenuProps,
          highlightedIndex,
          inputValue,
          isOpen,
          openMenu,
          selectedItem,
        }) => {
          const { onBlur, onChange, onFocus, ...inputProps } = getInputProps({
            onChange: event => {
              if (event.target.value === '') {
                clearSelection();
              }
            },
            onFocus: openMenu,
            placeholder: 'Search...',
          });

          return (
            <div className={classes.container}>
              {renderInput({
                fullWidth: true,
                classes,

                InputLabelProps: getLabelProps({ shrink: true }),
                InputProps: { onBlur, onChange, onFocus },
                inputProps,
              })}
              <div {...getMenuProps()}>
                {isOpen ? (
                  <Paper className={classes.paper} square>
                    {filteredSuggestions.map((suggestion, index) => {
                      return renderSuggestion({
                        suggestion,
                        index,
                        itemProps: getItemProps({ item: suggestion }),
                        highlightedIndex,
                        selectedItem,
                      })},
                    )}
                  </Paper>
                ) : null}
              </div>
            </div>
          );
        }}
      </Downshift>
    </div>
  );
}
export default IntegrationDownshift;
