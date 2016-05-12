import './app.css';
import './app.less';
import './app.styl';
import Component from 'react-pure-render/component';
import mapDispatchToProps from '../../shares/app/mapDispatchToProps';
import mapStateToProps from '../../shares/app/mapStateToProps';
import React, { PropTypes } from 'react';
import RouterHandler from '../../shares/components/RouterHandler.react';
import { connect } from 'react-redux';

class App extends Component {

  static propTypes = {
    children: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    msg: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
  }

  render() {
    return (
      <div className="page">
        <RouterHandler {...this.props} />
      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(App);
