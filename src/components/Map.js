import React from 'react'
import { GoogleApiWrapper } from 'google-maps-react';

export class MapContainer extends React.Component {}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyDXmkGiJRNQ-u-ZtgnSBQu7efSCD0g7Sww'
})(MapContainer)