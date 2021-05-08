import React, { Component } from 'react';
import apiBiblio from '../../API/ApiBiblio';

class ListeDocuments extends Component {
    state = {
        listDoc: null,
        isLoading: true
    }

    componentDidMount() {
        apiBiblio.get('/listeDocuments')
        .then( resp => {
            if (resp.status === 200)
                this.setState({
                    listDoc: resp.data,
                    isLoading: false
                })
        })
        .catch( error => console.log(error) ) 
    }

    emprunte = () => {
        
    }

    render() {
        const {listDoc, isLoading} = this.state
        if (isLoading) return <option>Loading...</option>
        return (
            <table className="table table-striped">
                <thead className="thead-light">
                    <tr>
                    <th>Nom du document</th>
                    <th>Editeur</th>
                    <th>Disponible ?</th>
                    </tr>
                </thead>
                <tbody>
                {listDoc.map( (document, index) => {
                    console.log(document)
                    return <tr key={index}>
                        <td>{document.nom}</td><td>{document.lEditeur.nom}</td>
                        <td>{document.emprunteur ? "Non disponible" : <button className="btn btn-success p-0 m-0" type="button" onClick={this.emprunte}>Emprunter</button>}</td>
                    </tr>
                })}
                </tbody>
            </table>
        );
    }
}

export default ListeDocuments;