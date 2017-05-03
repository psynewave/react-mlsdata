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
* ListingKeyNumeric = the integer value of the media resource you are looking for note this has to be passed as a number example ListingKeyNumeric = {this.ListingKey} || ListingKeyNumeric = {1234456}
* MediaType = defaults to Photo. You can pass thumbnail if you want a smaller image for display in a list

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