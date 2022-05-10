import React from 'react';

const Footer = () => {
    return (
        <footer className="w-100 mt-auto p-4 footer">
            <div className="container">
                &copy;{new Date().getFullYear()} {` `}by kalecodes
            </div>
        </footer>
    );
};

export default Footer;