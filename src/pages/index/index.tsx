import * as React from 'react';
import cx from 'classnames';
import trackComponent from '@/public/track';
import { history } from '@/pages/routers';
import './index.scss';
import { get } from '@/public/http/request';
export interface IndexProps {
  name?: string
}

@trackComponent({
  componentDidCatch: true
})
export default class Index extends React.Component<IndexProps, {}> {
  static defaultProps: IndexProps = {
    name: 'Welcome Hapi H5 !!!',
  };
  readonly state = {
  };
  componentDidMount() {
    get('https://www.baidu.com', {
      params: {
        a: 1
      }
    });
  }

  public render() {
    return (<div className={cx('index')}>
      {this.props.name}
      <br />
      <button onClick={() => { 
        history.push('/demo') 
      }}>走 起～～</button>
    </div>);
  }
}
