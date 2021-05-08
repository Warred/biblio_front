import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default class NavBar extends Component {

    render() {
        return (
            <header>
            <Navbar  bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="/">Une Bibliotheque</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href='/'>Accueil</Nav.Link>
                        <Nav.Link href='/login'>Se connecter</Nav.Link>
                        <NavDropdown title="Ajout" id="basic-nav-dropdown">
                            <NavDropdown.Item href='/ajout/Editeur'>Ajout Editeur</NavDropdown.Item>
                            <NavDropdown.Item href='/ajout/Auteur'>Ajout Auteur</NavDropdown.Item>
                            <NavDropdown.Item href='/ajout/Document'>Ajout Document</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Inscription" id="basic-nav-dropdown">
                            <NavDropdown.Item href='/inscription/Emprunteur'>Inscription Emprunteur</NavDropdown.Item>
                            <NavDropdown.Item href='/inscription/Bibliothecaire'>Inscription Bibliothecaire</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Liste" id="basic-nav-dropdown">
                            <NavDropdown.Item href='/listeDocuments'>Liste Documents</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header>
        )
    }
}