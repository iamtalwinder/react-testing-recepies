import { render, fireEvent, screen } from '@testing-library/react';
import { TodoProvider } from '../TodoContext';
import TodoList from '../TodoList';

describe('[Testing context API] TodoList', () => {
  it('adds and removes a todo item', () => {
    render(
      <TodoProvider>
        <TodoList />
      </TodoProvider>
    );

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'New Todo' } });
    fireEvent.click(screen.getByText('Add Todo'));
    expect(screen.getByText('New Todo')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Delete'));
    expect(screen.queryByText('New Todo')).not.toBeInTheDocument();
  });
});
