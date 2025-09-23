import { render, screen } from '@testing-library/react';
import App from './App';
import ThemeProvider from './components/providers/ThemeProvider';

test('renders metronome app', () => {
  render(
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
  
  // Check if the metronome controls are rendered
  const tempoElement = screen.getByText(/BPM/i);
  expect(tempoElement).toBeInTheDocument();
  
  // Check if search functionality is rendered
  const searchInput = screen.getByPlaceholderText(/search tracks/i);
  expect(searchInput).toBeInTheDocument();
});
