import { StyleSheet, Image } from "react-native";
import { PenguinData } from "../types/types";
import React, {useState,useEffect,Fragment} from "react";
import Mover from "./Mover";

const penguinImages = {

    PENG_M : require("../images/peng-m.png"),
    PENG_F : require("../images/peng-f.png"),
    PENG_Y : require("../images/peng-y.png"),
    PENG_F_EATING : require("../images/peng-f-eating.png"),
    PENG_M_EATING : require("../images/peng-m-eating.png"),
    PENG_Y_EATING : require("../images/peng-y-eating.png"),
    PENG_LOVING : require("../images/peng-loving.png"),
 
    PENG_F_1_FISHING : require("../images/peng-f-1-fishing.png"),
    PENG_F_2_FISHING : require("../images/peng-f-2-fishing.png"),
    PENG_F_3_FISHING : require("../images/peng-f-3-fishing.png"),
    PENG_F_4_FISHING : require("../images/peng-f-4-fishing.png"),
    
    PENG_M_1_FISHING : require("../images/peng-m-1-fishing.png"),
    PENG_M_2_FISHING : require("../images/peng-m-2-fishing.png"),
    PENG_M_3_FISHING : require("../images/peng-m-3-fishing.png"),
    PENG_M_4_FISHING : require("../images/peng-m-4-fishing.png"),
    
    PENG_Y_1_FISHING : require("../images/peng-y-1-fishing.png"),
    PENG_Y_2_FISHING : require("../images/peng-y-2-fishing.png"),
    PENG_Y_3_FISHING : require("../images/peng-y-3-fishing.png"),
    PENG_Y_4_FISHING : require("../images/peng-y-4-fishing.png"),
    
    PENG_M_1_FILLING : require("../images/peng-m-1-filling.png"),
    PENG_M_2_FILLING : require("../images/peng-m-2-filling.png"),
    PENG_M_3_FILLING : require("../images/peng-m-3-filling.png"),
    PENG_M_4_FILLING : require("../images/peng-m-4-filling.png"),
    
    PENG_F_1_FILLING : require("../images/peng-m-1-filling.png"),
    PENG_F_2_FILLING : require("../images/peng-m-2-filling.png"),
    PENG_F_3_FILLING : require("../images/peng-m-3-filling.png"),
    PENG_F_4_FILLING : require("../images/peng-m-4-filling.png"),
    
    PENG_F_1_DIGING : require("../images/peng-f-1-diging.png"),
    PENG_F_2_DIGING : require("../images/peng-f-2-diging.png"),
    PENG_F_3_DIGING : require("../images/peng-f-3-diging.png"),
    PENG_F_4_DIGING : require("../images/peng-f-4-diging.png"),
    
    PENG_M_1_DIGING : require("../images/peng-m-1-diging.png"),
    PENG_M_2_DIGING : require("../images/peng-m-2-diging.png"),
    PENG_M_3_DIGING : require("../images/peng-m-3-diging.png"),
    PENG_M_4_DIGING : require("../images/peng-m-4-diging.png"),
    
    PENG_F_1_MOVING : require("../images/peng-f-1-moving.png"),
    PENG_F_2_MOVING : require("../images/peng-f-2-moving.png"),
    PENG_F_3_MOVING : require("../images/peng-f-3-moving.png"),
    PENG_F_4_MOVING : require("../images/peng-f-4-moving.png"),
    
    PENG_M_1_MOVING : require("../images/peng-m-1-moving.png"),
    PENG_M_2_MOVING : require("../images/peng-m-2-moving.png"),
    PENG_M_3_MOVING : require("../images/peng-m-3-moving.png"),
    PENG_M_4_MOVING : require("../images/peng-m-4-moving.png"),
    
    PENG_Y_1_MOVING : require("../images/peng-y-1-moving.png"),
    PENG_Y_2_MOVING : require("../images/peng-y-2-moving.png"),
    PENG_Y_3_MOVING : require("../images/peng-y-3-moving.png"),
    PENG_Y_4_MOVING : require("../images/peng-y-4-moving.png"),
    
}    

export interface Ipenguin {
    key : number;
    alive : boolean;
    leftFrom :number;
    leftTo :number;
    topFrom :number;
    topTo :number;
    img : any; 
}

interface PenguinProps {
    penguinObj: PenguinData;
    squareSize : number;
}


const Penguin = ({penguinObj, squareSize}: PenguinProps)  => {

    const [penguin,setPenguin] = useState<Ipenguin>({key:0, alive:true, leftFrom:0, leftTo:0,topTo:0,topFrom:0,img:penguinImages.PENG_M }); 
    
    useEffect(() => {

        const fishing_f = [penguinImages.PENG_F_4_FISHING,penguinImages.PENG_F_1_FISHING,penguinImages.PENG_F_2_FISHING,penguinImages.PENG_F_3_FISHING,penguinImages.PENG_F_4_FISHING]
        const fishing_m = [penguinImages.PENG_M_4_FISHING,penguinImages.PENG_M_1_FISHING,penguinImages.PENG_M_2_FISHING,penguinImages.PENG_M_3_FISHING,penguinImages.PENG_M_4_FISHING]
        const fishing_y = [penguinImages.PENG_Y_4_FISHING,penguinImages.PENG_Y_1_FISHING,penguinImages.PENG_Y_2_FISHING,penguinImages.PENG_Y_3_FISHING,penguinImages.PENG_Y_4_FISHING]
      
        const diging_f = [penguinImages.PENG_F_4_DIGING,penguinImages.PENG_F_1_DIGING,penguinImages.PENG_F_2_DIGING,penguinImages.PENG_F_3_DIGING,penguinImages.PENG_F_4_DIGING]
        const diging_m = [penguinImages.PENG_M_4_DIGING,penguinImages.PENG_M_1_DIGING,penguinImages.PENG_M_2_DIGING,penguinImages.PENG_M_3_DIGING,penguinImages.PENG_M_4_DIGING]
      
        const filling_f = [penguinImages.PENG_F_4_FILLING,penguinImages.PENG_F_1_FILLING,penguinImages.PENG_F_2_FILLING,penguinImages.PENG_F_3_FILLING,penguinImages.PENG_F_4_FILLING]
        const filling_m = [penguinImages.PENG_M_4_FILLING,penguinImages.PENG_M_1_FILLING,penguinImages.PENG_M_2_FILLING,penguinImages.PENG_M_3_FILLING,penguinImages.PENG_M_4_FILLING]
      
        const moving_f = [penguinImages.PENG_F,penguinImages.PENG_F_1_MOVING,penguinImages.PENG_F_2_MOVING,penguinImages.PENG_F_3_MOVING,penguinImages.PENG_F_4_MOVING]
        const moving_m = [penguinImages.PENG_M,penguinImages.PENG_M_1_MOVING,penguinImages.PENG_M_2_MOVING,penguinImages.PENG_M_3_MOVING,penguinImages.PENG_M_4_MOVING]
        const moving_y = [penguinImages.PENG_Y,penguinImages.PENG_Y_1_MOVING,penguinImages.PENG_Y_2_MOVING,penguinImages.PENG_Y_3_MOVING,penguinImages.PENG_Y_4_MOVING]
    
        var image = penguinImages.PENG_LOVING;
        if (penguinObj.activity === 0) {
          
          if (penguinObj.moveDirection) {
            
            image = penguinObj.gender ==="m"? moving_m[penguinObj.moveDirection]: moving_f[penguinObj.moveDirection];
            if (penguinObj.gender ==="y") image = moving_y[penguinObj.moveDirection];
          } else {
            image = penguinObj.gender ==="m"? penguinImages.PENG_M : penguinImages.PENG_F;
            if (penguinObj.gender ==="y") image =  penguinImages.PENG_Y;
          }
        } else if (penguinObj.activity === 1) {
          image = penguinObj.gender ==="m"? penguinImages.PENG_M_EATING: penguinImages.PENG_F_EATING;
          if (penguinObj.gender ==="y") image = penguinImages.PENG_Y_EATING;
        } else if (penguinObj.activity === 2) {
          image = penguinObj.gender ==="m"? fishing_m[penguinObj.fishDirection]: fishing_f[penguinObj.fishDirection];
          if (penguinObj.gender ==="y") image = fishing_y[penguinObj.fishDirection];
        } else if (penguinObj.activity === 4) {
          image = penguinObj.gender ==="f"? diging_f[penguinObj.digDirection]: diging_m[penguinObj.digDirection];
        } else if (penguinObj.activity === 5) {
          image = penguinObj.gender ==="f"? filling_f[penguinObj.fillDirection]: filling_m[penguinObj.fillDirection];
        }
        
        setPenguin({key: penguinObj.key, alive:penguinObj.alive, img:image,leftFrom:penguin.leftTo,leftTo:penguinObj.lpos*squareSize, topFrom:penguin.topTo, topTo:penguinObj.hpos*squareSize,});
    },[penguinObj])    
   
    // if (penguin.alive) {
      if ((penguin.leftFrom !==  penguin.leftTo || penguin.topFrom !==  penguin.topTo) && (penguin.leftFrom !==0 || penguin.topFrom !== 0)) {
        return (          
          <Mover duration={1000} leftFrom={penguin.leftFrom} leftTo={penguin.leftTo}  topFrom={penguin.topFrom} topTo={penguin.topTo}>
              <Image key={penguin.key+7000000000} source={penguin.img} style={[{ width: squareSize, height: squareSize, }, styles.penguin]} /> 
          </Mover>
        )
      } else {
        return (
          <Image key={penguin.key+7000000000} source={penguin.img} style={[{ top: penguin.topTo, left: penguin.leftTo, width: squareSize, height: squareSize, }, styles.penguin]} ></Image> 
            );
        }

  // } else {
  //     return (<></>);
  // }
}

const styles = StyleSheet.create({
    penguin: {
      borderRadius: 0,
      position: "absolute",
      zIndex : 50
    }
  });

export default Penguin;