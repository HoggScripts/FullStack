import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux'; // Import Provider
import HomePage from './pages/HomePage/HomePage';
import AboutUs from './pages/AboutUs/AboutUs';
import Locations from './pages/Locations/Locations';
import SignUpForm from './components/HomeHeader/SignUpForm';
import 'bootstrap/dist/css/bootstrap.min.css';

// index.js or App.js
import 'tailwindcss/tailwind.css';
import getStore from './components/store'; // Import your Redux store

const { store } = getStore(); // Call the function to get the store

function App() {
    return (
        <Provider store={store}> {/* Wrap your application with Provider */}
            <Router>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/aboutus" element={<AboutUs />} />
                        <Route path="/locations" element={<Locations />} />
                        <Route path="/signup" element={<SignUpForm />} />
                    </Routes>
                </div>
            </Router>
        </Provider>
    );
}

export default App;
