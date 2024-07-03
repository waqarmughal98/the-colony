import * as Font from "expo-font";

export default useFonts = async () =>
  await Font.loadAsync({
    "Sommet-Black": require("../../assets/fonts/SommetRoundedBlack.otf"),
    "Sommet-Regular": require("../../assets/fonts/SommetRoundedRegular.otf"),
  });
