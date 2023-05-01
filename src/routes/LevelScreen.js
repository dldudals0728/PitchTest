import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import colorFactory from "../lib/colors";
import properties from "../lib/styles";
import { ProgressBar } from "../components/CustomProgressBar";

function LevelScreen({ navigation, route }) {
  const { keySignature, currentHarmonic } = route.params;
  const [levelList, setLevelList] = useState([]);
  const selectLevel = (level) => {
    navigation.navigate("QuestionScreen_1", {
      keySignature,
      harmonic: currentHarmonic,
      level,
      userCorrectList: [],
    });
  };
  useEffect(() => {}, [levelList]);
  useEffect(() => {
    const levels = [
      {
        level: 0,
        progress: 0,
      },
      {
        level: 1,
        progress: 10,
      },
      {
        level: 2,
        progress: 20,
      },
      {
        level: 3,
        progress: 30,
      },
      {
        level: 4,
        progress: 40,
      },
      {
        level: 5,
        progress: 50,
      },
      {
        level: 6,
        progress: 60,
      },
      {
        level: 7,
        progress: 70,
      },
      {
        level: 8,
        progress: 80,
      },
      {
        level: 9,
        progress: 90,
      },
      {
        level: 10,
        progress: 100,
      },
    ];

    setLevelList(levels);
  }, []);
  console.log(
    "keySignature:",
    keySignature,
    "currentHarmonic:",
    currentHarmonic
  );
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>
        {keySignature} / {harmonic}
      </Text> */}
      <Image
        source={require("../../assets/ptichTestLogo.png")}
        style={{ height: 92, resizeMode: "contain", marginBottom: 20 }}
      />
      <View style={styles.levelContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ width: "100%" }}
          contentContainerStyle={{ alignItems: "center" }}
        >
          {levelList.map((levelObject, idx) => {
            return (
              <TouchableOpacity
                key={idx}
                style={{
                  ...styles.levelCard,
                  opacity: levelObject.progress === 0 ? 0.5 : 1,
                }}
                onPress={() => selectLevel(idx)}
              >
                <Text style={styles.levelFont}>Lv. {levelObject.level}</Text>
                {/* <Text style={styles.levelFont}>{levelObject.progress}</Text> */}
                <ProgressBar
                  showText={true}
                  totalStep={100}
                  nowStep={levelObject.progress}
                  progressDirection="숙련도 "
                  barHeight={20}
                  description="도전하기!"
                  minProgress={3}
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
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

  title: {
    fontSize: 24,
    fontWeight: "600",
  },

  levelContainer: {
    height: "70%",
    width: "92%",
  },

  levelCard: {
    backgroundColor: colorFactory.cardBackgroundColor,
    width: "96%",
    padding: 10,
    marginBottom: 20,
    ...properties.viewBoxShadow,
  },

  levelFont: {
    fontSize: 32,
    fontWeight: "700",
    color: "white",
    marginBottom: 12,
  },
});

export { LevelScreen };
