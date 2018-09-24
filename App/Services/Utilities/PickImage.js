import { ImagePicker, Permissions } from "expo";

const pickImage = async callback => {
  const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  if (status !== "granted") {
    console.warn("Permission to access camera was denied");
  }
  const result = await ImagePicker.launchImageLibraryAsync();
  if (!result.cancelled) {
    callback(result.uri);
  }
  return null;
};

export default pickImage;
