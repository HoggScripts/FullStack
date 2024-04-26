import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import HomePage from "./pages/HomePage/HomePage";
import AboutUs from "./pages/AboutUs/AboutUs";
import SearchResults from "./pages/SearchResults/SearchResults";
import DetailedBookItem from "./pages/BookDetails/DetailedBookItem";
import getStore from "./store/store";
import SignUpForm from "./components/Common/Header/SignUpForm";
import { ShoppingCartProvider } from "./context/cart/ShoppingCartContext";
import Cart from './components/ShoppingCart/Cart';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'tailwindcss/tailwind.css';
import OtakuBooksMap from "./pages/Locations/OtakuBooksMap";
import HomeHeader from "./components/Common/Header/HomeHeader";
import SubHeader from "./components/Common/SubHeader/SubHeader";
import UserProfile from "./pages/UserProfile/UserProfile";

const { store } = getStore();

function App() {
    return (
        <Provider store={store}>
            <ShoppingCartProvider>
                <Router>
                    <div className="">
                        <div className="header">
                            <HomeHeader/>
                            <SubHeader/>
                        </div>
                        <Routes>
                            <Route path="" element={<div className="content"><HomePage/></div>}/>
                            <Route path="/aboutus" element={<div className="content"><AboutUs/></div>}/>
                            <Route path="/locations" element={<div className="content"><OtakuBooksMap/></div>}/>
                            <Route path="/signup" element={<div className="content"><SignUpForm/></div>}/>
                            <Route path="/search/*" element={<div className="content"><SearchResults/></div>}/>
                            <Route path="/book/:bookId" element={<div className="content"><DetailedBookItem/></div>}/>
                            <Route path="/profile" element={<UserProfile/>}/>
                        </Routes>
                        <Cart/>
                    </div>
                </Router>
            </ShoppingCartProvider>
        </Provider>
    );
}

export default App;
