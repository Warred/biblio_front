import React, { Component } from 'react';

class Deconnect extends Component {
    render() {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.replace('/login')
        return <></>
    }
}

export default Deconnect;