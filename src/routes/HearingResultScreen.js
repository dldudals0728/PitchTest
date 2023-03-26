import { StyleSheet, Text, View } from "react-native";

function HearingResultScreen({ navigation, route }) {
  const { keySignature, harmonic, level, correctRate } = route.params;
  return (
    <View style={styles.container}>
      <Text>시험 결과</Text>
      <Text>
        난이도: {keySignature} / {harmonic} - {level}단계
      </Text>
      <Text>정답률: {correctRate}%</Text>
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
});

export { HearingResultScreen };
