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

    emprunte = (idDoc) => {
        const user = JSON.parse(localStorage.getItem('user'))
        const url = '/emprunteDocument/' + user.username + '/' + idDoc
        console.log(url);
        apiBiblio.put(url)
        window.location.replace("/ListeDocuments");
    }
    
    restituer = (idDoc) => {
        const user = JSON.parse(localStorage.getItem('user'))
        const url = '/rendreDocument/' + user.username + '/' + idDoc
        console.log(url);
        apiBiblio.put(url)
        window.location.replace("/ListeDocuments");
    }

    render() {
        const user = JSON.parse(localStorage.getItem('user'))
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
                    const idDoc = document.id
                    return <tr key={index}>
                        <td>{document.nom}</td><td>{document.lEditeur.nom}</td>
                        <td>
                            {document.emprunteur ? 
                                (document.emprunteur.id === user.id) ?
                                    <button 
                                        className="btn btn-warning p-0 m-0"
                                        type="button" onClick={() => this.restituer(idDoc)}>
                                            Restituer
                                    </button>
                                    : 'Non disponible'
                                :
                                (user.authorities.some(role => (role === 'ROLE_EMPRUNTEUR'))) ? 
                                <button 
                                    className="btn btn-success p-0 m-0"
                                    type="button" onClick={() => this.emprunte(idDoc)}>
                                        Emprunter
                                </button>
                                : 'Disponible'
                            }
                        </td>
                    </tr>
                })}
                </tbody>
            </table>
        );
    }
}

export default ListeDocuments;