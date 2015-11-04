import Component from 'react-pure-render/component';
import DocumentTitle from 'react-document-title';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default class NotFound extends Component {

  static propTypes = {
    msg: PropTypes.object
  };

  render() {
    const {msg: { notFound: msg }} = this.props;
    return (
      <DocumentTitle title={msg.title}>
        <div className="notfound-page">
          <p>404 not found</p>
        </div>
      </DocumentTitle>
    )
  }
}