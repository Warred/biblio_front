import React, { Component } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as yup from 'yup'
import apiBiblio from '../../API/ApiBiblio';
import SelectEditeur from './SelectEditeur';

const initialValues = {
    bibliothecaire: '',
    listeAuteurs: '',
    lEditeur: '',
    nom: '',
    description: '',
    dateAjout: '',
    nombrePage: '',
    typeDePublication: '',
    dureeMinutes: '',
    typeDisque: ''
}

const validationSchema = yup.object().shape({
    nom: yup.string().required("champs requis"),
    description: yup.string().required("champs requis")
})


class FormulaireDocument extends Component {

    state = {
        isLoading: true,
        isLoadingUser: true,
        isPapier: false,
        isDisque: false,
        listeAuteurs: [],
        selectAuteurs: [],
        userTmp: null
    }

    afficheDiv = () => {
        var radio = document.formulaire.typeDoc.value
        if (radio === 'papier') {
            console.log('type de document = ' + radio);
            this.setState({
                isPapier: true,
                isDisque: false
            })
        } else if (radio === 'disque') {
            console.log('type de document = ' + radio);
            this.setState({
                isPapier: false,
                isDisque: true
            })
        }
    }

    componentDidMount() {
        apiBiblio.get('/listeAuteurs')
            .then( resp => {
                if (resp.status === 200)
                    this.setState({
                        selectAuteurs: resp.data,
                        isLoading: false
                    })
            })
            .catch( error => console.log(error) )

    }

    
    submit = (values, {resetForm}) => {
        
        values.lEditeur = JSON.parse(values.lEditeur)
        
        values.listeAuteurs = this.state.listeAuteurs
        values.bibliothecaire = JSON.parse(localStorage.getItem('user'))
        var typeDoc = values.typeDoc
        var typeDePublication = values.typeDePublication
        var nombrePage = values.nombrePage
        var typeDisque = values.typeDisque
        var dureeMinutes = values.dureeMinutes
        
        console.log(values);
        apiBiblio.post('/ajoutDocument', values,
                {params:{
                    typeDoc,
                    typeDePublication,
                    nombrePage,
                    typeDisque,
                    dureeMinutes
                }})
        .then(resp => {
            console.log(resp);
            if (resp.status === 200)  resetForm()
        })
    }

    ajouteAuteurs = () => {
        var auteur = JSON.parse(document.formulaire.auteur.value)
        var {listeAuteurs, selectAuteurs} = this.state
        listeAuteurs.push(auteur)
        console.log(listeAuteurs);
        var ind = selectAuteurs.findIndex(aut => aut.id === auteur.id)
        selectAuteurs.splice(ind, 1)
        this.setState({
            selectAuteurs: selectAuteurs,
            listeAuteurs: listeAuteurs
        })
    }

    render() {
        const {selectAuteurs, isLoading} = this.state
        return (
            <div className="container card shadow mt-3 p-3">
            <h3 className="text-center p-2">Ajouter un document(Bibliothecaire: - Date: )</h3>
            <Formik initialValues={initialValues} onSubmit={this.submit} validationSchema={validationSchema}>
                { ( ) => (
                    <Form name="formulaire">                        
                            <div className="row col-12">
                            <div className="col-lg-6 col-6 col-md-12 col-sm-12 col-xs-12"> 
                                <span className="p-4">Editeur :</span>
                                <Field as="select" name="lEditeur">  
                                    <option value ="">---choisir un editeur</option>                              
                                    <SelectEditeur/>
                                </Field>
                            </div>
                            <div className="col-lg-6 col-6 col-md-12 col-sm-12 col-xs-12"> 
                                <span className="p-4">Auteur :</span>
                               <Field as="select" name="auteur">
                                    <option>---choisir un auteur</option> 

                                    {isLoading ? (
                                         <option>Loading...</option>
                                    ) : ( selectAuteurs.map( (auteur, index) => {
                                            let JsonAuteur = JSON.stringify(auteur)
                                            return <option key={index} value={JsonAuteur}>{auteur.nom}</option>
                                        })
                                    )}
                                </Field>
                                <button className="btn btn-info" type="button" onClick={this.ajouteAuteurs}>Ajouter aux auteurs</button>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-lg-12 col-12 col-md-12 col-sm-12 col-xs-12">
                                <span className="p-4">Choisir le type de document :</span>
                                <div className="form-check form-check-inline">
                                    <Field type="radio" onClick={this.afficheDiv} name="typeDoc" value="papier" className="form-check-input"/>
                                    <label className="form-check-label">Format papier</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <Field type="radio" onClick={this.afficheDiv} name="typeDoc" value="disque" className="form-check-input"/>
                                    <label className="form-check-label">Disque</label>
                                </div>
                            </div>
                            <div className="col-lg-6 col-6 col-md-12 col-sm-12 col-xs-12">
                                <Field type="text" name="nom" placeholder="Titre" className="form-control mt-3"/>
                                <ErrorMessage name="nom" component="small" className="text-danger float-end"/>
                            </div>
                            <div className="col-lg-6 col-6 col-md-12 col-sm-12 col-xs-12">
                                <Field type="date" name="dateAjout" className="form-control mt-3"/>
                            </div> 
                            <div className="col-lg-12 col-12 col-md-12 col-sm-12 col-xs-12">
                            <Field type="text" as="textarea"  name="description" placeholder="Description" className="form-control mt-3"/>
                                <ErrorMessage name="description" component="small" className="text-danger float-end"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6 col-6 col-md-12 col-sm-12 col-xs-12" style={{display: this.state.isPapier ? 'block' : 'none' }}>
                                <Field type="text" name="typeDePublication" placeholder="Type De Publication" className="form-control mt-3"/>
                            </div>
                            <div className="col-lg-6 col-6 col-md-12 col-sm-12 col-xs-12" style={{display: this.state.isPapier ? 'block' : 'none' }}>
                                <Field type="number" name="nombrePage" placeholder="Nombre de Page" className="form-control mt-3"/>
                            </div>
                            <div className="col-lg-6 col-6 col-md-12 col-sm-12 col-xs-12" style={{display: this.state.isDisque ? 'block' : 'none' }}>
                                <Field type="text" name="typeDisque" placeholder="Type de Disque" className="form-control mt-3"/>
                            </div>
                            <div className="col-lg-6 col-6 col-md-12 col-sm-12 col-xs-12" style={{display: this.state.isDisque ? 'block' : 'none' }}>
                                <Field type="number" name="dureeMinutes" placeholder="DurÃ©e en minutes" className="form-control mt-3"/>
                            </div>
                        </div>
                        <div className="row m-0 mt-4">
                            <button type="submit" className="btn btn-success btn-block">Ajouter le document</button>
                        </div>
                    </Form>
                ) }                    
            </Formik>
        </div>
        );
    }
}

export default FormulaireDocument;