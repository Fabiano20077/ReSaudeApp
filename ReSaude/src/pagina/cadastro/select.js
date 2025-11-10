import React, { useState, useEffect, useRef } from "react";
import { View, TextInput, Animated, StyleSheet } from "react-native";
import { Button } from "react-native-web";
import { Picker } from "@react-native-picker/picker";

export default function selectScan({
  label,
  value,
  selectedValue,
  onValueChange,
  inputStyle,
  opitions = [],
  containerStyle,
  onBlur,
  labelEstilo2,
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

  const labelStyle = {
    position: "absolute",
    left: 10,
    color: labelEstilo2,
    zIndex: 2,
    top: animatedLabel.interpolate({
      inputRange: [0, 1],
      outputRange: [15, -19],
    }),
    fontSize: animatedLabel.interpolate({
      inputRange: [0, 1],
      outputRange: [20, 15],
    }),
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <Animated.Text style={labelStyle}>{label}</Animated.Text>
      <View style={[styles.input]}>
        <Picker
          onFocus={() => setIsFocused(true)}
          selectedValue={selectedValue}
          onValueChange={onValueChange}
        >
          {opitions.map((item, index) => (
            <Picker.Item key={index} label={item.label} value={item.value} />
          ))}
        </Picker>
      </View>
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
    borderRadius: 12,
    fontSize: 22,
    color: "black",
    backgroundColor: "white",
  },
});
