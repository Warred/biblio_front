import React, { Component } from 'react'

export default class AboutView extends Component {

    toHome = () => this.props.history.push('/')

    goBack = () => this.props.history.goBack()

    render() {
        return (
            <div className="text-center">
                <h1>ABOUT</h1>
                <div className="btn-group">
                    <button onClick={this.toHome} type="button" className="btn btn-success">Home</button>
                    <button onClick={this.goBack} type="button" className="btn btn-danger">Back</button>
                </div>
            </div>
        )
    }
}
