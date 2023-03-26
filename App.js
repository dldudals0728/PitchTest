import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { HarmonicSelect } from "./src/routes/HarmonicSelect";
import { HearingResultScreen } from "./src/routes/HearingResultScreen";
import { LevelScreen } from "./src/routes/LevelScreen";
import { Loading } from "./src/routes/Loading";
import { MainScreen } from "./src/routes/MainScreen";
import { QuestionScreen } from "./src/routes/QuestionScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen name="HarmonicSelect" component={HarmonicSelect} />
        <Stack.Screen name="LevelScreen" component={LevelScreen} />
        <Stack.Screen name="QuestionScreen" component={QuestionScreen} />
        <Stack.Screen
          name="HearingResultScreen"
          component={HearingResultScreen}
        />
        {/* <Stack.Screen name="Loading" component={Loading} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
