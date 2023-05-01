import { StatusBar } from "expo-status-bar";
import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import colorFactory from "../lib/colors";
import properties from "../lib/styles";
import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

/**
 * @description KS: KeySignature / 조표
 */

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");
function MainScreen({ navigation }) {
  const [KSSelectModalVisible, setKSSelectModalVisible] = useState(false);
  const [currentHarmonic, setCurrentHarmonic] = useState("");
  const showKSModal = (KSMode) => {
    setCurrentHarmonic(KSMode);
    setKSSelectModalVisible(true);
  };
  const selectKS = (keySignature) => {
    navigation.navigate("LevelScreen", {
      currentHarmonic,
      keySignature,
    });
    setKSSelectModalVisible(false);
  };
  return (
    <View style={styles.container}>
      <Modal
        visible={KSSelectModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => console.log("close")}
      >
        <Pressable
          style={{
            flex: 1,
            // "transparent"는 backgroundColor의 default값으로, 배경색이 없다.
            backgroundColor: "rgba(255, 255, 255, 0.5)",
          }}
          onPress={() => setKSSelectModalVisible(false)}
        />
        <View
          style={{
            flex: 1,
            justifyContent: "space-around",
            alignItems: "center",
            position: "absolute",
            top: SCREEN_HEIGHT * 0.25,
            left: SCREEN_WIDTH * 0.1,
            height: SCREEN_HEIGHT * 0.5,
            width: SCREEN_WIDTH * 0.8,
            borderRadius: 15,
            backgroundColor: "aliceblue",
            borderColor: "skyblue",
            borderWidth: 2,
          }}
        >
          <TouchableOpacity
            style={styles.KSViewStyle}
            onPress={() => selectKS("natural")}
          >
            <View>
              <MaterialCommunityIcons
                name="music-accidental-natural"
                size={64}
                color="black"
              />
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.subTextStyle}>기본음 정복하기!</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.KSViewStyle}
            onPress={() => selectKS("sharp")}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "50%",
              }}
            >
              <MaterialCommunityIcons
                name="music-accidental-natural"
                size={64}
                color="black"
              />
              <MaterialCommunityIcons
                name="plus-thick"
                size={32}
                style={{ fontWeight: "700" }}
                color="black"
              />
              <MaterialCommunityIcons
                name="music-accidental-sharp"
                size={64}
                color="black"
              />
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.subTextStyle}>샵 음정을 함께 들어요!</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.KSViewStyle}
            onPress={() => selectKS("flat")}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "50%",
              }}
            >
              <MaterialCommunityIcons
                name="music-accidental-natural"
                size={64}
                color="black"
              />
              <MaterialCommunityIcons
                name="plus-thick"
                size={32}
                style={{ fontWeight: "700" }}
                color="black"
              />
              <MaterialCommunityIcons
                name="music-accidental-flat"
                size={64}
                color="black"
              />
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.subTextStyle}>플랫 음정을 함께 들어요!</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
      <View style={styles.keySignatureContainer}>
        <Image
          source={require("../../assets/ptichTestLogo.png")}
          style={{ height: "16%", resizeMode: "contain" }}
        />
        <View style={{ ...styles.subContainer, alignItems: "flex-end" }}>
          <TouchableOpacity
            style={styles.mainCard}
            onPress={() => showKSModal("single")}
          >
            <Text style={styles.keySignatureStyle}>단음</Text>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.subTextStyle}>한음 한음 천천히!</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.mainCard}
            onPress={() => showKSModal("double")}
          >
            <Text style={styles.keySignatureStyle}>2화음</Text>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.subTextStyle}>두 가지 음을 한번에!</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.subContainer}>
          <TouchableOpacity
            style={{
              ...styles.mainCard,
              ...styles.viewShadow,
              flex: 1,
              height: "60%",
              marginBottom: "10%",
            }}
            onPress={() => showKSModal("triple")}
          >
            <Text style={styles.keySignatureStyle}>3화음</Text>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.subTextStyle}>
                3화음으로 이루어진 코드를 들어보자 !
              </Text>
            </View>
          </TouchableOpacity>
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

  KSViewStyle: {
    width: "80%",
    height: "24%",
    backgroundColor: colorFactory.cardBackgroundColor,
    justifyContent: "space-between",
    padding: 10,
    ...properties.viewBoxShadow,
  },

  keySignatureStyle: {
    fontSize: 36,
    fontWeight: "800",
    color: "#000",
  },

  mainCard: {
    backgroundColor: colorFactory.cardBackgroundColor,
    width: "46%",
    height: "60%",
    padding: 10,
    justifyContent: "space-between",
    ...properties.viewBoxShadow,
  },

  subTextStyle: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
});

export { MainScreen };
