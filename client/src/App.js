import React from 'react';
import 'materialize-css';
import { BrowserRouter as Router } from 'react-router-dom';
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import { Navbar } from './components/Navbar';

function App() {
    const { login, logout } = useAuth();

    const userData = JSON.parse(localStorage.getItem('userData'));
    const isAuthenticated = !!userData?.token;
    const routes = useRoutes(isAuthenticated);
    return (
        <AuthContext.Provider value={{ token: userData?.token, login, logout, userId: userData?.id, isAuthenticated }}>
            <Router>
                {isAuthenticated && <Navbar/>}
                <div className="container">
                    {routes}
                </div>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
