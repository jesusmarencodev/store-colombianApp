import React, { Component, Fragment } from 'react'
import '../App'

export default class Sale extends Component {

    render() {
        let {sale} = this.props;
        let {items} =  sale;
        return (
            <Fragment>
                <li className="list-unstyled p-3 border-bottom text-center">
                    <p><strong>Invoice</strong>: FC-{sale.invoice}</p>
                    <p><strong>Total</strong>: ${sale.total}</p>
                    <button className="btn btn-success" data-toggle="modal" data-target="#modaDetail"><i className="fa far fa-eye"></i> Detail</button>     
                </li>
                {/* Modal */}
                <div className="modal fade" id="modaDetail" role="dialog" aria-labelledby="modaDetailTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                            <h5 className="modal-title" >Invoice: FC-{sale.invoice} -----> Total: ${sale.total}</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <ul className="text-center pl-0">
                                    {   items.map(item => {
                                            return(
                                                <li key={`${sale._id}-${item._id}`} className="list-unstyled p-3 border-bottom">
                                                    <p><strong>Name</strong></p>
                                                    <p className="mb-0 name">{item.product.name}</p>
                                                    <p className="mb-0 name">Quantity: {item.quantity}</p>
                                                    <p className="mb-0 name">Price: ${item.product.price}</p>
                                                    <p className="mb-0 name">Total: ${item.quantity * item.product.price}</p>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
