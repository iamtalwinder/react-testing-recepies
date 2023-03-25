// ThemeSwitcher.test.js
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { ThemeProvider } from '../ThemeContext';
import ThemeSwitcher from '../ThemeSwitcher';

describe('[Testing context API] ThemeSwitcher', () => {
  it('toggles the theme', () => {
    render(
      <ThemeProvider>
        <ThemeSwitcher />
      </ThemeProvider>
    );

    const button = screen.getByText(/Switch to Dark Theme/);
    fireEvent.click(button);
    expect(button.textContent).toBe('Switch to Light Theme');
  });
});
