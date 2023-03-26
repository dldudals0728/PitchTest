import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

function MainScreen({ navigation }) {
  const selectKeySignature = (keySignature) => {
    console.log(keySignature);
    navigation.navigate("HarmonicSelect", {
      keySignature,
    });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Title</Text>
      <View style={styles.keySignatureContainer}>
        <Text
          style={styles.keySignatureStyle}
          onPress={() => selectKeySignature("네츄럴")}
        >
          네츄럴
        </Text>
        <Text
          style={styles.keySignatureStyle}
          onPress={() => selectKeySignature("네츄럴 + 샵")}
        >
          네츄럴 + 샵
        </Text>
        <Text
          style={styles.keySignatureStyle}
          onPress={() => selectKeySignature("네츄럴 + 플랫")}
        >
          네츄럴 + 플랫
        </Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "teal",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  keySignatureContainer: {
    height: "70%",
    // backgroundColor: "tomato",
    justifyContent: "space-around",
    alignItems: "center",
    textAlign: "center",
  },

  title: {
    fontSize: 48,
    fontWeight: "600",
  },

  keySignatureStyle: {
    fontSize: 32,
    fontWeight: "400",
  },
});

export { MainScreen };
