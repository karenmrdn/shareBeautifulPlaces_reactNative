import React from "react";
import { Image, StyleSheet, ScrollView, Text, View } from "react-native";
import { useSelector } from "react-redux";
import MapPreview from "../components/MapPreview";
import colors from "../constants/colors";

const PlaceDetailScreen = (props) => {
  const placeId = props.navigation.getParam("placeId");
  const selectedPlace = useSelector((state) =>
    state.places.places.find((place) => place.id === placeId)
  );

  const selectedLocation = { lat: selectedPlace.lat, lng: selectedPlace.lng };

  const handleMapPreviewPress = () => {
    props.navigation.navigate("Map", {
      readonly: true,
      initialLocation: selectedLocation,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.wrapper}>
      <Image source={{ uri: selectedPlace.imageUri }} style={styles.image} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{selectedPlace.address}</Text>
        </View>
        <MapPreview
          onPress={handleMapPreviewPress}
          location={selectedLocation}
          style={styles.mapPreview}
        />
      </View>
    </ScrollView>
  );
};

PlaceDetailScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam("placeTitle"),
  };
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
  },
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
    backgroundColor: "#ccc",
  },
  locationContainer: {
    marginVertical: 20,
    width: "90%",
    maxWidth: 350,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 10,
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: colors.primary,
    textAlign: "center",
    fontWeight: "bold",
  },
  mapPreview: {
    width: "100%",
    maxWidth: 350,
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});

export default PlaceDetailScreen;
