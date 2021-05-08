import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import HomeView from '../views/HomeView';
import ErrorView from '../views/ErrorView';
import Connexion from '../views/Connexion'
import { createBrowserHistory } from "history";
import AjoutEditeur from '../views/AjoutEditeur';
import InscriptionEmprunteur from './../views/InscriptionEmprunteur';
import InscriptionBibliothecaire from './../views/InscriptionBibliothecaire';
import AjoutAuteur from './../views/AjoutAuteur';
import AjoutDocument from './../views/AjoutDocument';
import apiBiblio from '../API/ApiBiblio';
import ListeDocumentsView from './../views/ListeDocumentsView';
import Deconnect from './../shared/components/Deconnect';


const customHistory = createBrowserHistory()

export default class Routes extends Component {

    state = { 
        user: { id: 0, username: 'Non ConnectÃ©(e)', nom: 'null', prenom: 'null', authorities: []},
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
                            user: resp.data,
                            isLoading: false
                        })
                    }              
                })
                .catch()
        } else this.setState({isLoading: false})
    }

    render() {
        const {user, isLoading} = this.state 
        if (isLoading) return <div>Loading...</div>
        if (user.authorities.includes("ROLE_BIBLIOTHECAIRE")) {
            console.log(user.authorities)
            return (
                <Switch history={customHistory}>
                    <Route path="/login" component={Connexion}/>
                    <Route exact path="/" component={HomeView}/>
                    <Route path="/inscription/Bibliothecaire" component={InscriptionBibliothecaire}/>
                    <Route path="/inscription/Emprunteur" component={InscriptionEmprunteur}/>
                    <Route path="/ajout/Editeur" component={AjoutEditeur}/>
                    <Route path="/ajout/Auteur" component={AjoutAuteur}/>
                    <Route path="/ajout/Document" component={AjoutDocument}/>
                    <Route path="/listeDocuments" component={ListeDocumentsView}/>
                    <Route path="/deco" component={Deconnect}/>
                    <Route component={ErrorView}/>
                </Switch>
                )
        }
        else if (user.authorities.includes("ROLE_EMPRUNTEUR")) {
            return (
                <Switch history={customHistory}>
                    <Route path="/login" component={Connexion}/>
                    <Route exact path="/" component={HomeView}/>
                    <Route path="/inscription/Emprunteur" component={InscriptionEmprunteur}/>
                    <Route path="/listeDocuments" component={ListeDocumentsView}/>
                    <Route path="/deco" component={Deconnect}/>
                    <Route component={ErrorView}/>
                </Switch>
            )
        } else {
            return (
                <Switch history={customHistory}>
                    <Route path="/login" component={Connexion}/>
                    <Route exact path="/" component={HomeView}/>
                    <Route path="/inscription/Emprunteur" component={InscriptionEmprunteur}/>
                    <Route path="/deco" component={Deconnect}/>
                    <Route component={ErrorView}/>
                </Switch>
            )
        }
        
         
    }
}
