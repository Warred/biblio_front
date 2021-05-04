import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import HomeView from '../views/HomeView';
import AboutView from '../views/AboutView';
import DashBoardView from '../views/DashBoardView';
import ErrorView from '../views/ErrorView';
import Connexion from '../views/Connexion'
import { createBrowserHistory } from "history";
import InscriptionUtilisateur from '../views/InscriptionUtilisateur';
import AjoutEditeur from '../views/AjoutEditeur';
import TestAddDocument from './../Test/TestAddDocument';

const customHistory = createBrowserHistory()

export default class Routes extends Component {
    render() {
        return (
            <Switch history={customHistory}>
                <Route exact path="/" component={HomeView}/>
                <Route path="/login" component={Connexion}/>
                <Route path="/about" component={AboutView}/>
                <Route path="/dashboard" component={DashBoardView}/>
                <Route path="/inscription" component={InscriptionUtilisateur}/>
                <Route path="/ajoutEditeur" component={AjoutEditeur}/>
                <Route path="/ajoutDocument" component={TestAddDocument}/>
                <Route component={ErrorView}/>
            </Switch>
        )
    }
}
