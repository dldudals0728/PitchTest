import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View } from "react-native";
import colorFactory from "../lib/colors";
import properties from "../lib/styles";

function MainScreen({ navigation }) {
  const selectKeySignature = (keySignature) => {
    console.log(keySignature);
    navigation.navigate("HarmonicSelect", {
      keySignature,
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.keySignatureContainer}>
        {/* <Text style={styles.title}>Title</Text> */}
        <Image
          source={require("../../assets/ptichTestLogo.png")}
          style={{ height: "16%", resizeMode: "contain" }}
        />
        <View style={{ ...styles.subContainer, alignItems: "flex-end" }}>
          <View style={styles.mainCard}>
            <Text
              style={styles.keySignatureStyle}
              onPress={() => selectKeySignature("네츄럴")}
            >
              단음
            </Text>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={{ color: "#FFF" }}>한음 한음 천천히!</Text>
            </View>
          </View>
          <View style={styles.mainCard}>
            <Text
              style={styles.keySignatureStyle}
              onPress={() => selectKeySignature("네츄럴 + 샵")}
            >
              2화음
            </Text>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={{ color: "#FFF" }}>두 가지 음을 한번에!</Text>
            </View>
          </View>
        </View>
        <View style={styles.subContainer}>
          <View
            style={{
              ...styles.mainCard,
              flex: 1,
              height: "60%",
              marginBottom: "10%",
            }}
          >
            <Text
              style={styles.keySignatureStyle}
              onPress={() => selectKeySignature("네츄럴 + 플랫")}
            >
              3화음
            </Text>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={{ color: "#FFF" }}>
                3화음으로 이루어진 코드를 들어보자 !
              </Text>
            </View>
          </View>
        </View>
        <Text style={{ marginTop: 20, fontSize: 18, fontWeight: "700" }}>
          트레이닝이 필요한 곳을 선택하세요!
        </Text>
      </View>
      <StatusBar style="auto" />
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

  keySignatureContainer: {
    height: "70%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginBottom: 40,
  },

  subContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    height: "40%",
  },

  title: {
    fontSize: 48,
    fontWeight: "800",
  },

  keySignatureStyle: {
    fontSize: 36,
    fontWeight: "800",
    color: "#FFF",
  },

  mainCard: {
    backgroundColor: colorFactory.cardBackgroundColor,
    width: "46%",
    height: "60%",
    shadowColor: "black",
    shadowOffset: {
      height: 5,
      width: 4,
    },
    shadowOpacity: 0.3,
    padding: 10,

    justifyContent: "space-between",
  },
});

export { MainScreen };
