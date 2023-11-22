import { TouchableOpacity, StyleSheet, View, Image, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const tilesImages = {
  STILE : require("../images/tile-s.png"),
  SFOOD : require("../images/food-s.png"),
  THERM_0 : require("../images/therm-0.png"),
  THERM_1 : require("../images/therm-1.png"),
  THERM_2 : require("../images/therm-2.png"),
  THERM_3 : require("../images/therm-3.png"),

  OTHERM_0 : require("../images/otherm-0.png"),
  OTHERM_1 : require("../images/otherm-1.png"),
  OTHERM_2 : require("../images/otherm-2.png"),
  OTHERM_3 : require("../images/otherm-3.png"),
}

const NOT_STARTED = 0;
const RUNNING = 1;
const PAUSED = 2;
const ENDED = 3;

const ICON_SIZE = 24;


interface HeaderProps {
  onStartButton: () => void;
  onReloadButton: () => void;
  onCloneButton: () => void;
  onStepsButton: () => void;
  onAdminButton: () => void;
  island : any; 
  admin: boolean;
  runningState: number;
  squareSize: number;
  pulser: boolean;
}

export default function Header({
  onStartButton,
  onReloadButton,
  onCloneButton,
  onStepsButton,
  onAdminButton,
  island,
  admin,
  runningState,
  squareSize,
  pulser
}: HeaderProps): JSX.Element {


  const therm = [tilesImages.THERM_0,tilesImages.THERM_1,tilesImages.THERM_2,tilesImages.THERM_3,tilesImages.THERM_3]
  const otherm = [tilesImages.OTHERM_0,tilesImages.OTHERM_1,tilesImages.OTHERM_2,tilesImages.OTHERM_3,tilesImages.OTHERM_3]

  var tilesLine =[];
  var foodLine =[];
  let temp  =""
  let oceanTemp = "";
  let tempFactor = 0;
  let oceanFactor =0;

  const ICON_SIZE = Math.floor(squareSize / 1.5);
  const IMG_SIZE = Math.floor(squareSize / 3);
  const FONT_SIZE = Math.floor(squareSize / 3);

  if (island) {
    if (runningState !== NOT_STARTED) {
      temp = island.temperature ? Math.round(island.temperature * 10) / 10 + " °C":"0.4 °C"
      oceanTemp = island.oceanTemperature ? Math.round(island.oceanTemperature * 10) / 10 + " °C":"20.3 °C"
    }
    tempFactor = Math.floor((island.temperature - 0.4) * 10 /4); 
    oceanFactor = Math.floor((island.oceanTemperature - 20.3) * 10 /4);
      
    for (let i=0;i <island.tilesCount && i < 6 ;i++) tilesLine.push(<Image key={i+100} source={tilesImages.STILE} style={{width : IMG_SIZE,  height :IMG_SIZE}} />)
    for (let i=0;i <island.foodCount && i < 6 ;i++) foodLine.push(<Image key={i+200} source={tilesImages.SFOOD} style={{width : IMG_SIZE,  height :IMG_SIZE}} />)
  }

  return (
    <View style={styles.container}>
      <View style={{flex:5}} />   

      <View  style={styles.list} >
          <View style={styles.line}>{tilesLine}</View>
          <View style={styles.line}>{foodLine}</View>
      </View>
      
      <View  style={styles.list} >
          <View style={styles.line}><Image source={therm[tempFactor]} style={{width:FONT_SIZE, height:FONT_SIZE}} ></Image><Text style={{fontSize : FONT_SIZE, color: "white"}} >{temp}</Text></View>
          <View style={styles.line}><Image source={otherm[oceanFactor]} style={{width:FONT_SIZE, height:FONT_SIZE}} ></Image><Text style={{fontSize : FONT_SIZE, color:"white"}}>{oceanTemp}</Text></View> 
      </View>  

      <View style={styles.buttons}>       
        
        <TouchableOpacity onPress={onStartButton}>
          <Ionicons
            name={runningState !== RUNNING ? "play-circle-outline" : "pause-circle-outline"}
            size={ICON_SIZE}
            color={"white"}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={onReloadButton}>
          <Ionicons name="reload-circle" size={ICON_SIZE} color={"white"} />
        </TouchableOpacity>


        <TouchableOpacity onPress={onCloneButton}>
          <Ionicons name="list-circle-outline" size={ICON_SIZE} color={"white"} />
        </TouchableOpacity>

        <TouchableOpacity onPress={onStepsButton}>
          <Ionicons name="ellipsis-horizontal-circle-outline" size={ICON_SIZE} color={pulser?"red":"white"} />
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
    flex: 5,
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
  }
});
