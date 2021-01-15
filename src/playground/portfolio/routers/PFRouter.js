import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import PFHeader from '../components/PFHeader';
import PFHome from '../components/PFHome';
import PFPortfolio from '../components/PFPortfolio';
import PFItem from '../components/PFItem';
import PFContact from '../components/PFContact';
import PFPageNotFound from '../components/PFPageNotFound';


const PFRouter = () => (
    <BrowserRouter>
    <div>
        <PFHeader />

        <Switch>
            <Route path="/" component={PFHome} exact={true} />
            <Route path="/portfolio" component={PFPortfolio} exact={true} />
            <Route path="/portfolio/:id" component={PFItem} />
            <Route path="/contact" component={PFContact} />
            <Route component={PFPageNotFound} />
        </Switch>
    </div>
</BrowserRouter>

);

export default PFRouter;
