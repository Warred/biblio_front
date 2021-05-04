import React, { Component } from 'react'

export default class Footer extends Component {
    render() {
        return (
            <div className="navbar navbar-dark bg-light footer">
                <div className="container">
                    <span className="pull-left">© 2021 - Site Built By Adam & Aurélien!</span>
                    <span to="" className="text-dark pull-right">
                        <i>Zombo.com: Where everything is possible!</i>
                    </span>
                </div>
            </div>
        )
    }
}
