import { StyleSheet, Image, Text} from "react-native";
import { GarbageData } from "../types/types";
import React, {useState,useEffect} from "react";

const garbImages = {
    ART_EMPTY : require("../images/empty.png"),
    GARB_1 : require("../images/garbage-1.png"),
    GARB_2 : require("../images/garbage-2.png"),
    GARB_3 : require("../images/garbage-3.png"),
    GARB_4 : require("../images/garbage-4.png"),
    GARB_5 : require("../images/garbage-5.png"),
}    

export interface Igarbage {
    key : number;
    top : number;
    left :number; 
    img : any; 
}

interface GarbageProps {
    garbageObj: GarbageData;
    squareSize: number;
}

const Garbage = ({garbageObj,squareSize}: GarbageProps)  => {

    const [garbage,setGarbage] = useState<Igarbage>({key:0, top:0,left:0,img:garbImages.ART_EMPTY}); // ({});  
    const garbageImg : any[] = [garbImages.GARB_1,garbImages.GARB_2,garbImages.GARB_3,garbImages.GARB_4,garbImages.GARB_5 ]
    

    useEffect(() => {
        setGarbage({img: garbageImg[garbageObj.kind], key:garbageObj.key, left:garbageObj.vpos * squareSize,top:garbageObj.hpos*squareSize});
   
    },[garbageObj])              
     
  
    return ( 
        <Image  key={garbage.key} source={garbage.img} style={[{ top: garbage.top, left: garbage.left, width: squareSize, height: squareSize, }, styles.garbage]} ></Image> 
    );

}

const styles = StyleSheet.create({
    garbage: {
      borderRadius: 0,
      position: "absolute",
      zIndex : 45
    }
  });

export default Garbage;