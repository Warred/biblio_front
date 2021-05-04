import React, { Component } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as yup from 'yup'
import apiBiblio from './../API/ApiBiblio';
import SelectEditeur from './SelectEditeur';
import SelectBibliothecaire from './SelectBibliothecaire';


const initialValues = {
    nom: '',
    description: '',
    dateAjout: '',
    lEditeur: '',
    bibliothecaire: ''
}

const validationSchema = yup.object().shape({
    nom: yup.string().required("champs requis"),
    description: yup.string().required("champs requis")
})

class TestAddDocument extends Component {

    state = {
        isPapier: false,
        isDisque: false,
        nombrePage: '',
        typeDePublication: '',
        dureeMinutes: '',
        typeDisque: ''
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

    submit = (values, {resetForm}) => {
        console.log(values);
        const tmpEdit = JSON.parse(values.lEditeur)
        values.lEditeur = tmpEdit
        const tmpBibli = JSON.parse(values.bibliothecaire)
        values.bibliothecaire = tmpBibli
        const {isPapier, isDisque} = this.state
        var typeDoc = null
        if (isPapier) { typeDoc = 'papier'}
        else if (isDisque) { typeDoc = 'disque'}
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
        })
        
        resetForm()      
    }

    render() {
        return (
            <div className="container card shadow mt-3 p-3">
                <h3 className="text-center p-2">Ajouter un document</h3>
                <Formik initialValues={initialValues} onSubmit={this.submit} validationSchema={validationSchema}>
                    { ( ) => (
                        <Form name="formulaire">
                           
                            <div className="row">
                                <div className="col-6"> 
                                    <span className="p-4">Editeur :</span>
                                    <Field as="select" name="lEditeur">  
                                        <option value ="">---choisir un editeur</option>                              
                                        <SelectEditeur/>
                                    </Field>
                                </div>
                                <div className="col-6"> 
                                    <span className="p-4">Bibliothecaire :</span>
                                    <Field as="select" name="bibliothecaire">   
                                    <option value ="">---choisir un bibliothecaire</option>                              
                                        <SelectBibliothecaire/>
                                    </Field>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col-6">
                                    <span className="p-4">Choisir le type de document :</span>
                                    <div className="form-check form-check-inline">
                                        <Field type="radio" id="docRadio" onClick={this.afficheDiv} name="typeDoc" value="papier" className="form-check-input"/>
                                        <label className="form-check-label">Format papier</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <Field type="radio" id="docRadio" onClick={this.afficheDiv} name="typeDoc" value="disque" className="form-check-input"/>
                                        <label className="form-check-label">Disque</label>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <Field type="date" name="dateAjout" className="form-control"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <Field type="text" name="nom" placeholder="nom" className="form-control mt-3"/>
                                    <ErrorMessage name="nom" component="small" className="text-danger float-end"/>
                                    <Field type="text" name="description" placeholder="description" className="form-control mt-3"/>
                                    <ErrorMessage name="description" component="small" className="text-danger float-end"/>
                                </div> 
                                <div className="col-6" style={{display: this.state.isPapier ? 'block' : 'none' }}>
                                    <Field type="text" name="typeDePublication" placeholder="typeDePublication" className="form-control mt-3"/>
                                    <Field type="number" name="nombrePage" placeholder="nombrePage" className="form-control mt-3"/>
                                </div>
                                <div className="col-6" style={{display: this.state.isDisque ? 'block' : 'none' }}>
                                    <Field type="text" name="typeDisque" placeholder="typeDisque" className="form-control mt-3"/>
                                    <Field type="number" name="dureeMinutes" placeholder="dureeMinutes" className="form-control mt-3"/>
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

export default TestAddDocument;