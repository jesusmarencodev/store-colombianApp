import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import About from './components/About';
import Header from './components/Header';
import Error from './components/Error';
import Home from './components/Home';
import Store from './components/store/Store';
import Admin from './components/admin/Admin';
import Category from './components/admin/Category';
import Products from './components/admin/Products';

class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <Header/>
                <Switch>
                    <Route  exact path="/" component={Home}/>
                    <Route  exact path="/about" component={About}/>
                    <Route  exact path="/store" component={Store}/>
                    <Route  exact path="/admin" component={Admin}/>
                    <Route  exact path="/categories" component={Category}/>
                    <Route  exact path="/products" component={Products}/>
                    <Route  component={Error}/>
                </Switch>
            </BrowserRouter>
        )
    }
}
export default  Router;