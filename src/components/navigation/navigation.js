// imports
import React from "react";

const state = {
    cacat: ''
}
// nav component
const Nav = (props) => {
    return  (
        <nav className="navigation flex-2 text-right">
            <ul className="inline-list">
                <li>
                    <a href="">Log in</a>
                </li>
                <li>
                    <a onClick={props.register}>Register</a>
                </li>
            </ul>
        </nav>
    )
};
// export navigation
export default Nav;