import * as React from 'react';
import classnames from 'classnames';
import trackComponent from '@/public/track';
import Hapi from '@/assets/hapi.jpg';
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
    console.log(1);
  };
  componentDidMount() { }

  public render() {
    return (<div className={classnames('index')}>
      <img src={Hapi} alt='' />
      <h2>{this.props.name}</h2>
    </div>);
  }
}
