import { StyleSheet, Image, Text} from "react-native";
import { TileData } from "../types/types";
import React, {useState,useEffect,Fragment} from "react";

const tileImages = {
    TILE_0_A : require("../images/PF-1-0-a.png"),
    TILE_0_B : require("../images/PF-1-0-b.png"),
    TILE_1_A : require("../images/PF-1-1-a.png"),
    TILE_1_B : require("../images/PF-1-1-b.png"),
    TILE_2_A : require("../images/PF-1-2-a.png"),
    TILE_2_B : require("../images/PF-1-2-b.png"),
    TILE_3_A : require("../images/PF-1-3-a.png"),
    TILE_3_B : require("../images/PF-1-3-b.png"),
    TILE_4_A : require("../images/PF-1-4-a.png"),
    TILE_4_B : require("../images/PF-1-4-b.png"),
    TILE_5_A : require("../images/PF-1-5-a.png"),
    TILE_5_B : require("../images/PF-1-5-b.png"),
    TILE_6_A : require("../images/PF-1-6-a.png"),
    TILE_6_B : require("../images/PF-1-6-b.png"),
    TILE_7_A : require("../images/PF-1-7-a.png"),
    TILE_7_B : require("../images/PF-1-7-b.png"),
    TILE_8_A : require("../images/PF-1-8-a.png"),
    TILE_8_B : require("../images/PF-1-8-b.png"),
    TILE_9_A : require("../images/PF-1-9-a.png"),
    TILE_9_B : require("../images/PF-1-9-b.png"),
    TILE_10_A : require("../images/PF-1-10-a.png"),
    TILE_10_B : require("../images/PF-1-10-b.png"),
    TILE_11_A : require("../images/PF-1-11-a.png"),
    TILE_11_B : require("../images/PF-1-11-b.png"),
    TILE_12_A : require("../images/PF-1-12-a.png"),
    TILE_12_B : require("../images/PF-1-12-b.png"),
    TILE_13_A : require("../images/PF-1-13-a.png"),
    TILE_13_B : require("../images/PF-1-13-b.png"),
    TILE_14_A : require("../images/PF-1-14-a.png"),
    TILE_14_B : require("../images/PF-1-14-b.png"),
    TILE_15_A : require("../images/PF-1-15-a.png"),
    TILE_15_B : require("../images/PF-1-15-b.png"),
    TILE_EARTH : require("../images/PF-2-0.png"),
    TILE_EMPTY : require("../images/empty.png")
}

export interface Itile {
    key : number;
    top : number;
    left :number; 
    img : any; 
}

interface TileProps {
    tileObj: TileData;
    squareSize: number;
}

// function Snake({ snake }: SnakeProps): JSX.Element {
const Tile = ({tileObj,squareSize}: TileProps)  => {

    const [tile,setTile] = useState<Itile>({key:0, top:0,left:0,img:tileImages.TILE_EMPTY}); // ({});  
    
    const tiles : any[] = [tileImages.TILE_0_A,tileImages.TILE_0_B,
      tileImages.TILE_1_A,tileImages.TILE_1_B,
      tileImages.TILE_2_A,tileImages.TILE_2_B,
      tileImages.TILE_3_A,tileImages.TILE_3_B,
      tileImages.TILE_4_A,tileImages.TILE_4_B,
      tileImages.TILE_5_A,tileImages.TILE_5_B,
      tileImages.TILE_6_A,tileImages.TILE_6_B,
      tileImages.TILE_7_A,tileImages.TILE_7_B,
      tileImages.TILE_8_A,tileImages.TILE_8_B,
      tileImages.TILE_9_A,tileImages.TILE_9_B,
      tileImages.TILE_10_A,tileImages.TILE_10_B,
      tileImages.TILE_11_A,tileImages.TILE_11_B,
      tileImages.TILE_12_A,tileImages.TILE_12_B,
      tileImages.TILE_13_A,tileImages.TILE_13_B,
      tileImages.TILE_14_A,tileImages.TILE_14_B,
      tileImages.TILE_15_A,tileImages.TILE_15_B];


    useEffect(() => {
  
          var tileImg = tileImages.TILE_EMPTY;
          if (tileObj.type === 1) {
              tileImg = tiles[tileObj.ta==="a"?tileObj.num*2:tileObj.num*2 +1];
          } else if (tileObj.type > 1) {
              tileImg = tileImages.TILE_EARTH;
          }
          
          setTile({key: tileObj.key, top:tileObj.line * squareSize,left :tileObj.col * squareSize,img:tileImg});
     },[tileObj])              
  
    //  const handleClick = () => {
    //     onTileClick(tile.line,tile.col);
    //  }

     return ( 
        // <Fragment >
            <Image key={tile.key} source={tile.img} style={[{ top: tile.top, left: tile.left, width: squareSize, height: squareSize }, styles.tile]} ></Image> 
        // </Fragment>
      );

}

const styles = StyleSheet.create({
    tile: {
      borderRadius: 0,
      position: "absolute",
      zIndex : 20
    }
  });

export default Tile;