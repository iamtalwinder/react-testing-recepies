// ThemeSwitcher.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { toggleTheme } from './themeSlice';

const ThemeSwitcher: React.FC = () => {
  const theme = useSelector((state: RootState) => state.theme);
  const dispatch: AppDispatch = useDispatch();

  return (
    <button onClick={() => dispatch(toggleTheme())}>
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
    </button>
  );
};

export default ThemeSwitcher;
