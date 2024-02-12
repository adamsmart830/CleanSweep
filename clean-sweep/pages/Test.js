import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styled from "@emotion/native";
import { useTheme } from "emotion-theming";

function mapShadowToStyle(key, theme) {
  const _obj = theme.shadows[key];
  if (!_obj) return {};
  return _obj;
}

export const Box = React.forwardRef((props, ref) => {
  const { shadow, style, children, ...rest } = props;
  const theme = useTheme();
  const _shadow = shadow && mapShadowToStyle(shadow, theme);
  
  return (
    <styled.box ref={ref} {...rest} style={[style, _shadow]}>
      {children}
    </styled.box>
  );
});

Box.displayName = "Box";

const Test = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>React Native Boilerplate Page</Text>
      <Text>This is a simple boilerplate page for your React Native app.</Text>
      {/* Add more components or styles as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default Test;
