import React, { Component } from 'react'
import { Formik, Field, Form } from 'formik';
import apiBiblio from '../API/ApiBiblio';
import * as yup from 'yup'

const validationSchema = yup.object().shape({
    nom: yup.string().required("champs requis"),
    prenom: yup.string().required("champs requis")
})

export default class HomeView extends Component {

    state = {
        initalValues: null,
        user: JSON.parse(localStorage.getItem('user')),
        editing: false,
    }

    modifier = () => {
        const user = JSON.parse(localStorage.getItem('user'))
        this.setState({
            initialValues: {
                nom: user.nom,
                prenom: user.prenom
            },
            editing: true
        })    
    }

    submit = (values, {resetForm}) => {
        console.log(values);
        apiBiblio.put('/modifierUtilisateur', values)
        .then(resp => {
            console.log(resp);
            apiBiblio.get('/account').then(resp => {
                if(resp.status === 200) {
                    localStorage.setItem('user', JSON.stringify(resp.data))
                    this.setState({
                        user: JSON.parse(localStorage.getItem('user')),
                        editing: false})
                    
                    console.log('user: ' + resp.data.username + ' edited in localStorage');
                }
            }) 
        })        
        resetForm()
    }

    render() {
        const token = localStorage.getItem('token')
        console.log('HomeView.jsx load token : ' + token);
        const {user, editing, initialValues} = this.state
        if (user) {
            if (!editing) { return (
            <div className="container card shadow mt-3 p-3">
                <h3 className="text-center p-2">Mes informations</h3>
                <p><b>Pseudonyme :</b> {user.username}</p>
                <p><b>Rôle :</b> {user.authorities}</p>
                <p><b>Nom :</b> {user.nom}</p>
                <p><b>Prénom :</b> {user.prenom}</p>
                <p><button
                    className="btn btn-warning p-0 m-0"
                    type="button" onClick={() => this.modifier()}>
                        Modifier
                </button></p>
            </div>
            )} else {
                return (
                    <div className="container card shadow mt-3 p-3">
                        <h3 className="text-center p-2">Modifier mes informations</h3>
                        <p><b>Pseudonyme :</b> {user.username}</p>
                        <p><b>Rôle :</b> {user.authorities}</p>
                        <Formik initialValues={initialValues} onSubmit={this.submit} validationSchema={validationSchema}>
                            { ( ) => (
                                <Form>
                                    <div className="row"> 
                                        <div className="col-6">
                                            <Field type="text" name="nom" placeholder="nom" className="form-control mt-3"/>
                                            <Field type="text" name="prenom" placeholder="prenom" className="form-control mt-4"/>
                                        </div> 
                                    </div>
                                    <div className="row m-0 mt-4">
                                        <div className="col-6">
                                            <button type="submit" className="btn btn-success btn-block">Envoyer</button>
                                        </div>
                                    </div>        
                                </Form>
                            ) }                    
                        </Formik>
                    </div>
                )
            }
        }
        else return (
            <div>
                <h1 className="text-center">Veuillez vous connecter</h1>
            </div>
        )        
    }
}