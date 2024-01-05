
import { StyleSheet, View, Image } from "react-native";


import React from "react";
import Tile from "./Tile";
import Penguin from "./Penguin";
import Fish from "./Fish";
import Garbage from "./Garbage";
import Weather from "./Weather";

import * as constants from "./Constants"
import { GestureHandlerRootView } from "react-native-gesture-handler";

interface IslandAreaProps {
    runningState : number; 
    island : any; 
    handleTileClick: (vpos:number, hpos:number) => void; 
    handlePenguinClick: (key: number) => void;
    handleFishClick: (key: number) => void;
    handleGemClick: (key: number) => void;
    handleGarbageClick: (key: number) => void;
    illuminatedKey : number; 
    showBalloons : boolean;
    squareSize : number;
    areaSize : number;
}

export default function IslandArea(props : IslandAreaProps) : JSX.Element {

  const {runningState, island, handleTileClick, handlePenguinClick, handleFishClick, handleGemClick, handleGarbageClick, illuminatedKey, showBalloons, squareSize, areaSize} = props;
  const debug = false;

  
  if (debug) {
    console.log("=== Islandarea ==============================");
    console.dir(island);
    console.log("=============================================");
  }

  {/* {island.weather && <Weather key={island.id} runningState = {runningState} weather={island.weather} areaSize = {areaSize} squareSize={squareSize} onTileClick ={handleTileClick}  />}  */}
  
  if (runningState !== constants.NOT_STARTED) {
    return (
      <View>
          {island.tiles && island.tiles.map((tile:any) =><Tile key={tile.key} tileObj={tile} squareSize={squareSize} handleTileClick={handleTileClick} />)}        
          {island.fishes && island.fishes.map((fish:any) =><Fish key={fish.key} fishObj={fish} squareSize={squareSize} handleFishClick={handleFishClick} />)}
          {island.garbages && island.garbages.map((garbage:any) =><Garbage key={garbage.key} garbageObj={garbage} squareSize={squareSize} handleGarbageClick={handleGarbageClick}/>)} 
          {island.penguins && island.penguins.map((penguin:any) =><Penguin key={penguin.key} penguinObj={penguin} squareSize={squareSize} handlePenguinClick={handlePenguinClick} />)}        
      </View>   

    )
  }  else {
    return <View >
      <Image source={require("../images/empty.png")} style={{width: squareSize * 12, height: squareSize * 12, zIndex: 1}}/ >
    </View> 
  }
}


