// import react
import React from 'react';

// logged navigation
const LoggedNavigation = (props) => {
    return (
        <ul className="mainNavigation d-flex">
            <li className="position-relative">
                <a>My Profil</a>
                <ul className="mainNavigation__level2 ">
                    <li>
                        <a>My ads</a>
                    </li>
                    <li>
                        <a>My pets</a>
                    </li>
                </ul>
            </li>
            <li>
                <a>Favorites</a>
            </li>
            <li>
                <a>Create Posting</a>
            </li>
            <li>
                <a onClick={props.logout}>Log out</a>
            </li>
        </ul>
    )
};

// export app
export default LoggedNavigation;