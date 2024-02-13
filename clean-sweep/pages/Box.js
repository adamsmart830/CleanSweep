/* components/Box.js */
import React from "react";
import styled from "@emotion/native";
import { viewProps } from "../utils/system";
import { useTheme } from "emotion-theming";

const StyledBox = styled.View(viewProps);

/* Since shadows in React Native consist of multiple properties, we include this function to help us map them from one key to multiple values. */
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
    <StyledBox ref={ref} {...rest} style={[style, _shadow]}>
      {children}
    </StyledBox>
  );
});

Box.displayName = "Box";
