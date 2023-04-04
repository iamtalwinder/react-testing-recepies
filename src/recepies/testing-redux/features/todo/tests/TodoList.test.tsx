import { fireEvent, screen } from '@testing-library/react';
import TodoList from '../TodoList';
import render from '../../../utils/render';

describe('[Testing redux] TodoList', () => {
  it('adds and removes a todo item', () => {
    render(<TodoList />);

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'New Todo' } });
    fireEvent.click(screen.getByText('Add Todo'));
    expect(screen.getByText('New Todo')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Delete'));
    expect(screen.queryByText('New Todo')).not.toBeInTheDocument();
  });
});
