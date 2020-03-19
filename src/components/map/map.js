// imports
import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import "./map.css";

// marker
const Marker = ({ text, img, alt}) =>
    <div className="petshop">
        <img src={img} className="shop-type" alt={alt}/>
        <p className="petshop__paragraph">{text}</p>
    </div>;

// google map
class Map extends Component{
    render() {
        return (
            // Important! Always set the container height explicitly
            <section className="" style={{ height: '400px', width: '100%' }}>
               {console.log(this.props.center)}
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyDekix-WZVnkxonFSnt2plghhrh1jUjHvg" }}
                    defaultCenter={this.props.centerMap}
                    defaultZoom={this.props.zoom}
                >
                 {this.props.markers.map((item, index) => {
                    return <Marker key={index} {...item}/>
                 })}
                </GoogleMapReact>
            </section>
        );
    }
}

export default Map;