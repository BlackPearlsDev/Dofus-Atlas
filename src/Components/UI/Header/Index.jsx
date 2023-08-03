import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header>
            <Link to={"/"}><h1>Dofus Atlas</h1></Link>

            <nav>
                <Link to={"equipements"}>Equipements</Link>
                <Link to={"montures"}>Montures</Link>
                <Link to={"almanax"}>Almanax</Link>
                <Link to={"news"}>News</Link>
            </nav>
        </header>
    )
}

export default Header;