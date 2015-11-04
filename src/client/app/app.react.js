import './app.css';
import './app.less';
import './app.styl';
import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import RouterHandler from '../../shares/components/RouterHandler.react';
import mapDispatchToProps from '../../shares/app/mapDispatchToProps';
import mapStateToProps from '../../shares/app/mapStateToProps';
import { connect } from 'react-redux';

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {

  static propTypes = {
    children: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    msg: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
  }

  render() {
    return (
      <div className="page">
        <div>Header</div>
        <RouterHandler {...this.props} />
        <div>Footer</div>
      </div>
    );
  }

}
