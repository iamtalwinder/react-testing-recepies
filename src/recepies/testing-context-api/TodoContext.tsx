import React, { createContext, useState, useContext, ReactNode } from 'react';

type Todo = {
  id: number;
  text: string;
};

type TodoContextType = {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  removeTodo: (todoId: number) => void;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const useTodos = (): TodoContextType => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodos must be used within a TodoProvider');
  }
  return context;
};

export const TodoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (todo: Todo) => setTodos([...todos, todo]);
  const removeTodo = (todoId: number) => setTodos(todos.filter(todo => todo.id !== todoId));

  return (
    <TodoContext.Provider value={{ todos, addTodo, removeTodo }}>
      {children}
    </TodoContext.Provider>
  );
};
