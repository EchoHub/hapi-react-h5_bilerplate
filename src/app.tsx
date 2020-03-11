import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route } from 'react-router-dom';
import R, { RouterConfigParams, history } from './pages/routers';
// import VConsole from 'vconsole';
import './app.scss';
// execuption
// import * as Track from '@/public/utils/data-track/hp-stat-h5';
// Track.init(CONSTANT.trackDomain, {
//     env: 'production',
// });
// ;new VConsole();
ReactDOM.render(
    <Router history={history}>
        {
            R.map((conf: RouterConfigParams, index) =>
                <Route key={index} exact={index === 0} path={conf.path} component={conf.component} />
            )
        }
    </Router>,
    document.getElementById('app')
);
