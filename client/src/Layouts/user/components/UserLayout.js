import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './Navbar';
import Footer from './Footer';

function UserLayout() {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Navbar at the top */}
            <NavBar />

            {/* Main content container */}
            <div className="">
                <Outlet />
                <Footer/>
            </div>
        </div>
    );
}

export default UserLayout;