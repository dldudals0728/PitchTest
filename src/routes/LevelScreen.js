import { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import colorFactory from "../lib/colors";
import properties from "../lib/styles";
import { ProgressBar } from "../components/CustomProgressBar";

function LevelScreen({ navigation, route }) {
  const { keySignature, harmonic } = route.params;
  const [levelList, setLevelList] = useState([]);
  const selectLevel = (level) => {
    navigation.navigate("QuestionScreen_1", {
      keySignature,
      harmonic,
      level,
      userCorrectList: [],
    });
  };
  useEffect(() => {}, [levelList]);
  useEffect(() => {
    const levels = [
      {
        level: "level1",
        progress: 10,
      },
      {
        level: "level2",
        progress: 20,
      },
      {
        level: "level3",
        progress: 30,
      },
      {
        level: "level4",
        progress: 40,
      },
      {
        level: "level5",
        progress: 50,
      },
      {
        level: "level6",
        progress: 60,
      },
      {
        level: "level7",
        progress: 70,
      },
      {
        level: "level8",
        progress: 80,
      },
      {
        level: "level9",
        progress: 90,
      },
    ];

    setLevelList(levels);
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {keySignature} / {harmonic}
      </Text>
      <View style={styles.levelContainer}>
        {levelList.map((levelObject, idx) => {
          return (
            <View key={idx} style={{ width: "100%" }}>
              <View>
                <Text
                  style={styles.levelFont}
                  onPress={() => selectLevel(idx + 1)}
                >
                  {levelObject.level}
                </Text>
                {/* <Text style={styles.levelFont}>{levelObject.progress}</Text> */}
                <ProgressBar totalStep={100} nowStep={levelObject.progress} />
              </View>
            </View>
          );
        })}
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
    width: properties.containerWidth,
    marginRight: "6%",
    justifyContent: "space-around",
    alignItems: "center",
  },

  levelFont: {
    fontSize: 32,
    fontWeight: "700",
  },
});

export { LevelScreen };
