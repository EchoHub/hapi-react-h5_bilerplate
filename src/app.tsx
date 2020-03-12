import * as React from 'react';
import * as ReactDOM from 'react-dom';
import VConsole from 'vconsole';
import { Promopt } from 'react-router';
import { Router, Route } from 'react-router-dom';
import R, { RouterConfigParams, history } from '@/pages/routers';
import { trackApp } from '@/public/track/index';
import './app.scss';
// if (process.env.NODE_ENV === 'development') {
//   new VConsole();
// }
class App {
  private root = document.getElementById('app');
  @trackApp()
  render() {
    return ReactDOM.render(
      <Router history={history}>
        {
          R.map((conf: RouterConfigParams, index) =>
            <Route key={index} exact={index === 0} path={conf.path} component={conf.component} />
          )
        }
      </Router>,
      this.root);
  }
}
new App().render();

