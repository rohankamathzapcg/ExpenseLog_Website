import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const navLinks = [
    {
        name: "Dashboard",
        icon: "bi bi-grid",
        path: "/"
    },
    {
        name: "My Profile",
        icon: "bi bi-person-badge",
        path: "/profile"
    },
    {
        name: "Transactions",
        icon: "bi bi-bank",
        path: "/transactions"
    },
    {
        name: "My Accounts",
        icon: "bi bi-clock-history",
        path: "/acivity"
    },
    {
        name: "Analytics",
        icon: "bi bi-bar-chart",
        path: "/analytics"
    },
    {
        name: "Help Center",
        icon: "bi bi-bar-chart",
        path: "/analytics"
    },
    {
        name: "Signout",
        icon: "bi bi-box-arrow-left",
        path: "/analytics"
    }
]
const SideBar = () => {
    const [activeIndex, setActiveIndex] = useState();

    useEffect(() => {
        const storedActiveIndex = localStorage.getItem('activeIndex');
        if (storedActiveIndex !== null) {
            setActiveIndex(parseInt(storedActiveIndex, 10));
        } else {
            setActiveIndex(0);
        }
    }, []);

    const handleNavItemClick = (index) => {
        setActiveIndex(index);
        localStorage.setItem('activeIndex', index);
    };
    return (
        <>
            <aside id="sidebar" className='sidebar'>
                <ul className='sidebar-nav' id="sidbar-nav">
                    {
                        navLinks.map((items, index) =>
                            <li className='nav-item' key={index}>
                                <Link to={items.path} onClick={() => handleNavItemClick(index)} className={`nav-link ${activeIndex === index ? 'active' : ''}`} >
                                    <i className={items.icon}></i>
                                    <span>{items.name}</span>
                                </Link>
                            </li>
                        )
                    }
                </ul>
            </aside>
        </>
    );
}

export default SideBar;
