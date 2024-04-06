import React from 'react';
import BookList from './components/BookList';
import SignUpForm from "./components/SignUpForm";
import SignInForm from "./components/SignInForm";
import AuthenticationControl from './components/AuthenticationControl';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from "./components/Static/Logo";

function App() {
    return (
        <div className="App">
            <AuthenticationControl />
        </div>
    );
}

export default App;
