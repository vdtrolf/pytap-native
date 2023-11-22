import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View, Text, ImageBackground, Image, Dimensions} from "react-native";
import { Colors } from "../styles/colors";
import { FishData, TileInputData, TileData, ArtifactData, PenguinData, GarbageData, UrlData } from "../types/types";
import IslandArea from "./IslandArea";
import FooterArea from "./FooterArea";
import Header from "./Header";
import convert from "./FetchServer";


const MOVE_INTERVAL = 2000;
const SCORE_INCREMENT = 10;
const NOT_STARTED = 0;
const RUNNING = 1;
const PAUSED = 2;
const ENDED = 3;

const URLS= [{name:"aws",url:"https://ayv5bav97c.execute-api.us-east-1.amazonaws.com/Prod/"},
  {name:"digital ocean", url:"https://lub3kygki2.execute-api.us-east-1.amazonaws.com/Prod/"},
  {name:"local", url:"http://localhost:3001/"}];


export default function Game(): JSX.Element {

  const [island,setIsland] = useState<any>({});
  const [baseURL,setBaseURL] = useState<UrlData>({name:"local", url:"http://192.168.178.30:3001/"});
  const [admin,setAdmin] = useState(false);
  const [followId, setFollowId] = useState<number>(0);
  const [selectedId,setSelectedId] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [showBalloons,setShowBalloons] = useState(false);
  const [pulser,setPulser] = useState(false);

  const [runningState, setRunningState] = useState<number>(NOT_STARTED);
  const [illuminatedId,setIlluminatedId] = useState<number>(0);

  const windowDimensions = Dimensions.get('window');
  const screenDimensions = Dimensions.get('screen');

  useEffect(() => {
    if (runningState === RUNNING || runningState === PAUSED ) {
      if(!island.id) {
        getNewIsland(baseURL.url)
        .then((newIsland ) => setIsland(newIsland));
      }
      const intervalId = setInterval( () => {
        refreshIsland(baseURL.url, island.id, followId)
        .then((updatedIsland) => {
          setIsland(updatedIsland);         
        });

        setFollowId(0);

      },MOVE_INTERVAL)
      return () => clearInterval(intervalId);
      
    } 

  },[runningState,island,baseURL,followId,selectedId]);

  useEffect(() => {
    if (pulser) {
      const pulserIntervalId = setInterval( () => {
        sendState(baseURL.url);
      },2000)
      return () => {clearInterval(pulserIntervalId)};
    } 
  },[pulser,baseURL]);  

  const handleStartButton = () => {
    if (runningState !== RUNNING) {
      setRunningState(RUNNING)
      setRunning(baseURL.url, island.id, true)
      // console.log("BUTTON START PRESSED");
    } else {
      setRunningState(PAUSED)
      setRunning(baseURL.url, island.id, true)
      // console.log("BUTTON START PRESSED");
    }
  } 

  const handleReloadButton = () => {
    setRunningState(NOT_STARTED)
    setIsland({});
    // console.log("BUTTON START PRESSED");
  } 

  // const handlePlusButton = () => {
  //   setRunningState(RUNNING);
  //   setIsland({});
  //   // console.log("BUTTON PLUS PRESSED");
  // } 

  const handleCloneButton = () => {
    // setSidebar( !sidebar);
    // console.log("BUTTON CLONE PRESSED");
  } 

  const handleStepsButton = () => {
    setPulser(!pulser);
    // console.log("BUTTON STEPS PRESSED");
  } 

  const handleAdminButton = () => {
    //if (sidebar) {
    //  setSidebar(false);
    // } 
    // setAdminbar(!adminbar);
    // console.log("BUTTON ADMIN PRESSED");
  } 

  // const handleCloseButton = () => {
  //   setSidebar(false);
  //   setAdminbar(false);
  //   // console.log("BUTTON CLOSE PRESSED");
  // } 

  // const handleLogoutButton = () => {
  //   setSidebar(false);
  //   setAdminbar(false);
  //   setAdmin(false);
  //   console.log("LOGOUT CLOSE PRESSED");
  // } 

  // const handleDetailsCloseButton = () => {
  //   setSelectedId(0);
  //   setIlluminatedId(0);
  //   setFollowId(0);
  // }

  const handleTileClick = (x: number, y:number) => { 
    // console.log("TILE CLICKED AT " + x + "/" + y);

    // const apenguin = island.penguins.find(penguin => penguin.hpos === x && penguin.lpos === y);
    // if (apenguin && apenguin.alive) {
    //   if (apenguin.key === selectedId) {
    //     setSelectedId(0);
    //     setIlluminatedId(0);
    //     setFollowId(0);
    //   } else {
    //     // console.log("FOUND PENGUIN " + apenguin.name + " " + apenguin.key + " AT " + x + "/" + y);
    //     setSelectedId(apenguin.key);
    //     setIlluminatedId(apenguin.key);
    //     setFollowId(apenguin.key);
    //   }
    // } else {
       setTile(baseURL.url,island.id,x,y)
    //   .then((updatedIsland) => setIsland(updatedIsland));
    // }
  } 

  // const handlePenguinEnter = (id) => {
  //   setIlluminatedId(id);
  // }

  // const handlePenguinLeave = () => {
  //   if (illuminatedId > 0) {
  //     setIlluminatedId(0);
  //   }
  // }

  // const handleIslandSelect = (id) => {
  //   setSidebar(false);
  //   setAdminbar(false);
  //   setRunningState(RUNNING);
  //   refreshIsland(baseURL.url, id)
  //   .then((updatedIsland) => setIsland(updatedIsland));
  // }

  // const handleIslandDelete = (idList) => {
  //   idList.forEach(islandId => {
  //     console.log("doing delete " + islandId)
  //     refreshIslandsList(baseURL.url,islandId)
  //     .then((updatedIslandsList) => setIslandsList(updatedIslandsList));

  //     if (islandId === island.id) {
  //       setRunningState(NOT_STARTED);
  //       setIsland({});
  //     }

  //   })
  // }

  // const handleURLSelect = (url) => {

  //   console.log("URL SELECTED " + url)
  //   setBaseURL(url);
  //   setIsland({});
  //   setRunningState(NOT_STARTED);
  //   setSidebar(false);
  //   setAdminbar(false);
  // }

  // const handlUserInput = (user,pwd) => {
  //   setAdmin(user === "admin" && pwd==="admin")
  //   setSidebar(false);
  //   setAdminbar(false);
  // }

  // const handleSetBalloons = (checkBalloons) => {
  //   console.log("BALLOOMS " + checkBalloons);
  //   setShowBalloons(checkBalloons);
  // }


  const sendState = async (baseURL : string) => {
    const data = await convert(baseURL + "state");
    return data;
  }

  const reloadGame = () => {
    setIsGameOver(false);
    setScore(0);
    setIsPaused(false);
  };

  const pauseGame = () => {
    setIsPaused(!isPaused);
  };

  const getNewIsland = async (baseURL : string) => {
    const islandData = await convert(baseURL + "island")
    return extractIslandData(islandData);
  }

  const setTile = async (baseURL : string ,islandId : number,x : number,y: number) => {
    const islandData = await convert(baseURL + "setTile?islandId=" + islandId + "&hpos=" + y + "&lpos=" + x)
    return extractIslandData(islandData);
  }


  // console.log("-------- window --------");
  // Object.entries(windowDimensions).map(([key, value]) => (console.log(key + "-" + value)));
  // console.log("-------- screen --------");
  // Object.entries(screenDimensions).map(([key, value]) => (console.log(key + "-" + value)));
  // console.log("------------------------");

  var screenwidth = screenDimensions.width;

  if (screenwidth % 12 < 2) {
    screenwidth =  screenDimensions.width -4;
  }

  var margins = Math.floor(screenwidth % 12)
  var squareSize = Math.floor(screenwidth / 12);
  var areaSize = squareSize * 12;
  var screenSize = screenDimensions.width;
  var footerHeight = windowDimensions.height - areaSize;
  var topMargin = (screenDimensions.height - windowDimensions.height) / 2; 

  // console.log("Squaresize : " + squareSize);
  // console.log("margins : " + margins);

  return (
      <SafeAreaView style={{width: screenSize, backgroundColor: Colors.backcolor, paddingTop: topMargin }}>
        <ImageBackground source={require("../images/TapTapHeaderBar.png")} style={{width: screenSize, height : squareSize }} imageStyle={{ resizeMode: 'center' }}> 
        <View style={{width: areaSize, height : squareSize, }}>
          
            <Header
              onStartButton={handleStartButton}
              onReloadButton={handleReloadButton}
              onCloneButton={handleCloneButton}
              onStepsButton={handleStepsButton}
              onAdminButton={handleAdminButton}
              island={island}
              admin={admin}
              runningState={runningState}
              squareSize={squareSize}
              pulser={pulser}/> 
          
        </View>
        </ImageBackground> 
        <ImageBackground source={require("../images/TapTapBackSquare.png")} style={{width: areaSize, height : areaSize }} imageStyle={{ resizeMode: 'center' }}> 
            <View style={[{ width: screenSize, height : screenSize, borderWidth : margins}, styles.basebounds]}>
              <IslandArea  
                runningState = {runningState}
                island = {island} 
                handleTileClick ={handleTileClick} 
                illuminatedId = {illuminatedId} 
                showBalloons = {showBalloons}
                squareSize = {squareSize}
                areaSize = {areaSize - margins} />
            </View> 
        </ImageBackground> 
          <View style={[{ width: screenSize, height : footerHeight, borderWidth : margins, padding : 4 }, styles.footerbounds]}>
            <FooterArea 
                runningState = {runningState}
                island = {island}
                squareSize = {squareSize}  />
          </View>
      </SafeAreaView>
  );
  
}

const styles = StyleSheet.create({
  container: {
    width:'100%',
    flexDirection: "column",
    backgroundColor: Colors.backcolor,
  },
  boundaries: {
    flexDirection: "row",
    borderColor: Colors.primary,
    borderWidth: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: Colors.backcolor,
  },
  basebounds: {
    
    backgroundColor : Colors.backcolor,
    borderColor : Colors.bordercolor,
  },
  footerbounds: {
      
      backgroundColor : Colors.backcolor,
      borderColor : Colors.bordercolor,
  },
});


const setRunning = async (baseURL : string, islandId : number, isrunning :boolean) => {
  if (islandId > 0) {
    await convert(baseURL + "setrunning?islandId=" + islandId + "&runningstate=" + isrunning);
  } 
}

const refreshIsland = async (baseURL :string,islandId :number,followId : number) => {
  var followString = "";
  if (followId > 0) {
    followString =  "&followId=" + followId;
    
  } 
  const islandData = await convert(baseURL + "islandmoves?islandId=" + islandId + followString);
  return extractIslandData(islandData);
}


const extractIslandData = (islandData : any) => {

  // console.dir(islandData)

  const tiles : TileData [] = [];
  const artifacts : ArtifactData [] = [];
  const penguins : PenguinData [] = [];
  const fishes : FishData[] = [];
  const garbages: GarbageData [] = [];

  if (islandData && islandData.island) {

    islandData.island.forEach((tile : TileInputData) => {
      tiles.push({key: tile.li *1000 + tile.col, type: tile.nat, num: tile.sml, ta: tile.ta, line: tile.li, col:tile.col})
      artifacts.push({key: (100000 + tile.li *1000 + tile.col), type: tile.art, age: tile.age, line: tile.li, col:tile.col})
    }); 

    islandData.penguins.forEach((penguin : PenguinData)  => {
      var gender = penguin.gender==="male"?"m":"f";
      if (penguin.age < 6 ) gender = "y";
      var activity = 0;
      if (penguin.eating > 0) {
        activity = 1;
      } else if (penguin.fishTime > 0) {
        activity = 2;
      } else if (penguin.loving > 0) {
        activity = 3;
      } else if (penguin.digTime > 0) {
        activity = 4;
      } else if (penguin.fillTime > 0) {
        activity = 5;
      }

      
      penguins.push({id: penguin.id, 
                    alive:penguin.alive, 
                    name:penguin.name, 
                    lpos:penguin.lpos, 
                    hpos:penguin.hpos, 
                    hasIce:penguin.hasIce, 
                    gender: gender, 
                    activity: activity, 
                    hungry:penguin.hungry, 
                    wealth:penguin.wealth, 
                    fat:penguin.fat, 
                    age:penguin.age, 
                    genderName:penguin.gender, 
                    loving:penguin.loving,
                    fishTime: penguin.fishTime,
                    fishDirection:penguin.fishDirection, 
                    eating:penguin.eating,
                    digTime:penguin.digTime,
                    digDirection:penguin.digDirection, 
                    fillTime: penguin.fillTime,
                    fillDirection:penguin.fillDirection, 
                    strategyShort:penguin.strategyShort, 
                    moveDirection:penguin.moveDirection, 
                    knownWorld: penguin.knownWorld,
                    vision: penguin.vision,
                    targetDirections: penguin.targetDirections,
                    targetLPos: penguin.targetLPos,
                    targetHPos: penguin.targetHPos,
                    path:penguin.path,
                    illuminated:false})
    }); 

    if (islandData.fishes) { 
      islandData.fishes.forEach((fish : FishData) => {
        fishes.push({id: fish.id, 
                    lpos:fish.lpos, 
                    hpos:fish.hpos, 
                    onHook:fish.onHook, 
                    staying:fish.staying,
                    fishDirection:fish.fishDirection})
      }); 
    }

    if (islandData.garbages) { 
      islandData.garbages.forEach((garbage : GarbageData)  => {
        garbages.push({id: garbage.id, 
                    lpos:garbage.lpos, 
                    hpos:garbage.hpos, 
                    kind:garbage.kind})
      }); 
    }

    return {id: islandData.islandId,
            name: islandData.islandName,
            size: islandData.islandSize,
            points: islandData.lastInvocation,
            year: islandData.year,
            weather: islandData.weather,
            temperature : islandData.temperature,
            plasticControl: islandData.plasticControl,
            oceanTemperature: islandData.oceanTemperature,
            tilesCount: islandData.tiles,
            foodCount: islandData.food,
            counter: islandData.counter,
            running: islandData.running,
            runonce: islandData.runonce,
            tiles: tiles,
            artifacts: artifacts,
            penguins: penguins,
            fishes: fishes,
            garbages: garbages}


  } else {
    return {}
  }

}