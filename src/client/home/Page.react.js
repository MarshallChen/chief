import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default class Home extends Component {

  static propTypes = {
    msg: PropTypes.object
  };

  render() {
    return <div>Welcome home boss! <Link to="/what-ever-it-is">You can try</Link></div>
  }
}