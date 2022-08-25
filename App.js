import { View, StatusBar } from "react-native";
import Main from "./src/Main";

export default function App() {
  return (
    <View>
      <StatusBar barStyle="auto" />
      <Main />
    </View>
  );
}
