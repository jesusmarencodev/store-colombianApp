import React, { Component } from 'react'


export default class Order extends Component {

    render() {
        return (
            <div className="p-2 card">
                <strong>
                    <p style={{fontSize:'12px'}}>Items added: <span className="font-weight-normal">
                        In this section the items you want to buy will be added.</span>
                        <span> Remember your shipment is free.</span>
                    </p>
                </strong>
                <hr className="m-0"/>
                <div className="py-2">
                    <p className="font-weight-bold text-success">Total(2 items):$4512</p>
                    <input type="submit" className="btn btn-warning btn-block" value="Proceed to checkout"/>
                </div>
                
            </div>
        )
    }
}
