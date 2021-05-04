import React, { Component } from 'react'

export default class Loader extends Component {
    render() {
        return (
            <div className="d-flex justify-content-center ">
                <div style={{ minHeight: '100vh' }} className="d-flex flex-row justify-content-center align-items-center w-100">
                    <img alt="Loading..." src="https://www.autopricemanager.com/img/widget-loader-lg-en.gif"/>
                </div>
            </div>
        )
    }
}