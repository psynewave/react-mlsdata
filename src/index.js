import React, { Component } from 'react';
import OData from 'react-odata';

class MLSData extends Component {
  render() {
    const base = 'http://api1.mlslistings.com/resodata';
    const { collection, token, link, resource = 'vow', ...rest } = this.props;
    const authHeader = { headers: { Authorization: `Bearer ${token}`}};

    if (link) {
      return <OData baseUrl={link} options={authHeader} {...rest} />
    }

    return <OData baseUrl={`${base}/${resource}/${collection}`} options={authHeader} {...rest} />
  }
}

export default MLSData;