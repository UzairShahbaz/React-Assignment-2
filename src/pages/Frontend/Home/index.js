import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [todosCount, setTodosCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodosCount(todos.length);

    const users = JSON.parse(localStorage.getItem('users')) || [];
    setUsersCount(users.length);
  }, []);

  return (
    <main className="container py-5">
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card text-center p-4">
            <h2 className="card-title">Todos</h2>
            <p className="card-text">You have {todosCount} todos.</p>
            <Link to="/todos" className="btn btn-primary">Go to Todos</Link>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card text-center p-4">
            <h2 className="card-title">Users</h2>
            <p className="card-text">You have {usersCount} registered users.</p>
            <Link to="/users" className="btn btn-primary">Go to Users</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
