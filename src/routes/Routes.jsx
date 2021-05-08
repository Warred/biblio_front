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
import ListeDocuments from './../shared/components/ListeDocuments';


const customHistory = createBrowserHistory()

export default class Routes extends Component {
    render() {
        return (
            <Switch history={customHistory}>
                <Route exact path="/" component={HomeView}/>
                <Route path="/login" component={Connexion}/>
                <Route path="/inscription/Emprunteur" component={InscriptionEmprunteur}/>
                <Route path="/inscription/Bibliothecaire" component={InscriptionBibliothecaire}/>
                <Route path="/ajout/Editeur" component={AjoutEditeur}/>
                <Route path="/ajout/Auteur" component={AjoutAuteur}/>
                <Route path="/ajout/Document" component={AjoutDocument}/>
                <Route path="/listeDocuments" component={ListeDocuments}/>
                <Route component={ErrorView}/>
            </Switch>
        )
    }
}
