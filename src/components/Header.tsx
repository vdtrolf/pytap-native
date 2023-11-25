import { TouchableOpacity, StyleSheet, View, Image, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import * as constants from "./Constants"

const tilesImages = {
  SPEED_1 : require("../images/speedo-1.png"),
  SPEED_2 : require("../images/speedo-2.png"),
  SPEED_3 : require("../images/speedo-3.png"),
  SPEED_4 : require("../images/speedo-4.png"),
  SPEED_5 : require("../images/speedo-5.png"),
}

const ICON_SIZE = 36;

interface HeaderProps {
  onCreateButton: () => void;
  onOnceButton: () => void;
  onCloneButton: () => void;
  onStopButton: () => void;
  onPlusButton: () => void;
  onAdminButton: () => void;
  island : any; 
  admin: boolean;
  unitSize : number;
  runningState: number;
}

export default function Header({
  onCreateButton,
  onOnceButton,
  onCloneButton,
  onStopButton,
  onPlusButton,
  onAdminButton,
  island,
  admin,
  unitSize,
  runningState,
}: HeaderProps): JSX.Element {

  const ICON_SIZE = Math.floor(unitSize);
  const fontNameHeight = Math.floor(unitSize / 2)
  const fontPtsHeight = Math.floor(unitSize / 3 )

  return (
    <View style={styles.container}>
      <View style={{flex:5}} />   

      {island.name && 
          <View style={{flex:8}}>
            <Text style={[{ top: 0, left: 0, fontSize: fontNameHeight}, styles.name]}>{island.name}</Text>
            <Text style={[{ top: Math.floor(unitSize * 0.75), fontSize: fontPtsHeight, left: 0}, styles.name]}>{Math.round(island.year)}</Text>
          </View>
      }

      <View style={styles.buttons}>       
        
        <TouchableOpacity onPress={onCreateButton}>
          <Ionicons
            name={runningState !== constants.RUNNING ? "play-circle-outline" : "pause-circle-outline"}
            size={ICON_SIZE}
            color={"white"}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={onPlusButton}>
          <Ionicons name="reload-circle" size={ICON_SIZE} color={"white"} />
        </TouchableOpacity>

        <TouchableOpacity onPress={onCloneButton}>
          <Ionicons name="list-circle-outline" size={ICON_SIZE} color={"white"} />
        </TouchableOpacity>

        <TouchableOpacity onPress={onCloneButton}>
          <Ionicons name="ellipsis-horizontal-circle-outline" size={ICON_SIZE} color={"white"} />
        </TouchableOpacity>

        <TouchableOpacity onPress={onAdminButton}>
          <Ionicons name="person-circle-outline" size={ICON_SIZE} color={"white"} />
        </TouchableOpacity>
      </View>  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    color: 'white',
    fontFamily : "Arial",
  },
  buttons: {
    flex: 4,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    padding: 1,
  },
  list:{
    flex: 4,
    flexDirection: "column",
    color: "white"
  },
  line:{
    flexDirection: "row",
    alignContent : "flex-start",
    padding: 2,
  },
  name: {
    borderRadius: 0,
    position: "absolute",
    color: "white",
    fontFamily : "Arial",
    fontWeight: "bold",
    zIndex : 70
  }
});
