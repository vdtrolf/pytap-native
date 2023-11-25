import { StyleSheet, Image, Text} from "react-native";
import { TileData }  from "../types/types";
import React, {useState,useEffect,Fragment} from "react";

const tileImages = {
    TILE_0_A : require("../images/tile-sea.png"),
    TILE_0_B : require("../images/tile-sea.png"),
    TILE_1_A : require("../images/tile-ice-1-A.png"),
    TILE_1_B : require("../images/tile-ice-1-B.png"),
    TILE_2_A : require("../images/tile-ice-2-A.png"),
    TILE_2_B : require("../images/tile-ice-2-B.png"),
    TILE_3_A : require("../images/tile-ice-3-A.png"),
    TILE_3_B : require("../images/tile-ice-3-B.png"),
    TILE_4_A : require("../images/tile-ice-4-A.png"),
    TILE_4_B : require("../images/tile-ice-4-B.png"),
    TILE_5_A : require("../images/tile-ice-5-A.png"),
    TILE_5_B : require("../images/tile-ice-5-B.png"),
    TILE_6_A : require("../images/tile-ice-6-A.png"),
    TILE_6_B : require("../images/tile-ice-6-B.png"),
    TILE_7_A : require("../images/tile-ice-7-A.png"),
    TILE_7_B : require("../images/tile-ice-7-B.png"),
    TILE_8_A : require("../images/tile-ice-8-A.png"),
    TILE_8_B : require("../images/tile-ice-8-B.png"),
    TILE_9_A : require("../images/tile-ice-9-A.png"),
    TILE_9_B : require("../images/tile-ice-9-B.png"),
    TILE_10_A : require("../images/tile-ice-10-A.png"),
    TILE_10_B : require("../images/tile-ice-10-B.png"),
    TILE_11_A : require("../images/tile-ice-11-A.png"),
    TILE_11_B : require("../images/tile-ice-11-B.png"),
    TILE_12_A : require("../images/tile-ice-12-A.png"),
    TILE_12_B : require("../images/tile-ice-12-B.png"),
    TILE_13_A : require("../images/tile-ice-13-A.png"),
    TILE_13_B : require("../images/tile-ice-13-B.png"),
    TILE_14_A : require("../images/tile-ice-14-A.png"),
    TILE_14_B : require("../images/tile-ice-14-B.png"),
    TILE_15_A : require("../images/tile-ice-15-A.png"),
    TILE_15_B : require("../images/tile-ice-15-B.png"),    
    TILE_EARTH : require("../images/tile-ice-1-A.png"),
    TILE_EMPTY : require("../images/tile-sea.png")
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
    
    const tiles : any[] = [tileImages.TILE_15_A,tileImages.TILE_15_B,
      tileImages.TILE_14_A,tileImages.TILE_14_B,
      tileImages.TILE_13_A,tileImages.TILE_13_B,
      tileImages.TILE_12_A,tileImages.TILE_12_B,
      tileImages.TILE_11_A,tileImages.TILE_11_B,
      tileImages.TILE_10_A,tileImages.TILE_10_B,
      tileImages.TILE_9_A,tileImages.TILE_9_B,
      tileImages.TILE_8_A,tileImages.TILE_8_B,
      tileImages.TILE_7_A,tileImages.TILE_7_B,
      tileImages.TILE_6_A,tileImages.TILE_6_B,
      tileImages.TILE_5_A,tileImages.TILE_5_B,
      tileImages.TILE_4_A,tileImages.TILE_4_B,
      tileImages.TILE_3_A,tileImages.TILE_3_B,
      tileImages.TILE_2_A,tileImages.TILE_2_B,
      tileImages.TILE_1_A,tileImages.TILE_1_B,
      tileImages.TILE_0_A,tileImages.TILE_0_B];


    useEffect(() => {

//         var tileImg = empty;
//         if (tileType  > 0 && tileType < 14 ) {
//             tileImg = tiles[tileAngle==="a"?tileType*2:tileType*2 +1];
//         } else if (tileType > 13 ) {
//             tileImg = earth;
//         }


  
          var tileImg = tileImages.TILE_EMPTY;
          if (tileObj.type > 0 && tileObj.type <14 ) {
              tileImg = tiles[tileObj.angle==="a"?tileObj.type*2:tileObj.type*2 +1];
          } else if (tileObj.type > 13) {
              tileImg = tileImages.TILE_EARTH;
          }
          
          setTile({key: tileObj.key, top:tileObj.vpos * squareSize,left :tileObj.hpos * squareSize,img:tileImg});
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


// import React, {useState,useEffect} : require(".react"),
    // TILE_0_A : require("../images/tile-sea.png"),
    // TILE_0_B : require("../images/tile-sea.png"),
    // TILE_1_A : require("../images/tile-ice-1-A.png"),
    // TILE_1_B : require("../images/tile-ice-1-B.png"),
    // TILE_2_A : require("../images/tile-ice-2-A.png"),
    // TILE_2_B : require("../images/tile-ice-2-B.png"),
    // TILE_3_A : require("../images/tile-ice-3-A.png"),
    // TILE_3_B : require("../images/tile-ice-3-B.png"),
    // TILE_4_A : require("../images/tile-ice-4-A.png"),
    // TILE_4_B : require("../images/tile-ice-4-B.png"),
    // TILE_5_A : require("../images/tile-ice-5-A.png"),
    // TILE_5_B : require("../images/tile-ice-5-B.png"),
    // TILE_6_A : require("../images/tile-ice-6-A.png"),
    // TILE_6_B : require("../images/tile-ice-6-B.png"),
    // TILE_7_A : require("../images/tile-ice-7-A.png"),
    // TILE_7_B : require("../images/tile-ice-7-B.png"),
    // TILE_8_A : require("../images/tile-ice-8-A.png"),
    // TILE_8_B : require("../images/tile-ice-8-B.png"),
    // TILE_9_A : require("../images/tile-ice-9-A.png"),
    // TILE_9_B : require("../images/tile-ice-9-B.png"),
    // TILE_10_A : require("../images/tile-ice-10-A.png"),
    // TILE_10_B : require("../images/tile-ice-10-B.png"),
    // TILE_11_A : require("../images/tile-ice-11-A.png"),
    // TILE_11_B : require("../images/tile-ice-11-B.png"),
    // TILE_12_A : require("../images/tile-ice-12-A.png"),
    // TILE_12_B : require("../images/tile-ice-12-B.png"),
    // TILE_13_A : require("../images/tile-ice-13-A.png"),
    // TILE_13_B : require("../images/tile-ice-13-B.png"),
    // TILE_14_A : require("../images/tile-ice-14-A.png"),
    // TILE_14_B : require("../images/tile-ice-14-B.png"),
    // TILE_15_A : require("../images/tile-ice-15-A.png"),
    // TILE_15_B : require("../images/tile-ice-15-B.png"),
// import earth : require("../images/tile-ice-1-A.png"),
// import empty : require("../images/tile-sea.png"),


// export default function Tile(props) {

//   const [tile,setTile] = useState({});  
//   const {tileType,tileNum, tileAngle, tileVpos, tileHpos, onTileClick, tileSize} = props;

//   useEffect(() => {

//     // let pixels = tileSize 

//     const tiles = [tile_15_A,tile_15_B,
//       tile_14_A,tile_14_B,
//       tile_13_A,tile_13_B,
//       tile_12_A,tile_12_B,
//       tile_11_A,tile_11_B,
//       tile_10_A,tile_10_B,
//       tile_9_A,tile_9_B,
//       tile_8_A,tile_8_B,
//       tile_7_A,tile_7_B,
//       tile_6_A,tile_6_B,
//       tile_5_A,tile_5_B,
//       tile_4_A,tile_4_B,
//       tile_3_A,tile_3_B,
//       tile_2_A,tile_2_B,
//       tile_1_A,tile_1_B,
//       tile_0_A,tile_0_B];


//         var tileImg = empty;
//         if (tileType  > 0 && tileType < 14 ) {
//             tileImg = tiles[tileAngle==="a"?tileType*2:tileType*2 +1];
//         } else if (tileType > 13 ) {
//             tileImg = earth;
//         }
        
//         setTile({vpos:tileVpos,hpos:tileHpos,img:tileImg});
//    },[tileType,tileNum,tileHpos,tileVpos,tileAngle])              

//    const handleClick = () => {
//       onTileClick(tile.vpos,tile.hpos);
//    }
 
//   if (tile.img) {
//     return <div><img src={tile.img} style={{width: tileSize + 'px', height: tileSize + 'px', transition:'0.5s'}} onClick={handleClick} alt={tile.vpos + "-" + tile.hpos} /></div>
//   } 
// }