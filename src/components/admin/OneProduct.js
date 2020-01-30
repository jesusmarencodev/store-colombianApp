import React from 'react';
import { Link } from 'react-router-dom';

const OneProduct = ({product}) => {
    return (
        <li  className="list-group-item">
        <div className="row justify-content-between align-item-center">
            <div className="col-10 d-flex justify-content-between align-item-center">
                <span className="text-left"><strong>{product.name}</strong></span>  <span className="text-right">Units: {product.units}</span>
            </div>
            <div className="col-2 d-flex justify-content-end">
                <Link
                    to={`/product/edit/${product._id}`}
                    className="btn btn-warning d-block d-md-inline-block"
                >
                    <i className="fa far fa-edit"></i>
                </Link>
            </div>
        </div>
    </li>
    );
};

export default OneProduct;