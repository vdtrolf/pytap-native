import { StyleSheet, Image, Text} from "react-native";
import { ArtifactData } from "../types/types";
import React, {useState,useEffect,Fragment} from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";

const artImages = {
    ART_EMPTY : require("../images/empty.png"),
    ART_FOOD : require("../images/food.png"),
    ART_CROSS : require("../images/cross.png"),
    ART_WREATH : require("../images/wreath.png"),
    ART_TARGET : require("../images/target.png"),
    ART_ICE : require("../images/ice-block-6.png"),    
    ART_FILL_1 : require("../images/PF-1-1-a.png"),
    ART_FILL_2 : require("../images/PF-1-4-a.png"),
    ART_FILL_3 : require("../images/PF-1-7-a.png"),
    ART_FILL_4 : require("../images/PF-1-10-a.png"),
    ART_FILL_5 : require("../images/PF-1-13-a.png"),
    ART_FILL_6 : require("../images/PF-1-15-a.png"),
    ART_ICE_1 : require("../images/ice-block-1.png"),
    ART_ICE_2 : require("../images/ice-block-2.png"),
    ART_ICE_3 : require("../images/ice-block-3.png"),
    ART_ICE_4 : require("../images/ice-block-4.png"),
    ART_ICE_5 : require("../images/ice-block-5.png"),
    ART_ICE_6 : require("../images/ice-block-6.png"),
    ART_KEPT  : require("../images/fish_kept.gif"),
}    

export interface Iartifact {
    top : number;
    left :number; 
    img : any; 
}

interface ArtifactProps {
    artifactObj: ArtifactData;
    squareSize: number;
}

const Artifact= ({artifactObj,squareSize}: ArtifactProps)  => {

    const [artifact,setArtifact] = useState<Iartifact>({top:0,left:0,img:artImages.ART_EMPTY}); // ({});  
    const artifacts : any[] = [artImages.ART_EMPTY, artImages.ART_WREATH, artImages.ART_CROSS, artImages.ART_FOOD, artImages.ART_EMPTY, artImages.ART_ICE, artImages.ART_KEPT, artImages.ART_TARGET]
    const digImg : any[] = [artImages.ART_ICE_6,artImages.ART_ICE_1,artImages.ART_ICE_2,artImages.ART_ICE_3,artImages.ART_ICE_4,artImages.ART_ICE_5,artImages.ART_ICE_6];
    const fillImg : any[]  = [artImages.ART_TARGET,artImages.ART_FILL_1,artImages.ART_FILL_2,artImages.ART_FILL_3,artImages.ART_FILL_4,artImages.ART_FILL_5,artImages.ART_FILL_6];

    useEffect(() => {
  
        

        if (artifactObj.type === 7 ) {
            setArtifact({img: fillImg[artifactObj.age], left:artifactObj.col*squareSize,top:artifactObj.line*squareSize});
        } else if (artifactObj.type === 5 ) {
            setArtifact({img: digImg[artifactObj.age], left:artifactObj.col*squareSize,top:artifactObj.line*squareSize});
        } else if (artifactObj.type !== 7 && artifactObj.type !== 5 ) {
            setArtifact({img: artifacts[artifactObj.type], left:artifactObj.col*squareSize,top:artifactObj.line*squareSize});
        }

    },[artifactObj])              
     
  
    return ( 
            //<Fragment>
                <Image source={artifact.img} style={[{ top: artifact.top, left: artifact.left, width: squareSize, height: squareSize, }, styles.artifact]} ></Image> 
            //</Fragment>
          );

}

const styles = StyleSheet.create({
    artifact: {
      borderRadius: 0,
      backgroundColor : Colors.background,
      position: "absolute",
      zIndex : 30
    }
  });

export default Artifact;