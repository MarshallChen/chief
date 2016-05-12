import Component from 'react-pure-render/component';
import DocumentTitle from 'react-document-title';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default class NotFound extends Component {

  render() {
    return (
      <DocumentTitle title="404">
        <div className="notfound-page">
          <p>404 not found</p>
        </div>
      </DocumentTitle>
    )
  }
}
