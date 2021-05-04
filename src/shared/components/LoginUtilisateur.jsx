import React, { Component } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as yup from 'yup'
import apiLogin from './../../API/ApiLogin';

const initialValues = {
    username: '',
    password: ''
}
const validationSchema = yup.object().shape({
    username: yup.string().required("champs requis"),
    password: yup.string().required("champs requis"),
})
class LoginUtilisateur extends Component {

    submit = (values, {resetForm}) => {

        apiLogin.post('/login', values)
        .then(resp => {
            console.log(resp);
            if (resp.data.token) {
                localStorage.setItem('token', resp.data.token);
                console.log('LoginUtilisateur.jsx : token saved in localStorage');
                resetForm()
            }
        })
        
    }

    render() {
        const token = localStorage.getItem('token')
        if (token) {
            localStorage.removeItem('token')
            console.log('LoginUtilisateur.jsx : token deleted in localStorage');
        }
        return (
            <div className="container card shadow mt-3 p-3">
                <h3 className="text-center p-2">Connecter un utilisateur</h3>
                <Formik initialValues={initialValues} onSubmit={this.submit} validationSchema={validationSchema}>
                    { ( ) => (
                        <Form>
                            <div className="row">
                                <div className="col-6">
                                    <Field type="text" name="username" placeholder="Pseudonyme" className="form-control mt-3"/>
                                    <ErrorMessage name="username" component="small" className="text-danger float-end"/>
                                    <Field
                                        type="password" name="password" placeholder="Mot de passe" 
                                        className="form-control mt-4"/>
                                    <ErrorMessage name="Password" component="small" className="text-danger float-end"/>
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

export default LoginUtilisateur;