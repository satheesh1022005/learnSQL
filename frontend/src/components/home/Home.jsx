import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState();
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            setUser(user);
        }
        console.log(user.role)
    }, [])
    return (
        <div>
            {/* Header */}
            <header className="bg-primary text-white text-center py-3">
                <h1>Welcome to My Website</h1>
                <p>Your one-stop solution for awesome content</p>
            </header>

            {/* Hero Section */}
            <section className="container my-5 text-center">
                <div className="p-5 bg-light shadow rounded">
                    <h2>Discover Amazing Features</h2>
                    <p className="lead">Explore our services and find the right solution for you.</p>
                    <button
                        className="btn btn-primary mt-3 px-4 py-2"
                        onClick={() => navigate("/createTask")}
                    >
                        Add Task
                    </button>
                    {
                        user && (
                            <>
                                {user.role === 'college' && (
                                    <button
                                        className="btn btn-primary mt-3 px-4 py-2"
                                        onClick={() => navigate("/createFaculty")}
                                    >
                                        Add Faculty
                                    </button>
                                )}
                                {user.role === 'faculty' && (
                                    <section>
                                        <button
                                            className="btn btn-primary mt-3 px-4 py-2"
                                            onClick={() => navigate("/createStudent")}
                                        >
                                            Add Student
                                        </button>
                                        <button
                                            className="btn btn-primary mt-3 px-4 py-2"
                                            onClick={() => navigate("/task")}
                                        >
                                            Assign Task
                                        </button>
                                        <button
                                            className="btn btn-primary mt-3 px-4 py-2"
                                            onClick={() => navigate("/contest")}
                                        >
                                            Create Contest
                                        </button>
                                    </section>
                                )}
                                {user.role === 'student' && (
                                    <section>
                                        <button
                                        className="btn btn-primary mt-3 px-4 py-2"
                                        onClick={() => navigate("/view")}
                                    >
                                        ViewTask
                                    </button>
                                    <button
                                        className="btn btn-primary mt-3 px-4 py-2"
                                        onClick={() => navigate("/test")}
                                    >
                                        ViewContest
                                    </button>
                                    <button
                                        className="btn btn-primary mt-3 px-4 py-2"
                                        onClick={() => navigate("/sheet")}
                                    >
                                        Interview Sheet
                                    </button>
                                    </section>

                                )}
                            </>
                        )
                    }

                </div>
            </section>

            {/* Footer */}
            <footer className="bg-dark text-white text-center py-3 mt-5">
                <p>© 2024 My Website. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;
