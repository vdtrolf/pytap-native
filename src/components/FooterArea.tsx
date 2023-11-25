import { StyleSheet, View, ScrollView} from "react-native";
import React from "react";
import PenguinLine from "./PenguinLine";
import { Colors } from "react-native/Libraries/NewAppScreen";


interface FooterAreaProps {
    runningState : number; 
    island : any; 
    unitSize : number;
}

export default function FooterArea(props : FooterAreaProps) : JSX.Element {

  const {runningState, island, unitSize} = props;
  
  const NOT_STARTED = 0;
  const ENDED = 3;
  const debug = true;
  
  if (runningState !== NOT_STARTED) {
    return (
      
        <ScrollView >
           {island.penguins && island.penguins.map((penguin:any) =><PenguinLine key={penguin.key} penguinObj={penguin} unitSize={unitSize} />)} 
        </ScrollView>

    )
  }  else {
    return <View />
  }
}

