import React, { Component } from 'react'
import FormulaireInscription from './../shared/components/FormulaireInscription';


export default class InscriptionUtilisateur extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="rows col-md-10 offset-md-1">
                    <div className="justify-content-center">
                        <div className="rows d-flex flex-wrap">
                        <FormulaireInscription/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
  
}