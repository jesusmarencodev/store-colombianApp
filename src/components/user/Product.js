import React, { Component } from 'react'
import prueba from '../../assets/images/face2.jpg';
import '../../App';


export default class Product extends Component {


    render() {
        return (
            <div className="row">
                <div className="col-md-2 d-flex">
                    <div className="image p-1">
                        <img style={{height:"150px"}} src={prueba} aly="er"/>
                    </div>

                </div>
                <hr/>
            </div>
        )
    }
}
