# React MLSData Component

A react component to simplify the use of MLS Data from the MLSListings Odata Server within an Application.

## Install 
```
npm install --save react-mlsdata
```

## Options
* collection - the collection you want to access example www, vow, public etc...
* resource - the resource you are trying to access examples property, agent, media etc..
* token - the authorization token from the mlslistings identity provider
* link - an odata link returned within the collection request

## Media
If you are accessing an item in the media resource there is some options you can pass to optimize your request
* ListingKeyNumeric - the integer value of the media resource for the listing you want to display it must be a number 
  example ListingKeyNumeric = {this.ListingKey} || ListingKeyNumeric = {1234456}
* MemberKeyNumeric - the integer value of the media resource for the agent you want to display it must be a number
* MediaType = defaults to Photo. You can pass thumbnail if you want a smaller image for display in a list

## Geography
To access geography information 

## Stats
If you are accessing statistics for a particular widget (Market Trends, Key PerformanceIndicators, Year to Year), you can pass the following options to optimize your request
* collection - member, office, markettrends, KPI, year-to-year
* select - Data to be selected for stats
* filter - criteria for selection



## Media Examples

### Property Thumbnail
```js
<MLSMedia MediaType="Thumbnail" ListingKeyNumeric={265403} limit="1" token={authtoken}>
  {({ loading, error, data }) => (
    <div>
      {error && 
        <img src="https://placeholdit.imgix.net/~text?txtsize=33&txt=Image%20Not%20Found&w=150&h=150" alt="Missing Image" />
      }
      {data &&
        <div>
          <Values data={data} />

          { !data.value.length &&
            <img src="https://placeholdit.imgix.net/~text?txtsize=33&txt=Image%20Not%20Found&w=150&h=150" alt="Missing Image" />
          }

          { data.value.length !== 0 &&
            <img src={data.value[0].MediaURL} alt="Thumbnail"/>
          }
        </div>
      }
    </div>
  )}
</MLSMedia>
```

### Agent Photo
```js
<MLSMedia MediaType="Thumbnail" MemberKeyNumeric={150591} limit="1" token={authtoken}>
  {({ loading, error, data }) => (
    <div>
      {error && 
        <img src="https://placeholdit.imgix.net/~text?txtsize=33&txt=Image%20Not%20Found&w=150&h=150" alt="Missing Image" />
      }
      {data &&
        <div>
          <Values data={data} />

          { !data.value.length &&
            <img src="https://placeholdit.imgix.net/~text?txtsize=33&txt=Image%20Not%20Found&w=150&h=150" alt="Missing Image" />
          }

          { data.value.length !== 0 &&
            <img src={data.value[0].MediaURL} alt="Thumbnail"/>
          }
        </div>
      }
    </div>
  )}
</MLSMedia>
```


## MLSCount
A simplified interface for retrieving the count for any query. Simply pass the same query and filters to MLSCount component. 
It will in a declarative form return a count for the query which can the be used to display number of results or to build 
a pagination element 

## MLSCount Example

```js

class Pagination extends Component {
  render() {
    console.log(this.props.data["@odata.count"]);
    return <div />;
  }
}

<MLSCount collection="Property" token={authtoken}>
  {({ data }) => (
    <div>
      { data &&
      <Pagination data={data} />
    }
    </div>
  )}
</MLSCount>
```

## Usage
### Import
```js
import MLSData from 'react-mlsdata';
```
### Basic
```js
import React from "react";
import MLSData from "react-mlsdata";

class Values extends React.Component {
  render() {
    console.log(this.props.data);

    return <div />;
  }
}

class Listings extends React.Component {
  render() {
    const { listings } = this.props;

    var listingCollection = listings.map(listing => (
      <li key={Math.floor(Math.random() * Date.now()) + 1}>
        {listing.ListingId}
      </li>
    ));

    return <ul>{listingCollection}</ul>;
  }
}

class Count extends React.Component {
  render() {
    return (
      <h3>
        <strong>
          {this.props.data.length} Listings Retrieved
        </strong>
      </h3>
    );
  }
}

const tempToken = "your bearer token";

const App = () => (
  <div>
    <MLSData collection="Property" token={tempToken}>
      {({ loading, error, data }) => (
        <div>

          {loading && <h2>{`${loading}`}</h2>}

          {error && <h2>{error.message}</h2>}

          {data &&
            <div>

              <Values data={data} />
              <Count data={data.value}/>

              <Listings listings={data.value} />

            </div>
          }

        </div>
      )}

    </MLSData>
  </div>
);

export default App;

``` 
- See [react-odata](https://github.com/techniq/react-odata) for additional options