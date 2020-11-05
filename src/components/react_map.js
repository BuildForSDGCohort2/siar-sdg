import React, { Component } from "react";
import Geocode from "react-geocode";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import config from "../config.json";
const key = config.api_key;
const mapStyles = {
  width: "100%",
  height: "400px",
  display: "block",
};

class ReactMap extends Component {
  constructor(props) {
    super();
    this.state = {
      name: "React",
      center: props.location,
      zoom: props.zoom,
    };
    this.mapRef = React.createRef();
    Geocode.setApiKey(key);
    Geocode.setLanguage("en");
    Geocode.setRegion("tz");
    this.handleClick = this.handleClick.bind(this);
    this.handleCenterChange = this.handleCenterChange.bind(this);
  }
  handleCenterChange(t, map, event) {
    let center = map.getCenter();

    console.log("center changed: ", center);
  }
  handleClick(t, map, coord) {
    console.log("map clicked ", coord);
    const { latLng } = coord;
    const center = { lat: latLng.lat(), lng: latLng.lng() };
    this.setState({ center: center }, () => {
      map.panTo(latLng);
      Geocode.fromLatLng(center.lat, center.lng).then((response) => {
        let address = response.results[0].address_components;
        console.log("address: ", address);
        let full_address =
          address[0].long_name +
          ", " +
          address[2].long_name +
          ", " +
          address[3].long_name;
        this.props.onUpdateLocation(center, full_address);
      });
    });
  }
  componentDidMount() {
    console.log("center: ", this.state.center);
    if (this.props.locationChanged) {
      this.mapRef.current.setCenter(this.state.center);
    }
  }
  componentDidUpdate(prevProps) {
    console.log("componentdidupdate: ", prevProps.location);
    if (prevProps.location !== this.state.center) {
      this.setState({ center: this.props.location }, () => {});
    }
  }
  render() {
    return (
      <div style={mapStyles}>
        <Map
          ref={this.mapRef}
          onClick={this.handleClick}
          google={this.props.google}
          zoom={this.state.zoom}
          style={mapStyles}
          initialCenter={this.props.location}
          center={this.state.center}
          onCenterChanged={this.handleCenterChange}
        >
          <Marker
            onClick={this.onMarkerClick}
            name={this.props.address}
            title={this.props.address}
            position={this.state.center}
          />
          <InfoWindow visible={true}>
            <div>
              <h1>{this.props.address}</h1>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: key,
  region: "tz",
})(ReactMap);
