import React, { useState } from "react";
import { Alert, View, StyleSheet, Image, Text } from "react-native";
import colors from "../constants/colors";
import CustomButton from "./CustomButton";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

const ImgPicker = (props) => {
  const [pickedImage, setPickedImage] = useState();

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    );

    if (result.status !== "granted") {
      Alert.alert(
        "Permissions denied!",
        "You need to grant camera permissions to use this app.",
        [{ text: "OK" }]
      );
      return false;
    }

    return true;
  };

  const handleImageTake = async () => {
    const hasPermissions = await verifyPermissions();
    if (!hasPermissions) {
      return;
    }

    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [9, 9],
      quality: 0.5,
    });

    setPickedImage(image.uri);
    props.onImageSelect(image.uri);
  };

  return (
    <View style={[styles.imagePicker, props.style]}>
      <View style={styles.imagePreview}>
        {!pickedImage ? (
          <Text>No image picked yet.</Text>
        ) : (
          <Image source={{ uri: pickedImage }} style={styles.image} />
        )}
      </View>
      <CustomButton
        title="Take image"
        color={colors.primary}
        onPress={handleImageTake}
        style={styles.btn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    width: "100%",
    alignItems: "center",
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 2,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  btn: {
    width: "100%",
  },
});

export default ImgPicker;
