import { StyleSheet, Image, View, PanResponder} from "react-native";

const weatherImages = {
    SUN  : require("../images/weather-sun.png"),
    RAIN : require("../images/weather-rain.png"),
    COLD : require("../images/weather-cold.png"),
    SNOW : require("../images/weather-snow.png"),
    ENDED : require("../images/state-endgame.png"),
    PAUSED : require("../images/state-paused.png"),
}    


interface WeatherProps {
    runningState : number; 
    weather : string;
    areaSize : number;
    squareSize : number;
    onTileClick: (x:number,y:number) => void;
}

export default function Weather(props : WeatherProps) : JSX.Element {

    const {runningState, weather, areaSize, squareSize, onTileClick} = props;

    // const NOT_STARTED = 0;
    // const RUNNING = 1;
    // const PAUSED = 2;
    const ENDED = 3;
    const debug = false;


    const weathers = [{name:"sun", img: weatherImages.SUN},{name:"rain", img: weatherImages.RAIN},{name:"snow", img: weatherImages.SNOW} ,{name:"cold", img: weatherImages.COLD}];
    const found = weathers.find(wea => wea.name === weather)
    var img = runningState === ENDED ? weatherImages.ENDED : found ? found.img : undefined;

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (event, gestureState) => true,
        onStartShouldSetPanResponderCapture: (event, gestureState) => true,
        onMoveShouldSetPanResponder: (event, gestureState) => false,
        onMoveShouldSetPanResponderCapture: (event, gestureState) => false,
        onPanResponderGrant: (event, gestureState) => false,
        onPanResponderMove: (event, gestureState) => false,
        onPanResponderRelease: (event, gestureState) => {
            var locationX : number = Math.floor(event.nativeEvent.locationX / squareSize) 
            var locationY : number = Math.floor(event.nativeEvent.locationY / squareSize) 
            // console.log(event.nativeEvent.locationX+ " / " + event.nativeEvent.locationY)
            if(runningState !== ENDED) {
                onTileClick(locationX,locationY);
            }
        },
      });

    return ( 
        <>
            { img && 
            //<View style={{ backgroundColor: 'transparent' }} {...panResponder.panHandlers}>
                    <Image source={img} style={[{top: 0, left:0, width : areaSize, height : areaSize, zIndex:70},styles.weather]} {...panResponder.panHandlers}/>  
              //   </View>
            }
        </>
    );

}

const styles = StyleSheet.create({
    weather: {
        borderRadius: 0,
        position: "absolute",
        zIndex : 65
    }
});



