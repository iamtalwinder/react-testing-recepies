// App.tsx
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import ThemeSwitcher from './features/theme/ThemeSwitcher';
import TodoList from './features/todo/TodoList';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div>
        <h1>Todo App with Theme Switcher</h1>
        <ThemeSwitcher />
        <TodoList />
      </div>
    </Provider>
  );
};

export default App;
