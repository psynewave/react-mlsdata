import React, { Component } from 'react';
import OData from 'react-odata';

const base = 'http://api1.mlslistings.com/resodata';

class MLSMedia extends Component {
  render() {
    const { collection = 'Media', token, resource = 'public', limit, ListingKeyNumeric, MediaType='Photo', ...rest } = this.props;
    const authHeader = { headers: { Authorization: `Bearer ${token}`}};
    const mediaQuery = {
          filter: { 
          and: [
                { ResourceRecordKeyNumeric: ListingKeyNumeric },
                "MediaStatus eq ResourceEnums.MediaStatus'Valid'",
                `MediaCategory eq ResourceEnums.MediaCategory'${MediaType}'`
              ]
          },
          top: 1
        };
      return <OData baseUrl={`${base}/${resource}/${collection}`} options={authHeader} query={mediaQuery} {...rest} />
  }
}

class MLSData extends Component {
  render() {
    const { collection, token, link, resource = 'vow', limit, ...rest } = this.props;
    const authHeader = { headers: { Authorization: `Bearer ${token}`}};

    if (link) {
      return <OData baseUrl={link} options={authHeader} {...rest} />
    }

    if (collection.toLowerCase() === 'media' ) {
      return <MLSMedia {...rest} />
    }

    return <OData baseUrl={`${base}/${resource}/${collection}`} options={authHeader} {...rest} />
  }
}

export { MLSMedia };
export default MLSData;