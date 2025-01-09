import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('App Component', () => {
  test('renders Cyber Agent Hub', () => {
    render(<App />);
    const titleElement = screen.getByText(/CYBER AGENT HUB/i);
    expect(titleElement).toBeInTheDocument();
  });
});
