import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import HomePage from './pages/HomePage/HomePage';
import AboutUs from './pages/AboutUs/AboutUs';
import Locations from './pages/Locations/Locations';
import SearchResults from './pages/SearchResults/SearchResults';
import DetailedBookItem from "./pages/BookDetails/DetailedBookItem";
import getStore from './context/store';
import SignUpForm from "./components/Header/SignUpForm";
import { ShoppingCartProvider, useShoppingCart } from './context/ShoppingCartContext';
import Cart from './components/ShoppingCart/Cart';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'tailwindcss/tailwind.css';
import HomeHeader from "./components/Header/HomeHeader";
import SubHeader from "./components/SubHeader/SubHeader";

const { store } = getStore();

function App() {
    return (
        <Provider store={store}>
            <ShoppingCartProvider>
                <Router>
                    <div className="App">
                        <div className="position-fixed z-3 w-full mb-4">
                            <HomeHeader/>
                            <SubHeader/>
                        </div>
                        <Routes>
                            <Route path="" element={<HomePage/>}/>
                            <Route path="/aboutus" element={<AboutUs/>}/>
                            <Route path="/locations" element={<Locations/>}/>
                            <Route path="/signup" element={<SignUpForm/>}/>
                            <Route path="/search/*" element={<SearchResults/>}/>
                            <Route path="/book/:bookId" element={<DetailedBookItem/>}/>
                        </Routes>
                        <Cart/>
                    </div>
                </Router>
            </ShoppingCartProvider>
        </Provider>
    );
}

export default App;

