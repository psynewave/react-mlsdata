import React from "react";
import MLSData from "../../src";
import { authtoken } from "./_config.js";

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

const App = () => (
  <div>
    <MLSData collection="Property" token={authtoken}>
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
