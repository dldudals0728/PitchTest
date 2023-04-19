import { useEffect, useRef, useState } from "react";
import {
  Button,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Audio } from "expo-av";
import colorFactory from "../lib/colors";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

function QuestionScreen({ navigation, route }) {
  const { keySignature, harmonic, level, userCorrectList } = route.params;
  const [multiple, setMultiple] = useState([]);
  const [cMajorScaleSound, setCMajorScaleSound] = useState();
  const [answerSound, setAnswerSound] = useState();
  const [selectedSound, setSelectedSound] = useState();
  const [isCorrect, setIsCorrect] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [resultModalVisible, setResultModalVisible] = useState(false);
  const answer = useRef();
  answer.current = 0;
  console.log(`userCorrectList: ${userCorrectList}`);
  const levelRange = [
    null,
    { rangeMin: 1, rangeMax: 2 },
    { rangeMin: 1, rangeMax: 2 },
    { rangeMin: 1, rangeMax: 2 },
    { rangeMin: 2, rangeMax: 3 },
    { rangeMin: 1, rangeMax: 3 },
    { rangeMin: 0, rangeMax: 1 },
    { rangeMin: 0, rangeMax: 2 },
    { rangeMin: 0, rangeMax: 3 },
    { rangeMin: 0, rangeMax: 3 },
  ];
  const scaleRange = levelRange[level];
  const pitchList = [
    {
      scale: "도",
      soundSource: [
        require("../mp3/C/C3.mp3"),
        require("../mp3/C/C4.mp3"),
        require("../mp3/C/C5.mp3"),
        require("../mp3/C/C6.mp3"),
      ],
    },
    {
      scale: "레",
      soundSource: [
        require("../mp3/D/D3.mp3"),
        require("../mp3/D/D4.mp3"),
        require("../mp3/D/D5.mp3"),
      ],
    },
    {
      scale: "미",
      soundSource: [
        require("../mp3/E/E3.mp3"),
        require("../mp3/E/E4.mp3"),
        require("../mp3/E/E5.mp3"),
      ],
    },
    {
      scale: "파",
      soundSource: [
        require("../mp3/F/F3.mp3"),
        require("../mp3/F/F4.mp3"),
        require("../mp3/F/F5.mp3"),
      ],
    },
    {
      scale: "솔",
      soundSource: [
        require("../mp3/G/G3.mp3"),
        require("../mp3/G/G4.mp3"),
        require("../mp3/G/G5.mp3"),
      ],
    },
    {
      scale: "라",
      soundSource: [
        require("../mp3/A/A3.mp3"),
        require("../mp3/A/A4.mp3"),
        require("../mp3/A/A5.mp3"),
      ],
    },
    {
      scale: "시",
      soundSource: [
        require("../mp3/B/B3.mp3"),
        require("../mp3/B/B4.mp3"),
        require("../mp3/B/B5.mp3"),
      ],
    },
  ];

  const setAnswerAndMultipleChoice = () => {
    const randomList = [];
    let i = 0;
    while (true) {
      if (i === 4) {
        break;
      }
      const randomIdx = Math.floor(Math.random() * 7);
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
      answer.current === 0
        ? pitchList[answer.current].soundSource[
            Math.floor(
              Math.random() * (scaleRange.rangeMax - scaleRange.rangeMin) +
                scaleRange.rangeMin
            )
          ]
        : pitchList[answer.current].soundSource[
            Math.floor(
              Math.random() * (scaleRange.rangeMax - 1 - scaleRange.rangeMin) +
                scaleRange.rangeMin
            )
          ]
    );
    console.log(`정답 index: '${answer.current}'`);
    console.log(`정답은 '${pitchList[answer.current].scale}' 입니다.`);
    setAnswerSound(sound);

    await sound.playAsync();
  };

  const playSelectedSound = async (playIdx) => {
    const { sound } = await Audio.Sound.createAsync(
      pitchList[playIdx].soundSource[0]
    );
    setSelectedSound(sound);

    await sound.playAsync();
  };

  const checkAnswer = (selectedPitch) => {
    setIsSelected(true);
    setIsCorrect(selectedPitch === answer.current);
    userCorrectList.push(selectedPitch === answer.current);
    setResultModalVisible(true);
    // playSelectedSound(selectedPitch);
  };

  const nextQuestion = () => {
    setResultModalVisible(false);
    navigation.navigate(`QuestionScreen_${userCorrectList.length + 1}`, {
      keySignature,
      harmonic,
      level,
      userCorrectList,
    });
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
      <Modal
        visible={resultModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => console.log("close")}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: SCREEN_HEIGHT * 0.35,
            left: SCREEN_WIDTH * 0.1,
          }}
        >
          <View
            style={{
              height: SCREEN_HEIGHT * 0.3,
              width: SCREEN_WIDTH * 0.8,
              borderRadius: 15,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(58, 58, 58, 0.3)",
            }}
          >
            <View>
              {isCorrect ? (
                <View>
                  <Text style={styles.correctText}>정답!!</Text>
                </View>
              ) : (
                <View>
                  <Text style={styles.wrongText}>오답!!</Text>
                </View>
              )}
              <View>
                <Text>{`정답: ${
                  pitchList !== undefined && answer !== undefined
                    ? pitchList[answer.current].scale
                    : "???"
                }`}</Text>
              </View>
            </View>
            <View>
              <Button title="Next" onPress={nextQuestion} />
            </View>
          </View>
        </View>
      </Modal>
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
