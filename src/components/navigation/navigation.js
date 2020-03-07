// imports
import React from "react";

// nav component
const Nav = (props) => {
    return  (
       <ul className="mainNavigation d-flex text-right">
            <li>
                <a href="# " onClick={() => props.openPopUp('loginPopUp')}>Log in</a>
            </li>
            <li>
                <a href="# " onClick={() => props.openPopUp('registerPopUp')}>Register</a>
            </li>
        </ul>
    )
};
// export navigation
export default Nav;