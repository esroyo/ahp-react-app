import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import logger from 'redux-logger';
import promise from 'redux-promise';

import reducers from './reducers';
import AhpIndex from './components/ahp_index';
import DecisionsNew from './components/decisions_new';
import CriteriaNew from './components/criteria_new';
import Footer from './components/footer';

const createStoreWithMiddleware = applyMiddleware(logger, promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
        <div>
            <Switch>
                <Route path="/decisions/:id/criteria" component={CriteriaNew} />
                <Route path="/decisions/:id" component={DecisionsNew} />
                <Route path="/" component={AhpIndex} />
            </Switch>
            <Route path="/" component={Footer} />
        </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
