import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
    return (
        <div>
            <header className="Header">
                <h1>Look STL</h1>
                <nav>
                    <Link className='header-link' to='/'>Viewer</Link>
                    <Link className='header-link' to='/Search'>Find a Model</Link>
                </nav>
            </header>
        </div>
    )
}