import * as React from 'react';
import cx from 'classnames';
import './index.scss';
export interface IndexProps {
  name?: string
}
export default class Index extends React.Component<IndexProps, {}> {
  static defaultProps: IndexProps = {
    name: 'Welcome Hapi H5 !!!',
  };
  readonly state = {
  };

  public render() {
    return (<div className={cx('index')}>
     {this.props.name}
    </div>);
  }
}
