import React, { Component } from 'react';
import OData, { buildQuery } from 'react-odata';

const dbase = 'http://api1.mlslistings.com/resodata';
const statsbase = 'http://localhost/RETSAPI';

class MLSCount extends Component {
  render () {
    const { query, ...rest } = this.props;
    const countQuery = {
      top: 0,
      count: true,
      ...query
    }
    return <MLSData {...rest} query={countQuery}/>
  }
}

class MLSMedia extends Component {
  render() {
    const { resource = "public", collection = "Media", query, ListingKeyNumeric = false , MemberKeyNumeric = false, MediaType = 'Photo', ...rest } = this.props;
    const ResourceRecordKeyNumeric = ListingKeyNumeric ? ListingKeyNumeric : MemberKeyNumeric;
    const mediaQuery = {
          filter: { 
          and: [
                { ResourceRecordKeyNumeric },
                "MediaStatus eq ResourceEnums.MediaStatus'Valid'",
                `MediaCategory eq ResourceEnums.MediaCategory'${MediaType}'`
              ]
          },
          top: 1
        };
      return <MLSData resource={resource} collection={collection} {...rest} query={mediaQuery} processed={true} />
  }
}

//Adding classes to accommodate stats and geographies
class MLSGeography extends Component {
  render() {
    const { resource = "BiEntity", collection = "vGeographyByGeographyTypes", filter="",select="", ...rest } = this.props; 
    const authHeader = { headers: {Authorization: '', 'Accept': 'application/json'}}; 
    return <MLSData base={statsbase} resource={resource} collection={collection} query={{ select, filter}} options={authHeader} {...rest} /> 
  }
}

class MLSStats extends Component {
  render() {
    const { resource = "Growth", collection, filter,select, ...rest } = this.props; 
    collection.toLowerCase() === 'markettrends'?'markettrends': 
    collection.toLowerCase() === 'KPI'?'markettrendslast90':
    (collection.toLowerCase() === 'member' || collection.toLowerCase() === 'office') ? 'agentproduction':'';    
    const authHeader = { headers: {Authorization: '', 'Accept': 'application/json'}}; 
    return <MLSData base={statsbase} resource={resource} collection={collection} query={{ select, filter}} options={authHeader} {...rest} /> 
  }
}

//end

class MLSData extends Component {
  render() {
    const { base = dbase, collection, token, link, resource = 'www', limit, processed = false, ...rest } = this.props;
    const authHeader = { headers: { Authorization: `Bearer ${token}`}};

    if (link) {
      return <OData baseUrl={link} options={authHeader} {...rest} />
    }

    if (collection.toLowerCase() === 'media' && !processed ) {
      return <MLSMedia collection={collection} resource={resource} token={token} {...rest} />
    }

    return <OData baseUrl={`${base}/${resource}/${collection}`} options={authHeader} {...rest} />
  }
}

export { MLSMedia, MLSCount,MLSGeography,MLSStats};
export default MLSData;