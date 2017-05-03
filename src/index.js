import React, { Component } from 'react';
import OData from 'react-odata';

class MLSData extends Component {
  render() {
    const base = 'http://api1.mlslistings.com/resodata';
    const { collection, token, link, resource = 'vow', limit, ListingKeyNumeric, MediaType='Photo', ...rest } = this.props;
    const authHeader = { headers: { Authorization: `Bearer ${token}`}};

    if (link) {
      return <OData baseUrl={link} options={authHeader} {...rest} />
    }

    if (collection.toLowerCase() === 'media' ) {
        console.log(ListingKeyNumeric);
        const query = {
          filter: { 
          and: [
                { ResourceRecordKeyNumeric: ListingKeyNumeric },
                "MediaStatus eq ResourceEnums.MediaStatus'Valid'",
                `MediaCategory eq ResourceEnums.MediaCategory'${MediaType}'`
              ]
          },
          top: 1
        };
        console.log(ListingKeyNumeric, query);
      return <OData baseUrl={`${base}/${resource}/${collection}`} options={authHeader} query={query} {...rest} />
    }

    return <OData baseUrl={`${base}/${resource}/${collection}`} options={authHeader} {...rest} />
  }
}

export default MLSData;