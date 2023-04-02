import { ReactElement } from 'react';
import { render as rtlRender, RenderOptions } from '@testing-library/react';
import { configureStore, PreloadedState, EnhancedStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import themeReducer from '../features/theme/themeSlice';
import todoReducer from '../features/todo/todoSlice';
import { RootState } from '../store';
interface ExtendedRenderOptions extends RenderOptions {
  preloadedState?: PreloadedState<RootState>;
  store?: EnhancedStore;
}

interface WrapperProps {
  children?: React.ReactNode;
}

function render(
  ui: ReactElement,
  {
    preloadedState,
    store = configureStore({ reducer: { theme: themeReducer, todos: todoReducer }, preloadedState }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: WrapperProps) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export default render;
