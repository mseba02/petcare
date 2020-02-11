// imports
import React from "react";

// nav component
const Nav = (props) => {
    return  (
        <nav className="navigation flex-2 text-right">
            <ul className="inline-list">
                <li>
                    <a onClick={() => props.openPopUp('loginPopUp')}>Log in</a>
                </li>
                <li>
                    <a onClick={() => props.openPopUp('registerPopUp')}>Register</a>
                </li>
            </ul>
        </nav>
    )
};
// export navigation
export default Nav;