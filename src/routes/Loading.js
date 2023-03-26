import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

function Loading() {
  return (
    <View>
      <Text>is Loading routes.</Text>
      <StatusBar style="white" />
    </View>
  );
}

export { Loading };
