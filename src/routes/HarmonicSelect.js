import { StyleSheet, Text, View } from "react-native";
import colorFactory from "../lib/colors";

function HarmonicSelect({ navigation, route }) {
  const { keySignature } = route.params;
  const selectHarmonic = (harmonic) => {
    navigation.navigate("LevelScreen", {
      keySignature,
      harmonic,
    });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.selectedKeySignature}>
        선택된 조표: {keySignature}
      </Text>
      <View style={styles.harmonicContainer}>
        <Text
          style={styles.harmonicButton}
          onPress={() => selectHarmonic("단음계")}
        >
          단음계
        </Text>
        <Text
          style={styles.harmonicButton}
          onPress={() => selectHarmonic("이중음계")}
        >
          이중음계
        </Text>
        <Text
          style={styles.harmonicButton}
          onPress={() => selectHarmonic("삼중음계")}
        >
          삼중음계
        </Text>
        <Text
          style={styles.harmonicButton}
          onPress={() => selectHarmonic("사중음계")}
        >
          사중음계
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorFactory.backgroundColor,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  harmonicContainer: {
    height: "70%",
    // backgroundColor: "tomato",
    justifyContent: "space-around",
    alignItems: "center",
    textAlign: "center",
  },

  selectedKeySignature: {
    fontSize: 32,
    fontWeight: "600",
  },

  harmonicButton: {
    fontSize: 32,
    fontWeight: "400",
  },
});

export { HarmonicSelect };
