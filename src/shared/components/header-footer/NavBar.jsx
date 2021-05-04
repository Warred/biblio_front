import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'

export default class NavBar extends Component {

    render() {
        return (
            <header className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link className="navbar-brand font-weight-bold text-danger" to="/">Une Bibliotheque</Link>
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-toggle="collapse" 
                    data-target="#navbarSupportedContent" 
                    aria-controls="navbarSupportedContent" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto ">
                        <li className="nav-item">
                            <NavLink to='/login' className="nav-link" activeClassName="bg-success text-white">Se connecter</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/' className="nav-link" activeClassName="bg-success text-white">Accueil</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/inscription' className="nav-link" activeClassName="bg-success text-white">Inscription</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/ajoutEditeur' className="nav-link" activeClassName="bg-success text-white">Ajout editeur</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/ajoutDocument' className="nav-link" activeClassName="bg-success text-white">Ajout document</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/about' className="nav-link" activeClassName="bg-success text-white">A Propos</NavLink>
                        </li>
                    </ul>
                </div>
            </header>
        )
    }
}
