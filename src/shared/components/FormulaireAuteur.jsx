import React, { Component } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as yup from 'yup'
import apiBiblio from '../../API/ApiBiblio';

const initialValues = {
    nom: '',
    prenom: '',
    pays: ''
}
const validationSchema = yup.object().shape({
    nom: yup.string().required("Champs requis!")
                     .min(3, 'Minumum 3 caractéres!')
                     .max(20, 'Maximum 20 caractéres!'),
    prenom: yup.string().required("Champs requis!")
                        .min(3, 'Minumum 3 caractéres!')
                        .max(20, 'Maximum 20 caractéres!'),
    pays: yup.string().required("Champs requis!")
                      .min(3, 'Minumum 3 caractéres!')
                      .max(20, 'Maximum 20 caractéres!')
})

class FormulaireAuteur extends Component {

    submit = (values, {resetForm}) => {
        console.log(values);
        apiBiblio.post('/ajoutAuteur', values)
        .then(resp => {
            console.log(resp);
        })        
        resetForm()      
    }

    render() {
        return (
            <div className="container card shadow mt-3 p-3">
                <h3 className="text-center p-2">Ajouter un éditeur</h3>
                <Formik initialValues={initialValues} onSubmit={this.submit} validationSchema={validationSchema}>
                    { ( ) => (
                        <Form>
                            <div className="row">
                                <div className="col-6">
                                    <Field type="text" name="prenom" placeholder="Prénom" className="form-control mt-3"/>
                                        <ErrorMessage name="prenom" component="small" className="text-danger float-end"/>
                                    <Field type="text" name="nom" placeholder="Nom" className="form-control mt-3"/>
                                        <ErrorMessage name="nom" component="small" className="text-danger float-end"/>
                                 </div>  
                                 <div className="col-6">
                                    <Field type="text" name="pays" placeholder="Pays" className="form-control mt-3"/>
                                        <ErrorMessage name="pays" component="small" className="text-danger float-end"/>
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

export default FormulaireAuteur;