import React, { useState } from 'react';
import profile from '../Assets/PP.jpg';
import Login from './Login';

const Header = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleToggleSideBar = () => {
        document.body.classList.toggle('toggle-sidebar');
    };

    return (
        <>
            <header id="header" className='header fixed-top d-flex align-items-center'>
                {/* Logo Section */}
                <div className='d-flex align-items-center justify-content-between'>
                    <i className='bi bi-list toggle-sidebar-btn pe-5' onClick={handleToggleSideBar}></i>
                    <a href='/' className='logo d-flex align-items-center'>
                        <span className='d-none d-lg-block'>ExpenseLog</span>
                    </a>
                </div>

                {/* Search Bar Section */}
                <div className='search-bar'>
                    <form className='search-form d-flex align-items-center'>
                        <input type="text" name="query" placeholder='Enter search keyword ...' />
                        <button type="submit"><i className='bi bi-search'></i></button>
                    </form>
                </div>

                {/* Navigation Section */}
                <nav className='header-nav ms-auto'>
                    <ul className='d-flex align-items-center'>
                        {
                            isLoggedIn === false ? (
                                <li className="nav-item dropdown pe-3">
                                    <button style={{backgroundColor: '#012970', color: 'white', fontFamily: '"Merriweather", sans-serif'}} type="button" className="btn" data-bs-toggle="modal" data-bs-target="#loginSignupModal">
                                        Login/SignUp
                                    </button>
                                </li>
                            ) : (
                                <li className="nav-item dropdown pe-3">
                                    <a className='nav-link nav-profile d-flex align-items-center pe-0' href="/" data-bs-toggle="dropdown">
                                        <img src={profile} alt="Profile" className='rounded-circle' />
                                        <span className="d-none d-md-block dropdown-toggle ps-2">Rohan Kamath</span>
                                    </a>

                                    <ul className='dropdown-menu dropdown-menu-end dropdown-menu-arrow profile'>
                                        <li className='dropdown-header'>
                                            <h6>Rohan Kamath</h6>
                                            <span>Web Developer</span>
                                        </li>
                                        {/* Add other dropdown items here if necessary */}
                                    </ul>
                                </li>
                            )
                        }

                    </ul>
                </nav>
            </header>
        </>
    );
};

export default Header;
