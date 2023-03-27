import { ChangeEvent, useState } from 'react';
import { useTodos } from './TodoContext';

const TodoList = () => {
  const [newTodo, setNewTodo] = useState('');
  const { todos, addTodo, removeTodo } = useTodos();

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo({ id: Date.now(), text: newTodo });
    setNewTodo('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.text} <button onClick={() => removeTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
