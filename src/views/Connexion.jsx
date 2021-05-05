import React, { Component } from 'react'
import LoginUtilisateur from '../shared/components/LoginUtilisateur'


export default class Connexion extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="rows col-md-10 offset-md-1">
                    <div className="justify-content-center">
                        <div className="rows d-flex flex-wrap">
                            <LoginUtilisateur/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
  
}