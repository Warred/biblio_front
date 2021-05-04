import React, { Component } from 'react'
import FormulaireEditeur from './../shared/components/FormulaireEditeur';

export default class InscriptionBiblio extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="rows col-md-10 offset-md-1">
                    <div className="justify-content-center">
                        <div className="rows d-flex flex-wrap">
                        <FormulaireEditeur/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
  
}