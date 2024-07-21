import React, { useState, useEffect } from 'react';

const initialState = { title: "", description: "" };
const getRandomId = () => Math.random().toString(36).slice(2);

export default function Todos() {
    const [state, setState] = useState(initialState);
    const [todos, setTodos] = useState([]);
    const [editTodo, setEditTodo] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteTodoId, setDeleteTodoId] = useState(null);

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
        setTodos(storedTodos);
    }, []);

    const handleChange = (e) => setState((s) => ({ ...s, [e.target.name]: e.target.value }));

    const handleSubmit = () => {
        let { title, description } = state;

        const todo = {
            title,
            description,
            id: getRandomId(),
            status: "incompleted",
            user_id: ""
        };

        const updatedTodos = [...todos, todo];
        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
    };

    const handleEditChange = (e) => setEditTodo({
        ...editTodo,
        [e.target.name]: e.target.value
    });

    const handleEditSubmit = () => {
        const updatedTodos = todos.map(todo =>
            todo.id === editTodo.id ? editTodo : todo
        );
        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
        setShowEditModal(false);
    };

    const handleDeleteSubmit = () => {
        const updatedTodos = todos.filter(todo => todo.id !== deleteTodoId);
        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
        setShowDeleteModal(false);
    };

    return (
        <div id='todos' className='py-5'>
            <div className="container">
                <div className="card p-3 p-md-4 mx-auto border-0 add-todo-card" style={{ maxWidth: 500 }}>
                    <h1 className='text-center mb-4'>Add Todo</h1>

                    <div className="row">
                        <div className="col-12 mb-3">
                            <input
                                type="text"
                                className='form-control'
                                placeholder='Enter title'
                                name='title'
                                onChange={handleChange}
                                value={state.title}
                            />
                        </div>
                        <div className="col-12 mb-3">
                            <textarea
                                className='form-control'
                                placeholder='Enter description'
                                name='description'
                                onChange={handleChange}
                                value={state.description}
                            />
                        </div>
                        <div className="col-12 col-md-6 offset-md-3">
                            <button className='btn btn-primary w-100' onClick={handleSubmit}>Add Todo</button>
                        </div>
                    </div>
                </div>

                <div className="card p-3 p-md-4 border-0 mt-3">
                    <h1 className='text-center mb-4'>Todos</h1>

                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Id</th>
                                <th scope="col">Title</th>
                                <th scope="col">Description</th>
                                <th scope="col">Status</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {todos.map((todo, i) => {
                                const { id, title, description, status } = todo;
                                return (
                                    <tr key={i}>
                                        <th scope="row">{i + 1}</th>
                                        <td>{id}</td>
                                        <td>{title}</td>
                                        <td>{description}</td>
                                        <td className='text-capitalize'>{status}</td>
                                        <td>
                                            <button className='btn btn-sm btn-info me-1' onClick={() => {
                                                setEditTodo(todo);
                                                setShowEditModal(true);
                                            }}>Edit</button>
                                            <button className='btn btn-sm btn-danger' onClick={() => {
                                                setDeleteTodoId(todo.id);
                                                setShowDeleteModal(true);
                                            }}>Delete</button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {showEditModal && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Todo</h5>
                                <button type="button" className="close" onClick={() => setShowEditModal(false)}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <input
                                    type="text"
                                    className='form-control mb-2'
                                    placeholder='Enter title'
                                    name='title'
                                    onChange={handleEditChange}
                                    value={editTodo.title}
                                />
                                <textarea
                                    className='form-control'
                                    placeholder='Enter description'
                                    name='description'
                                    onChange={handleEditChange}
                                    value={editTodo.description}
                                />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Cancel</button>
                                <button type="button" className="btn btn-primary" onClick={handleEditSubmit}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showDeleteModal && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Delete Todo</h5>
                                <button type="button" className="close" onClick={() => setShowDeleteModal(false)}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete this todo?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                                <button type="button" className="btn btn-danger" onClick={handleDeleteSubmit}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
