import {Animated, Easing} from 'react-native';

export const screenFromLeft = (duration = 300) => ({
  transitionSpec: {
    duration,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing,
    useNativeDriver: true,
  },
  screenInterpolator: ({layout, position, scene}) => {
    const {index} = scene;
    const {initWidth} = layout;

    const translateX = position.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: [-initWidth, 0, 0],
    });

    const opacity = position.interpolate({
      inputRange: [index - 1, index - 0.99, index],
      outputRange: [0, 1, 1],
    });

    return {opacity, transform: [{translateX}]};
  },
});

export const screenFromRight = (duration = 300) => ({
  transitionSpec: {
    duration,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing,
    useNativeDriver: true,
  },
  screenInterpolator: ({layout, position, scene}) => {
    const {index} = scene;
    const {initWidth} = layout;
    const translateX = position.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: [initWidth, 0, 0],
    });

    const opacity = position.interpolate({
      inputRange: [index - 1, index - 0.99, index],
      outputRange: [0, 1, 1],
    });

    return {opacity, transform: [{translateX}]};
  },
});

export const slideIn = {
  from: {translateY: 250},
  to: {translateY: 0},
};

export const slideOut = {
  from: {opacity: 1, translateY: 0},
  to: {opacity: 0, translateY: 250},
};

export const fadeIn = {
  from: {opacity: 0},
  to: {opacity: 1},
};

export const fadeOut = {
  from: {opacity: 1},
  to: {opacity: 0},
};

export const scaleIn = {
  from: {opacity: 0, scale: 0.8},
  to: {opacity: 1, scale: 1},
};

export const scaleOut = {
  from: {opacity: 1, scale: 1},
  to: {opacity: 0, scale: 0.8},
};
