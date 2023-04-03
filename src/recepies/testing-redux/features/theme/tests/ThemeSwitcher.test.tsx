import { fireEvent, screen} from '@testing-library/react';

import ThemeSwitcher from '../ThemeSwitcher';
import render from '../../../utils/render';

describe('[Testing redux] ThemeSwitcher', () => {
  it('toggles the theme', () => {
    render(<ThemeSwitcher />);

    const button = screen.getByText(/Switch to Dark Theme/);
    fireEvent.click(button);
    expect(button.textContent).toBe('Switch to Light Theme');
  });
});
