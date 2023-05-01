import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import colorFactory from "../lib/colors";

function ProgressBar({
  totalStep,
  nowStep,
  showText = true,
  progressDirection = "",
  description = "",
  barHeight = 10,
  minProgress = 0,
}) {
  const loadValue = useRef(new Animated.Value(0)).current;

  const load = (count) => {
    Animated.timing(loadValue, {
      toValue: (count / totalStep) * 100,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const width = loadValue.interpolate({
    inputRange: [0 + minProgress * -1, 100],
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
        flexDirection: "column",
        justifyContent: "center",
        // width: "100%",
        // alignItems: "center",
      }}
    >
      <View
        style={{
          ...styles.bar,
          height: barHeight,
          marginBottom: barHeight * 0.2,
        }}
      >
        <Animated.View
          style={{
            backgroundColor: colorFactory.progressColor,
            // backgroundColor: "tomato",
            width,
            height: barHeight,
            // borderTopRightRadius: 2,
            // borderBottomRightRadius: 2,
            borderRadius: 2,
          }}
        />
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        {showText ? (
          <Text style={styles.step}>
            {progressDirection}
            {(nowStep / totalStep) * 100}%
          </Text>
        ) : null}
        {description !== "" ? (
          <Text style={styles.step}>{description}</Text>
        ) : null}
      </View>
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

  step: {
    color: colorFactory.progressColor,
    fontWeight: "700",
  },
});

export { ProgressBar };
