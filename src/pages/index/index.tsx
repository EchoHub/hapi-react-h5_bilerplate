import * as React from 'react';
import cx from 'classnames';
import trackComponent from '@/public/track';
import './index.scss';
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
    error: ''
  };
  componentDidMount() {
    var a;
    this.setState({
      a: a.a
    })
  }

  componentDidCatch(error, info) {
    this.setState({
      error
    });
  }

  public render() {
    if (this.state.error) { // 如果页面崩溃，则显示下面的UI
      return (
        <div>123123123</div>
      );
    }
    return (<div className={cx('index')}>
      {this.props.name}
    </div>);
  }
}
