import { useEffect, useRef, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { Audio } from "expo-av";

function QuestionScreen({ navigation, route }) {
  const { keySignature, harmonic, level } = route.params;
  const [multiple, setMultiple] = useState([]);
  const [cMajorScaleSound, setCMajorScaleSound] = useState();
  const [answerSound, setAnswerSound] = useState();
  const [selectedSound, setSelectedSound] = useState();
  const [isCorrect, setIsCorrect] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const answer = useRef();
  const pitchList = [
    {
      scale: "도",
      soundSource: require("../mp3/C4.mp3"),
    },
    {
      scale: "레",
      soundSource: require("../mp3/D4.mp3"),
    },
    {
      scale: "미",
      soundSource: require("../mp3/E4.mp3"),
    },
    {
      scale: "파",
      soundSource: require("../mp3/F4.mp3"),
    },
    {
      scale: "솔",
      soundSource: require("../mp3/G4.mp3"),
    },
    {
      scale: "라",
      soundSource: require("../mp3/A4.mp3"),
    },
    {
      scale: "시",
      soundSource: require("../mp3/B4.mp3"),
    },
    {
      scale: "도",
      soundSource: require("../mp3/C5.mp3"),
    },
  ];

  const setAnswerAndMultipleChoice = () => {
    const randomList = [];
    let i = 0;
    while (true) {
      if (i === 4) {
        break;
      }
      const randomIdx = Math.floor(Math.random() * 8);
      if (randomList.indexOf(randomIdx) < 0) {
        randomList.push(randomIdx);
        i++;
      }
    }
    const choiceAnswer = randomList[Math.floor(Math.random() * 4)];
    console.log("랜덤 리스트:", randomList);
    console.log("정답:", choiceAnswer);
    answer.current = choiceAnswer;

    setMultiple(randomList);
  };

  const playCMajorScaleSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../mp3/C_Major_scale.mp3")
    );
    setCMajorScaleSound(sound);

    await sound.playAsync();
  };

  const playAnswerSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      pitchList[answer.current].soundSource
    );
    console.log(`정답 index: '${answer.current}'`);
    console.log(`정답은 '${pitchList[answer.current].scale}' 입니다.`);
    setAnswerSound(sound);

    await sound.playAsync();
  };

  const playSelectedSound = async (playIdx) => {
    const { sound } = await Audio.Sound.createAsync(
      pitchList[playIdx].soundSource
    );
    setSelectedSound(sound);

    await sound.playAsync();
  };

  const checkAnswer = (selectedPitch) => {
    setIsSelected(true);
    setIsCorrect(selectedPitch === answer.current);
    playSelectedSound(selectedPitch);
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
    playCMajorScaleSound();
    setTimeout(playAnswerSound, 3000);
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
    return selectedSound
      ? () => {
          selectedSound.unloadAsync();
          console.log("answer audio player is unloaded.");
        }
      : undefined;
  }, [selectedSound]);
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
            {idx + 1}. {pitchList[choice].scale}
          </Text>
        ))}
      </View>
      <View>
        <Button
          title="paly scale"
          onPress={() => playCMajorScaleSound()}
        ></Button>
        <Button title="paly answer" onPress={() => playAnswerSound()}></Button>
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
