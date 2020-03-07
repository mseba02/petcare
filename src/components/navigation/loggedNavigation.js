// import react
import React from 'react';
import {Link} from "react-router-dom";

// logged navigation
const LoggedNavigation = (props) => {
    return (
        <ul className="mainNavigation d-flex">
            <li>
                <Link to="/dashboard">Dashboard</Link>
            </li>
            <li className="position-relative">
                <a href="# ">My Profil</a>
                <ul className="mainNavigation__level2 ">
                    <li>
                        <a href="!#">My ads</a>
                    </li>
                    <li>
                        <a href="!#">My pets</a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="# ">Favorites</a>
            </li>
            <li>
                <a href="# ">Create Posting</a>
            </li>
            <li>
                <a href="# " onClick={() => props.logout()}>Log out</a>
            </li>
        </ul>
    )
};

// export app
export default LoggedNavigation;