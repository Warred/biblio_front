import React, { Component } from 'react'
export default class HomeView extends Component {

    state = {
        user: localStorage.getItem('user')
    }
    render() {
        const token = localStorage.getItem('token')
        const user = JSON.parse(localStorage.getItem('user'))
        console.log('HomeView.jsx load token : ' + token);
        if (user) return (
            <div>
                <h1>{user.username}</h1>
                <h2>authorities : {user.authorities}</h2>
                <div style={{display: ((user.authorities.some(role => (role === 'ROLE_BIBLIOTHECAIRE'))) ? 'block' : 'none') }}>
                    vous êtes biblio
                </div>
                 <div>{user.id}</div>
                 <div>includes = {(user.authorities.some(role => (role === 'ROLE_BIBLIOTHECAIRE'))) ? 'true' : 'false'}</div>
            </div>
        )
        else return (
            <div>
                <h1 className="text-center">Veuillez vous connecter</h1>
            </div>
        )        
    }
}