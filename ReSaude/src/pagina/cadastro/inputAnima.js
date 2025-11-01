import React, { useState, useEffect, useRef } from "react";
import { View, TextInput, Animated, StyleSheet } from "react-native";
import { Button } from "react-native-web";

export default function InputScale({
  label,
  value,
  onChangeText,
  inputStyle,
  containerStyle,
  onBlur,
  labelEstilo,
  position,
}) {
  const [isFocused, setIsFocused] = useState(false);
  const animatedLabel = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedLabel, {
      toValue: isFocused || value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  const tamanhoFont = labelEstilo == 40? labelEstilo : labelEstilo = 20
  const posicaoTop = position == 23? position : position = 15


  const labelStyle = {
    position: "absolute",
    left: 10,
    zIndex: 2,

    top: animatedLabel.interpolate({
      inputRange: [0, 1],
      outputRange: [posicaoTop, -19],
    }),
    fontSize: animatedLabel.interpolate({
      inputRange: [0, 1],
      outputRange: [tamanhoFont, 15],
    }),
    color: animatedLabel.interpolate({
      inputRange: [0, 1],
      outputRange: ["#333", "#007AFF"], // cor muda no foco
    }),
    
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <Animated.Text style={labelStyle}>{label}</Animated.Text>
      <TextInput
        style={[
          styles.input,
          { borderColor: isFocused ? "#007AFF" : "#ccc" },
          inputStyle,
        ]}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(false);
          if (onBlur) onBlur();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "45%",
  },
  input: {
    width: "100%",
    borderBottomWidth: 3,
    borderWidth: 3,
    borderRadius: 12,
    fontSize: 22,
    color: "black",
    backgroundColor: "white",
  },
});
