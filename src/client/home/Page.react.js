import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';
import {
  Card,
  Row,
  Col,
} from 'antd';

export default class Home extends Component {

  render() {
    return (
      <DocumentTitle title="Home">
        <Row>
          <Col span="16" offset="4">
            <Card title="Welcome">
              <p>Welcome Home</p>
              <Link to="whatever">Must be 404</Link>
            </Card>
          </Col>
        </Row>
      </DocumentTitle>
    )
  }
}
