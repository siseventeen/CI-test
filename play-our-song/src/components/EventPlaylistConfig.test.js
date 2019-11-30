import React, {useState, useEffect} from 'react';
import { render, fireEvent, findByRole, cleanup} from '@testing-library/react'
import ContextProvider from '../utils/store';
import '@testing-library/jest-dom/extend-expect';
import ReactDOM from 'react-dom';
import EventPlaylistConfig from './EventPlaylistConfig';
import Topbar from './Topbar';

test('component builds', () => {
	const handleGenerate = jest.fn()
    const {getByTestId} = render(<ContextProvider><EventPlaylistConfig handleGenerate={handleGenerate}/></ContextProvider>)
    
    expect(getByTestId('generate-bn').textContent).toBe('Generate')
    fireEvent.click(getByTestId('generate-bn'))

    

})
    
afterEach(cleanup)
test('interaction', () => {
	const setPlaylistTitle= jest.fn()
	const setPlaylistEvents= jest.fn()
	const setOpen= jest.fn()
	const store = {
		playlistTitle: ['untitled',setPlaylistTitle],
		playlistEvents: ['party',setPlaylistEvents],
		open: [true,setOpen]
	}

    const {containter,getByTestId} = render(<ContextProvider value={store}><EventPlaylistConfig/><Topbar/></ContextProvider>)
    const handleChange = () => event => {
    ctx.playlistTitle[1](event.target.value);
	};
    
    //fireEvent.change(getByTestId('input'), { target: { value: 'my playlist' } })

    //const dialog = getByTestId('dialog-container')
    
    //expect(dialog).toHaveAttribute('open',false)
    expect(getByTestId('title').textContent).toBe('Untitled Playlist')
    fireEvent.click(getByTestId('title'))
    fireEvent.click(getByTestId('generate-bn'))
    expect(getByTestId('generate-bn').textContent).toBe('Generate')
    expect(getByTestId('title').textContent).toBe('Untitled Playlist')
    
})
    