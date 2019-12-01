import React from 'react';

export const reactContext = React.createContext();

/*
export const ContextProvider ({ children }) => {
	const [playlistTitle, setPlaylistTitle] = React.useState('Untitled Playlist');
	const [playlistEvents, setPlaylistEvents] = React.useState([]);
	const [open, setOpen] = React.useState(true);

	const store = {
		playlistTitle: [playlistTitle, setPlaylistTitle],
		playlistEvents: [playlistEvents, setPlaylistEvents],
		open: [open, setOpen],
	}

	return <reactContext.Provider value={store}>{children}</reactContext.Provider>
}
*/