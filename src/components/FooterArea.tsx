import { StyleSheet, View, ScrollView} from "react-native";
import React from "react";
import PenguinLine from "./PenguinLine";
import { Colors } from "react-native/Libraries/NewAppScreen";


interface FooterAreaProps {
    runningState : number; 
    island : any; 
    squareSize : number;
}

export default function FooterArea(props : FooterAreaProps) : JSX.Element {

  const {runningState, island, squareSize} = props;
  
  const NOT_STARTED = 0;
  const ENDED = 3;
  const debug = true;
  
  if (runningState !== NOT_STARTED) {
    return (
      
        <ScrollView >
           {island.penguins && island.penguins.map((penguin:any) =><PenguinLine key={penguin.id + 10000000} penguinObj={penguin} squareSize={squareSize} />)} 
        </ScrollView>

    )
  }  else {
    return <View />
  }
}

