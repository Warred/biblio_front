import React, { Component } from 'react'

export default class ErrorView extends Component {
    render() {
        return (
            <div className="text-center">
                <h1 className="text-danger">ERREUR: 404 - Page non trouvée.</h1>
            </div>
        )
    }
}
