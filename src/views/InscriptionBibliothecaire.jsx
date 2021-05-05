import React, { Component } from 'react'
import FormulaireBibliothecaire from './../shared/components/FormulaireBibliothecaire';

export default class InscriptionBibliothecaire extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="rows col-md-10 offset-md-1">
                    <div className="justify-content-center">
                        <div className="rows d-flex flex-wrap">
                        <FormulaireBibliothecaire/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }  
}