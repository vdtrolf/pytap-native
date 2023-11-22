import { View, Text, Animated, Easing } from 'react-native';
import React, { useEffect, useState } from 'react';


interface AnimateProps {
  children : any;
  leftFrom :number;
  leftTo : number;
  topFrom: number;
  topTo : number; 
  duration : number; 
}

const Mover= ({ children, duration, leftFrom, leftTo, topFrom, topTo}: AnimateProps) => {
  const [leftPosition, setLeftPosition] = useState(new Animated.Value (leftFrom));
  const [topPosition, setTopPosition] = useState(new Animated.Value (topFrom));

  useEffect(() => {
    moveLR();
    moveTB();
  }, []);

  const moveLR = () => {
    Animated.timing(leftPosition, {
      toValue: leftTo,
      duration, // the duration of the animation
      easing: Easing.linear, // the style of animation
      useNativeDriver : true
    }).start(); // starts this annimation once this method is called
  };

  const moveTB = () => {
    Animated.timing(topPosition, {
      toValue: topTo,
      duration, // the duration of the animation
      easing: Easing.linear, // the style of animation
      useNativeDriver : true
    }).start(); // starts this annimation once this method is called
  };

  // if (direction===DIR_LEFT) {
  //   return (
  //     <Animated.View style={{transform: [{ translateX: leftPosition }]}}>{children}</Animated.View>
  //   )
  // } else {
  //   return (
  //     <Animated.View style={{transform: [{translateY: topPosition }]}}>{children}</Animated.View>
  //   )
  // }

  return (
    <Animated.View style={{transform: [{ translateX: leftPosition }, { translateY: topPosition }]}}>{children}</Animated.View>
  )

};

export default Mover;