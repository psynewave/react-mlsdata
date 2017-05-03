import React, { Component } from "react";
import MLSData from "../../src";
import { authtoken } from "./_config.js";

class Values extends Component {
  render() {
    console.log(this.props.data);

    return <div />;
  }
}

class Thumbnail extends Component {
  render() {
    return (
      <MLSData resource="public" collection="Media" MediaType="Thumbnail" ListingKeyNumeric={2654039} limit="1" token={authtoken}>
        {({ loading, error, data }) => (
          <div>
            {data &&
              <div>
                <Values data={data} />
                <img src={data.value[0].MediaURL} alt="Thumbnail"/>
              </div>
            }
          </div>
        )}
      </MLSData>
    )

  }
}

class Listings extends Component {
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

class Count extends Component {
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
              <Thumbnail />
              <Listings listings={data.value} />

            </div>
          }

        </div>
      )}

    </MLSData>
  </div>
);

export default App;
