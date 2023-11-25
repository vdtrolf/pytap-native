import { StyleSheet, Animated, Easing, Image } from "react-native";
import { FishData } from "../types/types";
import React, {useState,useEffect,Fragment, Children} from "react";
import Mover from "./Mover";


// const DIR_LEFT : number = 1;
// const DIR_TOP : number = 2;

const fishImages = {
  FISH_STAYING : require("../images/fish-1-still.gif"),
  FISH_ONHOOK  : require("../images/fish_kept.gif"),
  
  FISH_1_MOVING : require("../images/fish-1-moving.gif"),
  FISH_2_MOVING : require("../images/fish-2-moving.gif"),
  FISH_3_MOVING : require("../images/fish-3-moving.gif"),
  FISH_4_MOVING : require("../images/fish-4-moving.gif"),
}    

export interface Ifish {
    key : number;
    leftFrom :number;
    leftTo :number;
    topFrom :number;
    topTo :number;
    img : any; 
}

interface FishProps {
    fishObj: FishData;
    squareSize: number;
}

const Fish = ({fishObj, squareSize}: FishProps)  => {

    const [fish,setFish] = useState<Ifish>({key:0,leftFrom:0,leftTo:0,topFrom:0,topTo:0,img:fishImages.FISH_1_MOVING});     
    const movingImg : any[] = [fishImages.FISH_STAYING,fishImages.FISH_1_MOVING,fishImages.FISH_2_MOVING,fishImages.FISH_3_MOVING,fishImages.FISH_4_MOVING ]

    useEffect(() => {
    
        var image = fishImages.FISH_STAYING;
        if (fishObj.direction > 0 ) {
          image = movingImg[fishObj.direction];
        } else if (fishObj.onHook) {
          image = fishImages.FISH_ONHOOK
        } else {
          image = fishImages.FISH_STAYING
        } 
        
        // var aDirection  = fish.leftTo !== fishObj.lpos*squareSize ? DIR_LEFT: 0;
        // aDirection  = fish.topTo !== fishObj.hpos*squareSize ? DIR_TOP : aDirection;
        
        // if (aDirection) {
        //   console.log("===> Fish " + fishObj.fishDirection + " " + fish.leftTo+ "-" + fishObj.lpos*squareSize + " / " + + fish.topTo + "-" + fishObj.hpos*squareSize)
        // }

        setFish({key:fishObj.key, leftFrom:fish.leftTo,leftTo:fishObj.hpos*squareSize, topFrom:fish.topTo, topTo:fishObj.vpos*squareSize, img:image});

    },[fishObj])    
  
   if ((fish.leftFrom !==  fish.leftTo || fish.topFrom !==  fish.topTo) && (fish.leftFrom !==0 || fish.topFrom !== 0)) {
      return (          
        <Mover key={fish.key+ 80000000} duration={1000} leftFrom={fish.leftFrom} leftTo={fish.leftTo}  topFrom={fish.topFrom} topTo={fish.topTo}>
            <Image key={fish.key + 900000000} source={fish.img} style={[{ width: squareSize, height: squareSize, }, styles.fish]} /> 
        </Mover>
      )
    } else {
      return (
        <Image key={fish.key} source={fish.img} 
               style={[{ top: fish.topTo, 
               left: fish.leftTo, 
               width: squareSize, 
               height: squareSize, }, styles.fish]} /> 
          );
      }
}

const styles = StyleSheet.create({
    fish: {     
      borderRadius: 0,
      position: "absolute",
      zIndex : 43,
    },
    box: {
      width: 50,
      height: 50,
      backgroundColor: "white",
    }
  });

export default Fish;