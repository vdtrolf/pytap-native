import { StyleSheet, View, ImageBackground, Image, Text } from "react-native";

import React from "react";
import Tile from "./Tile";
import Artifact from "./Artifact";
import Penguin from "./Penguin";
import Fish from "./Fish";
import Garbage from "./Garbage";
import Weather from "./Weather";

interface IslandAreaProps {
    runningState : number; 
    island : any; 
    handleTileClick: (x:number, y:number) => void; 
    illuminatedId : number; 
    showBalloons : boolean;
    squareSize : number;
    areaSize : number;
}

export default function IslandArea(props : IslandAreaProps) : JSX.Element {

  const {runningState, island, handleTileClick, illuminatedId, showBalloons, squareSize, areaSize} = props;
  
  const NOT_STARTED = 0;
  // const RUNNING = 1;
  // const PAUSED = 2;
  // const ENDED = 3;
  const debug = false;
  
  if (debug) {
    console.log("=== Islandarea ==============================");
    console.dir(island);
    console.log("=============================================");
  }

  const fontNameHeight = Math.floor(squareSize / 2)
  const fontPtsHeight = Math.floor(squareSize / 3 )

  if (runningState !== NOT_STARTED) {
    return (
        
      <ImageBackground source={require("../images/waves-back.png")} style={{width : areaSize, height : areaSize}} >
          {island.tiles && island.tiles.map((tile:any) =><Tile key={tile.key} tileObj={tile} squareSize={squareSize}/>)} 
          {island.artifacts && island.artifacts.map((artifact:any) =><Artifact key={artifact.key} artifactObj={artifact} squareSize={squareSize}/>)}  
          {island.fishes && island.fishes.map((fish:any) =><Fish key={fish.id} fishObj={fish} squareSize={squareSize}/>)}
          {island.garbages && island.garbages.map((garbage:any) =><Garbage key={garbage.id} garbageObj={garbage} squareSize={squareSize}/>)} 
          {island.penguins && island.penguins.map((penguin:any) =><Penguin key={penguin.id} penguinObj={penguin} squareSize={squareSize}/>)}  
          {island.weather && <Weather key={island.id} runningState = {runningState} weather={island.weather} areaSize = {areaSize} squareSize={squareSize} onTileClick ={handleTileClick}  />}  
          {island.name && 
          <View >
            <Text style={[{ top: 6, left: 6, fontSize: fontNameHeight}, styles.name]}>{island.name}</Text>
            <Text style={[{ top: Math.floor(squareSize * 0.75), fontSize: fontPtsHeight, left: 6}, styles.name]}>{Math.round(island.year)}</Text>
          </View>}
      </ ImageBackground>
        
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
      zIndex : 70
    }
});
