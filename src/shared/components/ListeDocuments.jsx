import React, { Component } from 'react';
import apiBiblio from '../../API/ApiBiblio';

class ListeDocuments extends Component {
    state = {
        listDoc: null,
        isLoading: true,
        user: { id: 0, username: 'Non Connecté(e)', 
                nom: 'null', prenom: 'null', authorities: [],
                empruntMax: 0, empruntEffectue: 0}
    }

    componentDidMount() {
        apiBiblio.get('/account').then(resp => {
            if(resp.status === 200) {
                localStorage.setItem('user', JSON.stringify(resp.data))
                console.log('user: ' + resp.data.username + ' refreshed in localStorage');
            }
        })
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
        .then(resp => {
            console.log(resp);
            apiBiblio.get('/listeDocuments')
            .then( resp => {
                if (resp.status === 200)
                    this.setState({
                        listDoc: resp.data,
                    })
            })
            .catch( error => console.log(error) )
        })
       
    }
    
    restitue = (idDoc) => {
        const user = JSON.parse(localStorage.getItem('user'))
        const url = '/rendreDocument/' + user.username + '/' + idDoc
        console.log(url);
        apiBiblio.put(url)
        .then(resp => {
            console.log(resp);
            apiBiblio.get('/listeDocuments')
            .then( resp => {
                if (resp.status === 200)
                    this.setState({
                        listDoc: resp.data,
                    })
            })
            .catch( error => console.log(error) )
        })        
    }

    efface = (idDoc) => {
        const url = '/effaceDocument/' + idDoc
        apiBiblio.delete(url)
        .then(resp => {
            console.log(resp);
            apiBiblio.get('/listeDocuments')
            .then( resp => {
                if (resp.status === 200)
                    this.setState({
                        listDoc: resp.data,
                    })
            })
            .catch( error => console.log(error) )
        })
    }

    render() {
        const userTmp = JSON.parse(localStorage.getItem('user'))
        var {listDoc, isLoading, user} = this.state
        if (userTmp) user = userTmp
        console.log(user);
        if (isLoading) return <option>Loading...</option>
        return (
            <table className="table table-striped">
                <thead className="thead-light">
                    <tr>
                    <th>Type</th>
                    <th>Nom du document</th>
                    <th>Taille</th>
                    <th>Editeur</th>
                    <th className="text-center">Disponible ?</th>
                    </tr>
                </thead>
                <tbody>
                {listDoc.map( (document, index) => {
                    console.log(document)
                    const idDoc = document.id
                    return <><tr key={index}>
                        <td>{document.nombrePage ? 'Papier' : ''}{document.dureeMinutes ? 'Disque' : ''}</td>
                        <td>{document.nom}</td>
                        <td>{document.nombrePage ? document.nombrePage + ' pages' : ''}{document.dureeMinutes ? document.dureeMinutes +' minutes' : ''}</td>
                        <td>{document.lEditeur.nom}</td>
                        <td rowSpan="3" className="align-middle text-center">
                            {(document.emprunteur) ? 
                                (document.emprunteur.id === user.id) ?
                                    <button 
                                        className="btn btn-warning p-0 m-0"
                                        type="button" onClick={() => this.restitue(idDoc)}>
                                            Restituer
                                    </button>
                                    : 'Non disponible'
                                :
                                ( user.authorities.some(role => (role === 'ROLE_EMPRUNTEUR'))
                                    && (user.empruntMax > user.empruntEffectue )) ? 
                                <button 
                                    className="btn btn-success p-0 m-0"
                                    type="button" onClick={() => this.emprunte(idDoc)}>
                                        Emprunter
                                </button>
                                : ( user.authorities.some(role => (role === 'ROLE_BIBLIOTHECAIRE'))
                                    && (!document.emprunteur) ) ?
                                <button
                                    className="btn btn-danger p-0 m-0"
                                    type="button" onClick={() => this.efface(idDoc)}>
                                        Effacer
                                </button>
                                : 'Disponible'
                            }
                        </td>
                    </tr><tr></tr>
                    <tr><td className="text-right"></td><td colSpan="3"><b>Description :</b> <i>{document.description}</i></td></tr>
                    </>
                })}
                </tbody>
            </table>
        );
    }
}

export default ListeDocuments;