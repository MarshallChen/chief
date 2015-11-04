import React, { Component , PropTypes } from 'react';
import config from '../config';

export default class Html extends Component {

  static propTypes = {
    bodyHtml: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired
  };

  render() {
    const { bodyHtml, title } = this.props;
    // Only for production. For dev, it's handled by webpack with livereload.
    const linkStyles = !config.webpack.hotReload &&
      <link
        href={`/_assets/app.${config.githash}.css`}
        rel="stylesheet"
      />;

    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport" />
          <title>{title}</title>
          <link rel="shortcut icon" href='/assets/img/favicon.ico' />
          {linkStyles}
        </head>
        <body dangerouslySetInnerHTML={{__html: bodyHtml}} />
      </html>
    );
  }

}
