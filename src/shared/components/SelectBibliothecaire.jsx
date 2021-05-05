import React, { Component } from 'react';
import apiBiblio from '../../API/ApiBiblio';

class SelectBibliothecaire extends Component {

    state = {
        bibliothecaires: null,
        isLoading: true
    }

    componentDidMount() {
        apiBiblio.get('/listeBibliothecaires')
        .then( resp => {
            if (resp.status === 200)
                this.setState({
                    bibliothecaires: resp.data,
                    isLoading: false
                })
        })
        .catch( error => console.log(error) ) 
    }
    render() {
        const {bibliothecaires, isLoading} = this.state
        if (isLoading) return <option>Loading...</option>
        return (
                bibliothecaires.map( (bibliothecaire, index) => {
                    let JsonBiblio = JSON.stringify(bibliothecaire)
                    return <option key={index} value={JsonBiblio}>{bibliothecaire.nom}</option>
                }
            )
        );
    }
}

export default SelectBibliothecaire;