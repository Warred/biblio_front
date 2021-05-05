import React, { Component } from 'react';
import apiBiblio from '../../API/ApiBiblio';

class SelectAuteur extends Component {

    state = {
        auteurs: null,
        isLoading: true
    }

    componentDidMount() {
        apiBiblio.get('/listeAuteurs')
        .then( resp => {
            if (resp.status === 200)
                this.setState({
                    auteurs: resp.data,
                    isLoading: false
                })
        })
        .catch( error => console.log(error) ) 
    }
    render() {
        const {auteurs, isLoading} = this.state
        if (isLoading) return <option>Loading...</option>
        return (
                auteurs.map( (auteur, index) => {
                    let JsonAuteur = JSON.stringify(auteur)
                    return <option key={index} value={JsonAuteur}>{auteur.nom}</option>
                }
            )
        );
    }
}

export default SelectAuteur;