import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';

export default function fetch(action) {

  return Wrapped => class Fetch extends Component {

    static PropTypes = {
      dispatch: PropTypes.func,
      location: PropTypes.object,
      params: PropTypes.object
    };

    static fetchAction = action;

    componentDidMount() {
      const {dispatch, location, params} = this.props;
      dispatch(action({location, params}));
    }

    render() {
      return <Wrapped {...this.props} />;
    }
  }
}