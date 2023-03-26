import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

function LevelScreen({ navigation, route }) {
  const { keySignature, harmonic } = route.params;
  const [levelList, setLevelList] = useState([]);
  const selectLevel = (level) => {
    navigation.navigate("QuestionScreen", {
      keySignature,
      harmonic,
      level,
    });
  };
  useEffect(() => {
    const levels = [
      "1단계",
      "2단계",
      "3단계",
      "4단계",
      "5단계",
      "6단계",
      "7단계",
      "8단계",
      "9단계",
    ];
    setLevelList(levels);
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {keySignature} / {harmonic}
      </Text>
      <View style={styles.levelContainer}>
        {levelList.map((level, idx) => (
          <Text
            key={idx}
            style={styles.levelFont}
            onPress={() => selectLevel(idx + 1)}
          >
            {level}: {(idx + 1) * 10}%
          </Text>
        ))}
      </View>
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

  title: {
    fontSize: 24,
    fontWeight: "600",
  },

  levelContainer: {
    height: "70%",
    justifyContent: "space-around",
    alignItems: "center",
  },

  levelFont: {
    fontSize: 32,
    fontWeight: "700",
  },
});

export { LevelScreen };
