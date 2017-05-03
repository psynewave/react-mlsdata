import React, { Component } from "react";
import MLSData, { MLSMedia } from "../../src";
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
