import React, { Component } from 'react';
import apiBiblio from './../API/ApiBiblio';


class TestUtilisateur extends Component {

    state = {
        isLoading: true,
        users: null
    }

    componentDidMount() {
        apiBiblio.get('/listUtilisateurs')
        .then( resp => {
            console.log(resp);
            if (resp.status === 200)
            this.setState({
                isLoading: false,
                users: resp.data
            })
        })
        .catch( error => console.log(error) ) 
    }

    render() {
        const {isLoading} = this.state
        if (isLoading) return <h2>Loading...</h2>
        return (
            <div>
                test utilisateur
            </div>
        );
    }
}

export default TestUtilisateur;