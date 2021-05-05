import React, { Component } from 'react'
import FormulaireEmprunteur from './../shared/components/FormulaireEmprunteur';

export default class InscriptionEmprunteur extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="rows col-md-10 offset-md-1">
                    <div className="justify-content-center">
                        <div className="rows d-flex flex-wrap">
                        <FormulaireEmprunteur/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }  
}