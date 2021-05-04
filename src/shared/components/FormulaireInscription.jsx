import React, { Component } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as yup from 'yup'
import apiLogin from './../../API/ApiLogin';

const initialValues = {
    username: '',
    password: '',
    nom: '',
    prenom: '',
    role: ''
}
const validationSchema = yup.object().shape({
    username: yup.string().required("champs requis"),
    password: yup.string().required("champs requis"),
    nom: yup.string().required("champs requis"),
    prenom: yup.string().required("champs requis")
})
class FormulaireInscription extends Component {

    submit = (values, {resetForm}) => {
        console.log(values);
        const role = values.role

        apiLogin.post('/inscrireUtilisateur', values, {params:{role}})
        .then(resp => {
            console.log(resp);
        })
        
        resetForm()      
    }

    render() {
        return (
            <div className="container card shadow mt-3 p-3">
                <h3 className="text-center p-2">Inscrire un utilisateur</h3>
                <Formik initialValues={initialValues} onSubmit={this.submit} validationSchema={validationSchema}>
                    { ( ) => (
                        <Form>
                            <div className="row">
                                <div className="col">
                                <div className="form-check form-check-inline">
                                        <Field type="radio" name="role" value="emprunteur" className="form-check-input"/>
                                        <label className="form-check-label">Emprunteur</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <Field type="radio" name="role" value="bibliothecaire" className="form-check-input"/>
                                        <label className="form-check-label">Bibliothecaire</label>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                <Field type="text" name="username" placeholder="Pseudonyme" className="form-control mt-3"/>
                                    <ErrorMessage name="username" component="small" className="text-danger float-end"/>
                                    <Field
                                        type="password" name="password" placeholder="Mot de passe" 
                                        className="form-control mt-4"/>
                                    <ErrorMessage name="Password" component="small" className="text-danger float-end"/>

                                 </div>  
                                 <div className="col-6">
                                 <Field type="text" name="nom" placeholder="nom" className="form-control mt-3"/>
                                    <ErrorMessage name="nom" component="small" className="text-danger float-end"/>
                                    <Field type="text" name="prenom" placeholder="prenom" className="form-control mt-4"/>
                                    <ErrorMessage name="prenom" component="small" className="text-danger float-end"/>
                                </div> 
                            </div>
                            <div className="row m-0 mt-4">
                                <button type="submit" className="btn btn-success btn-block">Envoyer</button>
                            </div>

                        </Form>
                    ) }                    
                </Formik>
            </div>
        );
    }
}

export default FormulaireInscription;