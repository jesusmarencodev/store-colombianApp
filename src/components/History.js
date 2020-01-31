import React, { Component } from 'react'
import Global from '../Global';
import Sale from './Sale';
import axios from 'axios';

export default class History extends Component {

    url = Global.url;

    state = {
        sales :[]
    }
       

    componentDidMount(){
        axios.get(`${this.url}/sale/getAll`)
             .then(resp => {
                 this.setState({
                     ...this.state,
                     sales: resp.data.sales
                 })
             })
    }
    render() {
        let { sales } = this.state;

        return (
            <div className="container-fluid row">
               <div className="col-12 pt-5 pb-3 text-center border-bottom">
                   <h3>Sale history</h3>
               </div>
               <ul className="container">
                {   sales.map(sale => {
                        return(
                            <Sale key={sale._id} sale={sale}/>
                        )
                    }) 
                }
               </ul>
            </div>
        )
    }
}
