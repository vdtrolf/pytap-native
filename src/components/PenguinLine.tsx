import { StyleSheet, Text, Image, View } from "react-native";
import { PenguinData } from "../types/types";
import React, {useState,useEffect,Fragment} from "react";

const healthImages = {
    HEALTH_0 : require("../images/health-0.png"),
    HEALTH_1 : require("../images/health-1.png"),
    HEALTH_2 : require("../images/health-2.png"),
    HEALTH_3 : require("../images/health-3.png"),
    HEALTH_4 : require("../images/health-4.png"),
    HEALTH_5 : require("../images/health-5.png"),
    HUNGER_0 : require("../images/hunger-0.png"),
    HUNGER_1 : require("../images/hunger-1.png"),
    HUNGER_2 : require("../images/hunger-2.png"),
    HUNGER_3 : require("../images/hunger-3.png"),
    HUNGER_4 : require("../images/hunger-4.png"),
    HUNGER_5 : require("../images/hunger-5.png"),
}    

export interface Ipenguin {
    id:number;
    alive : boolean;
    name : string;
    genderName :string; 
    age :number; 
    fat :number; 
    activity :number; 
    strategyShort: string;
    img1: any;
    img2: any;
}

interface PenguinProps {
    penguinObj: PenguinData;
    unitSize : number;
}

const PenguinLine = ({penguinObj, unitSize}: PenguinProps)  => {

    const [penguin,setPenguin] = useState<Ipenguin>({id:0, alive: true, name:'',genderName:'',age:0,fat:0,activity:0,strategyShort:'', img1:healthImages.HEALTH_0, img2:healthImages.HUNGER_0,}); 
    const healthImg : any[] = [healthImages.HEALTH_0,healthImages.HEALTH_1,healthImages.HEALTH_2,healthImages.HEALTH_3,healthImages.HEALTH_4,healthImages.HEALTH_5]
    const hungerImg : any[] = [healthImages.HUNGER_0,healthImages.HUNGER_1,healthImages.HUNGER_2,healthImages.HUNGER_3,healthImages.HUNGER_4,healthImages.HUNGER_5]
    const shapes = ["","Fat","Fit","Slim","Lean"]
    const activities = ["","Eating","Fishing","Making... well, you know..."]
    
    useEffect(() => {

        setPenguin({id:penguinObj.key,
                    alive:penguinObj.alive,
                    name:penguinObj.name,
                    genderName :penguinObj.genderName,
                    age : penguinObj.age,
                    fat : penguinObj.fat, 
                    activity : penguinObj.activity, 
                    strategyShort: penguinObj.strategyShort,
                    img1:healthImg[Math.floor(penguinObj.temp/20)],
                    img2:hungerImg[Math.floor(penguinObj.hunger/20)],});
    },[penguinObj])   

    const lineHeight = Math.floor(unitSize *3 / 4)
    const fontHeight = Math.floor(unitSize / 2.5 )


    if (penguin.alive) {
        return ( 
            <View style={[{height: lineHeight  }, styles.line]} >
                <View  style={[{flex:2},styles.list]} >
                    <Image source={penguin.img1} style={[{width: unitSize * 1.8, height: unitSize /5, paddingTop: unitSize / 8},styles.health]} ></Image> 
                    <Image source={penguin.img2} style={[{width: unitSize * 1.8, height: unitSize /5, paddingBottom: unitSize / 8 },styles.health]} ></Image> 
                </View> 
                <Text style={[{flex:2, fontSize: fontHeight}, styles.lineText]}> {penguin.name}</Text>
                <Text style={[{flex:2, fontSize: fontHeight}, styles.lineText]}>({penguin.genderName}/{Math.floor(penguin.age)}/{shapes[penguin.fat]})</Text>
                <Text style={[{flex:2, fontSize: fontHeight}, styles.lineText]}>{penguin.activity > 0? activities[penguin.activity]:penguin.strategyShort} </Text>
            </View>
        );
    } else {
        return (<></>);
    }

}

const styles = StyleSheet.create({
    line: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingBottom : 6
    },
    lineText: {
      color: 'white',
    },
    list:{
      flex:1,
      flexDirection: "column",
    },
    health: {
        flex:1,
        borderRadius: 0,
        resizeMode: "stretch",
      }
});

export default PenguinLine;