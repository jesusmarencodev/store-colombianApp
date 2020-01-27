import React from 'react';
import { Link } from 'react-router-dom';

const OneCategory = ({category}) => {
    return (
        <li  className="list-group-item">
        <div className="row justify-content-between align-item-center">
            <div className="col-8 d-flex justify-content-between align-item-center">
                {category.name}
            </div>
            <div className="col-4 d-flex justify-content-end">
                <Link
                    to={`/cliente/editar/`}
                    className="btn btn-warning d-block d-md-inline-block"
                >
                    Edit
                </Link>
            </div>
        </div>
    </li>
    );
};

export default OneCategory;