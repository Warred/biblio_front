import React, { Component } from 'react'
import FormulaireAuteur from './../shared/components/FormulaireAuteur';

export default class AjoutAuteur extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="rows col-md-10 offset-md-1">
                    <div className="justify-content-center">
                        <div className="rows d-flex flex-wrap">
                        <FormulaireAuteur/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }  
}