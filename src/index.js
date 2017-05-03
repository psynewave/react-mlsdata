import React, { Component } from 'react';
import OData from 'react-odata';

class MLSData extends Component {
  render() {
    const base = 'http://api1.mlslistings.com/resodata/vow';
    const { collection, token, link, ...rest } = this.props;
    const authHeader = { headers: { Authorization: `Bearer ${token}`}};

    if (link) {
      return <OData baseUrl={link} options={authHeader} {...rest} />
    }

    return <OData baseUrl={`${base}/${collection}`} options={authHeader} {...rest} />
  }
}

export default MLSData;