import React, { Component } from 'react';
import apiBiblio from '../../API/ApiBiblio';

class SelectEditeur extends Component {

    state = {
        editeurs: null,
        isLoading: true
    }

    componentDidMount() {
        apiBiblio.get('/listeEditeurs')
        .then( resp => {
            if (resp.status === 200)
                this.setState({
                    editeurs: resp.data,
                    isLoading: false
                })
        })
        .catch( error => console.log(error) ) 
    }
    render() {
        const {editeurs, isLoading} = this.state
        if (isLoading) return <option>Loading...</option>
        return (
                editeurs.map( (editeur, index) => {
                    let JsonEditeur = JSON.stringify(editeur)
                    return <option key={index} value={JsonEditeur}>{editeur.nom}</option>
                }
            )
        );
    }
}

export default SelectEditeur;