import React, {useState, useEffect} from 'react';
import { render, fireEvent, findByRole, cleanup} from '@testing-library/react'
import { reactContext } from '../utils/store';
import '@testing-library/jest-dom/extend-expect';
import ReactDOM from 'react-dom';
import EventPlaylistConfig from './EventPlaylistConfig';
//import Topbar from './Topbar';

afterEach(cleanup);

test('component builds', () => {
    const tracks = jest.fn();
    const userId = "user_id";
    const tokens = "tokens";
    const forceUpdate = jest.fn();

    const setPlaylistTitle= jest.fn();
	const setPlaylistEvents= jest.fn();
	const setOpen= jest.fn();
	const store = {
		playlistTitle: ['untitled',setPlaylistTitle],
		playlistEvents: [['party'],setPlaylistEvents],
		open: [true,setOpen]
	};

    const {getByTestId} = render(<reactContext.Provider value={store}><EventPlaylistConfig tracks={ tracks } userId={ userId } authToken={ tokens } forceUpdate={ forceUpdate }/></reactContext.Provider>)
    expect(getByTestId('generate-bn').textContent).toBe('Generate');
});

test('interaction', () => {
	const setPlaylistTitle= jest.fn();
	const setPlaylistEvents= jest.fn();
	const setOpen= jest.fn(x=>!x);
	const store = {
		playlistTitle: ['untitled',setPlaylistTitle],
		playlistEvents: [['party'],setPlaylistEvents],
		open: [true,setOpen]
	}

    const {getByTestId} = render(<reactContext.Provider value={store}><EventPlaylistConfig/></reactContext.Provider>)

    fireEvent.click(getByTestId('generate-bn'));

    // When we click the generate button, we should expect a call to the `setOpen` function.
    // It should be called once
    expect(setOpen.mock.calls.length).toBe(1);
    // with an argument `false`.
    expect(setOpen.mock.calls[0][0]).toBe(false);
})