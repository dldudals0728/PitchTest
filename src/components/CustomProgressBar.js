import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import colorFactory from "../lib/colors";

function ProgressBar({ totalStep, nowStep }) {
  const loadValue = useRef(new Animated.Value(0)).current;

  const load = (count) => {
    Animated.timing(loadValue, {
      toValue: (count / totalStep) * 100,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const width = loadValue.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
    extrapolate: "clamp",
  });

  useEffect(() => {
    load(nowStep);
  }, [nowStep]);

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        // justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={styles.bar}>
        <Animated.View
          style={{
            backgroundColor: colorFactory.progressColor,
            // backgroundColor: "tomato",
            width,
            height: 10,
            borderTopRightRadius: 2,
            borderBottomRightRadius: 2,
          }}
        />
      </View>
      <Text style={styles.step}>{(nowStep / totalStep) * 100}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    width: "100%",
    height: 10,
    backgroundColor: colorFactory.progressBackgroundColor,
    // backgroundColor: "teal",
  },

  step: {},
});

export { ProgressBar };
