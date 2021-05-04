import React, { Component } from 'react'
import apiBiblio from './../API/ApiBiblio';


export default class HomeView extends Component {
    state = { 
        user: null,
        isLoading: true
     }

    componentDidMount() {
        apiBiblio.get('/account')
            .then(resp => {
                console.log(resp);
                if (resp.status === 200) {
                    this.setState({
                        user: resp.data
                    })
                } 
                this.setState({isLoading: false})              
            })
            .catch()
    }
    render() {
        const {user, isLoading} = this.state
        const token = localStorage.getItem('token')
        console.log('HomeView.jsx load token : ' + token);
        if (isLoading) return <h1>Loading...</h1>
        else if (user) return (
            <div>
                <h1 className="text-center">{user.username}</h1>
                <p>{token}</p>
            </div>
        )
        else return (
            <div>
                <h1 className="text-center">Veuillez vous connecter</h1>
            </div>
        )
        
    }
}
