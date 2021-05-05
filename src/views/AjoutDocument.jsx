import React, { Component } from 'react'
import FormulaireDocument from '../shared/components/FormulaireDocument'

export default class AjoutDocument extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="rows col-md-10 offset-md-1">
                    <div className="justify-content-center">
                        <div className="rows d-flex flex-wrap">
                            <FormulaireDocument/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }  
}