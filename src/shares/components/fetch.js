import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';

export default function fetch(...actions) {

  return Wrapped => class Fetch extends Component {

    static PropTypes = {
      dispatch: PropTypes.func,
      location: PropTypes.object,
      params: PropTypes.object
    };

    static fetchActions = actions;

    componentDidMount() {
      const {dispatch, location, params} = this.props;
      actions.forEach(action =>
        dispatch(action({location, params}))
      );
    }

    render() {
      return <Wrapped {...this.props} />;
    }
  }
}