import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Error from './components/Error';
import Home from './components/Home';
import Store from './components/user/Store';
import Admin from './components/admin/Admin';
import Category from './components/admin/Category';
import Products from './components/admin/Products';
import EditCategory from './components/admin/Edit/EditCategory';
import EditProduct from './components/admin/Edit/EditProduct';
import History from './components/History';

class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <Header/>
                <Switch>
                    <Route  exact path="/" component={Home}/>
                    <Route  exact path="/store" component={Store}/>
                    <Route  exact path="/admin" component={Admin}/>
                    <Route  exact path="/categories" component={Category}/>
                    <Route  exact path="/category/:id" component={EditCategory}/>
                    <Route  exact path="/products" component={Products}/>
                    <Route  exact path="/product/edit/:id" component={EditProduct}/>
                    <Route  exact path="/history" component={History}/>
                    <Route  component={Error}/>
                </Switch>
            </BrowserRouter>
        )
    }
}
export default  Router;