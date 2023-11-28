import axios from "axios";
import * as SecureStore from "expo-secure-store";

export default async function () {
  const authToken = await SecureStore.getItemAsync(token);
  axios.create({
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
}
