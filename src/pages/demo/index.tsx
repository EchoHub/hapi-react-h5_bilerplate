import * as React from 'react';
import cx from 'classnames';
import trackComponent from '@/public/track';
import './index.scss';
export interface IndexProps {
  name?: string
}

@trackComponent()
export default class Demo extends React.Component<IndexProps, {}> {
  static defaultProps: IndexProps = {
    name: 'DEMO',
  };
  public render() {
    return (<div className={cx('demo')}>
      {this.props.name}
    </div>);
  }
}
