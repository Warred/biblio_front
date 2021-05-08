import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import apiBiblio from '../../../API/ApiBiblio';
import Loader from './../loader';

export default class NavBar extends Component {

    state = { 
        user: { id: 0, username: 'Non Connecté(e)', nom: 'null', prenom: 'null', authorities: []},
        isLoading: true
     }

    componentDidMount() {
        const token = localStorage.getItem('token')
        if (token) {
            apiBiblio.get('/account')
                .then(resp => {
                    console.log(resp);
                    if (resp.status === 200) {
                        this.setState({
                            user: resp.data
                        })
                    } 
                    this.setState({isLoading: false})              
                })
                .catch()
        } else this.setState({isLoading: false})
    }

    render() {
        const {user, isLoading} = this.state
        if (isLoading) return <Loader/>
        return (
            <header>
            <Navbar  bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="/">Une Bibliotheque</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href='/'>Accueil</Nav.Link>
                        <Nav.Link href='/login'>Se connecter</Nav.Link>
                        <NavDropdown title="Ajout" id="basic-nav-dropdown" style={{display:  ((user.authorities.includes('ROLE_BIBLIOTHECAIRE')))? 'block' : 'none' }}>
                            <NavDropdown.Item href='/ajout/Editeur'>Ajout Editeur</NavDropdown.Item>
                            <NavDropdown.Item href='/ajout/Auteur'>Ajout Auteur</NavDropdown.Item>
                            <NavDropdown.Item href='/ajout/Document'>Ajout Document</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Inscription" id="basic-nav-dropdown">
                            <NavDropdown.Item href='/inscription/Emprunteur'>Inscription Emprunteur</NavDropdown.Item>
                            <NavDropdown.Item href='/inscription/Bibliothecaire' style={{display: (user.authorities.includes('ROLE_BIBLIOTHECAIRE')) ? 'block' : 'none' }}>Inscription Bibliothecaire</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Liste" id="basic-nav-dropdown" style={{display:  ((user.authorities.includes('ROLE_BIBLIOTHECAIRE')) || user.authorities.includes('ROLE_EMPRUNTEUR')) ? 'block' : 'none' }}>
                            <NavDropdown.Item href='/listeDocuments'>Liste Documents</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Text style={{display: !(user.id === 0) ? 'block' : 'none' }}>
                    Connecté(e) en tant que: <a href="/Profile">{user.username}</a>
                </Navbar.Text>
                <Navbar.Text style={{display: (user.id === 0) ? 'block' : 'none' }}>
                </Navbar.Text>
                <Nav.Link href='/login' className="me-2" style={{display: (user.id === 0) ? 'block' : 'none' }}>Se connecter<i className="fas fa-sign-in-alt ms-1"></i></Nav.Link>
                <Nav.Link href='/deco' className="me-2" style={{display: (user.id !== 0) ? 'block' : 'none' }}><i className="fas fa-sign-out-alt"></i></Nav.Link>
            </Navbar>
        </header>
        )
    }
}