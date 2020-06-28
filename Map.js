import React, { useEffect, useState } from "react";
import { StyleSheet, View, Button } from "react-native";
import MapboxGL from "@react-native-mapbox-gl/maps";
import { featureCollection, lineString } from '@turf/helpers';

import features from './line.json'

MapboxGL.setAccessToken('pk.eyJ1IjoibHVrZW1jZ3JlZ29yIiwiYSI6ImNrNnU0ZjR5ZDA2NjUzZnIzcmdudjFwMm0ifQ.bZ2WT_Y04Ba8n3ROj0HWvQ');
MapboxGL.setTelemetryEnabled(false);

const styles = {
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  container: {
    height: 300,
    width: 300,
  },
  map: {
    flex: 1
  },
  trail: {
    lineColor: ['get', 'color'],
    lineWidth: ['match', ['get', 'width'], 'wide', 4, 2],
  },
  trailBorder: {
    lineColor: 'white',
    lineWidth: ['match', ['get', 'width'], 'wide', 2, 1],
    lineGapWidth: ['match', ['get', 'width'], 'wide', 4, 2],
  },
  trailBorderShadow: {
    lineColor: '#000',
    lineBlur: 15,
    lineWidth: ['match', ['get', 'width'], 'wide', 5, 3],
    lineGapWidth: ['match', ['get', 'width'], 'wide', 2, 1],
  },
};
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

const App = () => {
    const [style2, setStyle2] = useState(false);

    return (
      <View style={styles.page}>
        <View style={styles.container}>
          <MapboxGL.MapView style={styles.map} styleURL={style2 ? "http://10.1.7.13:3333/style2.json" : "http://10.1.7.13:3333/style.json"} >
          <MapboxGL.Camera
            centerCoordinate={[175,-39]}
            zoomLevel={5.5}
            />
            <MapboxGL.ShapeSource id="icons" shape={features}>

            <MapboxGL.ShapeSource
        id="trail-source"
        shape={features}
      />
      <MapboxGL.LineLayer
        id="trail-fill"
        sourceID="trail-source"
        belowLayerID="events-background-layer"
        style={styles.trail}
        filter={['get', 'current']}
      />
      <MapboxGL.LineLayer
        id="trail-border"
        sourceID="trail-source"
        belowLayerID="trail-fill"
        style={styles.trailBorder}
        filter={['get', 'current']}
      />
      <MapboxGL.LineLayer
        id="trail-border-shadow"
        sourceID="trail-source"
        belowLayerID="trail-border"
        style={styles.trailBorderShadow}
        filter={['get', 'current']}
      />
            </MapboxGL.ShapeSource>
          </MapboxGL.MapView>
        </View>
        <Button title="swap" onPress={()=>setStyle2(!style2)} />
      </View>
    );
  }

export default App;
