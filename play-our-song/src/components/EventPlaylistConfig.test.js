import React from 'react';
import { render, fireEvent, findByRole } from '@testing-library/react'
import ContextProvider from '../utils/store';
import EventPlaylistConfig from './EventPlaylistConfig';

test('component builds', () => {
    const {getByTestId} = render(<ContextProvider><EventPlaylistConfig/></ContextProvider>)

    expect(getByTestId('generate-bn').textContent).toBe('Generate')
    fireEvent.click(getByTestId('generate-bn'))
}) 