import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { Audio } from "expo-av";

function QuestionScreen({ navigation, route }) {
  const { keySignature, harmonic, level } = route.params;
  const [multiple, setMultiple] = useState([]);
  const [answer, setAnswer] = useState(0);
  const [cMajorScaleSound, setCMajorScaleSound] = useState();
  const [answerSound, setAnswerSound] = useState();
  const [isCorrect, setIsCorrect] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const soundList = [
    require("../mp3/C4.mp3"),
    require("../mp3/D4.mp3"),
    require("../mp3/E4.mp3"),
    require("../mp3/F4.mp3"),
    require("../mp3/G4.mp3"),
    require("../mp3/A4.mp3"),
    require("../mp3/B4.mp3"),
    require("../mp3/C5.mp3"),
  ];
  const pitchList = ["도", "레", "미", "파", "솔", "라", "시"];

  const setAnswerAndMultipleChoice = () => {
    const randomList = [];
    for (let i = 0; i < 4; i++) {
      const randomIdx = Math.floor(Math.random() * 7);
      if (randomIdx === 0) {
        const isLow = Math.round(Math.random) === 0 ? false : true;
        if (isLow) {
          randomList.push(0);
        } else {
          randomList.push(7);
        }
      } else {
        randomList.push(randomIdx);
      }
    }

    const answerIdx = randomList[Math.floor(Math.random() * 4)];
    const multipleChoiceList = [];
    for (let i = 0; i < randomList.length; i++) {
      multipleChoiceList.push(pitchList[randomList[i]]);
    }

    setMultiple(multipleChoiceList);
    setAnswer(answerIdx);
  };

  const playCMajorScaleSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../mp3/C_Major_scale.mp3")
    );
    setCMajorScaleSound(sound);

    console.log("sound play.");
    await sound.playAsync();
  };

  const playAnswerSound = async (playUrl) => {
    const randomIdx = Math.floor(Math.random() * 8);
    console.log("randoma idx:", randomIdx);
    const { sound } = await Audio.Sound.createAsync(soundList[randomIdx]);
    setAnswerSound(sound);

    console.log("sound play.");
    await sound.playAsync();
  };

  const checkAnswer = (selectedPitch) => {
    setIsSelected(true);
    setIsCorrect(selectedPitch === multiple[answer]);
  };

  const getResult = () => {
    navigation.navigate("HearingResultScreen", {
      keySignature,
      harmonic,
      level,
      correctRate: 70,
    });
  };
  useEffect(() => {
    // const multipleList = ["파", "레", "미", "도"];
    // setMultiple(multipleList);
    setAnswerAndMultipleChoice();
  }, []);

  useEffect(() => {
    return cMajorScaleSound
      ? () => {
          cMajorScaleSound.unloadAsync();
          console.log("c major audio player is unloaded.");
        }
      : undefined;
  }, [cMajorScaleSound]);

  useEffect(() => {
    return answerSound
      ? () => {
          answerSound.unloadAsync();
          console.log("answer audio player is unloaded.");
        }
      : undefined;
  }, [answerSound]);

  useEffect(() => {
    playCMajorScaleSound();
    setTimeout(playAnswerSound, 3000);
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.currentMode}>
        {keySignature}: {harmonic}
      </Text>
      <View style={styles.multipleContainer}>
        <Text style={styles.levelTitle}>{level}단계</Text>
        {multiple.map((choice, idx) => (
          <Text
            key={idx}
            style={styles.multipleStyle}
            onPress={() => checkAnswer(choice)}
          >
            {idx + 1}. {choice}
          </Text>
        ))}
      </View>
      {isSelected ? (
        isCorrect ? (
          <View>
            <Text style={styles.correctText}>정답입니다!!</Text>
          </View>
        ) : (
          <View>
            <Text style={styles.wrongText}>오답입니다!!</Text>
          </View>
        )
      ) : (
        <View></View>
      )}
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

  multipleContainer: {
    width: "80%",
    height: "70%",
    // backgroundColor: "tomato",
    alignItems: "flex-start",
  },

  currentMode: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 12,
  },

  levelTitle: {
    fontSize: 24,
    fontWeight: "600",
  },

  multipleStyle: {
    fontSize: 28,
    fontWeight: "700",
  },

  correctText: {
    fontSize: 28,
    color: "blue",
  },

  wrongText: {
    fontSize: 28,
    color: "red",
  },
});

export { QuestionScreen };
