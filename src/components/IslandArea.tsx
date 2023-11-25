import { useEffect, useState, useRef } from "react";
import { StyleSheet, View, Image, SafeAreaView, ImageBackground, Text } from "react-native";

// import RNImageTools from 'react-native-image-tools-wm';
// import mergeImg from "merge-img-vwv"; 


import React from "react";
import Tile from "./Tile";
import Penguin from "./Penguin";
import Fish from "./Fish";
import Garbage from "./Garbage";
import Weather from "./Weather";
import BackgroundImage from "./BackgroundImage";


import * as constants from "./Constants"
import { GestureHandlerRootView } from "react-native-gesture-handler";

interface IslandAreaProps {
    runningState : number; 
    island : any; 
    handleTileClick: (x:number, y:number) => void; 
    illuminatedKey : number; 
    showBalloons : boolean;
    squareSize : number;
    areaSize : number;
}

export default function IslandArea(props : IslandAreaProps) : JSX.Element {

  const [backgroundImg,setBackgroundImg] = useState<any>();

  const {runningState, island, handleTileClick, illuminatedKey, showBalloons, squareSize, areaSize} = props;
  const debug = false;

  const img1 = Image.resolveAssetSource(require('../images/tile-sea.png'));
  const img2 = Image.resolveAssetSource(require('../images/tile-ice-11-B.png'));
  


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



  // useEffect(() => {

    // RNImageTools.createMaskFromShape({
    //   points: [
    //     { x: 20, y: 20 },
    //     { x: 200, y: 200 },
    //     { x: 200, y: 20 },
    //     { x: 20, y: 20 },
    //   ],
    //   width: 500,
    //   height: 500,
    //   inverted: false,
    // }).then(({ uri, width, height }) => {
    //   setBackgroundImg(uri)
    //   // Sync with your app state
    // }).catch(console.error);

  //   RNImageTools.merge(
  //     [
  //       img1.uri,
  //       img2.uri
  //     ]
  // ).then( img => {
  //   setBackgroundImg(img.uri)
  //   console.log(img.uri)}
  // ).catch(console.error)



  // }, [island]);
  
  if (debug) {
    console.log("=== Islandarea ==============================");
    console.dir(island);
    console.log("=============================================");
  }

{/* <ImageBackground  style={{width : areaSize, height : areaSize}} source = {backgroundImg}> 
    {island.tiles && island.tiles.map((tile:any) =><Tile key={tile.key} tileObj={tile} squareSize={squareSize}/>)}
    {island.fishes && island.fishes.map((fish:any) =><Fish key={fish.id} fishObj={fish} squareSize={squareSize}/>)}
    {island.penguins && island.penguins.map((penguin:any) =><Penguin key={penguin.id} penguinObj={penguin} squareSize={squareSize}/>)}  
    {island.weather && <Weather key={island.id} runningState = {runningState} weather={island.weather} areaSize = {areaSize} squareSize={squareSize} onTileClick ={handleTileClick}  />}  */}
  
{/* <ImageBackground  style={{width : areaSize, height : areaSize}} source = {backgroundImg}> 
        {island.fishes && island.fishes.map((fish:any) =><Fish key={fish.id} fishObj={fish} squareSize={squareSize}/>)}
    </ImageBackground> */}


  if (runningState !== constants.NOT_STARTED) {
    return (
      <View>
          {island.tiles && island.tiles.map((tile:any) =><Tile key={tile.key} tileObj={tile} squareSize={squareSize}/>)}        
          {island.fishes && island.fishes.map((fish:any) =><Fish key={fish.id} fishObj={fish} squareSize={squareSize}/>)}
          {island.garbages && island.garbages.map((garbage:any) =><Garbage key={garbage.key} garbageObj={garbage} squareSize={squareSize}/>)} 
      </View>   

      )
        
    
  }  else {
    return <View >
      <Image source={require("../images/empty.png")} style={{width: squareSize * 12, height: squareSize * 12, zIndex: 1}}/ >
    </View> 
  }
}

const styles = StyleSheet.create({ 
    name: {
      borderRadius: 0,
      position: "absolute",
      color: "white",
      fontFamily : "Arial",
      fontWeight: "bold",
      zIndex : 10
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    fishes: {
      justifyContent: 'center',
      alignItems: 'center'
    }
});
