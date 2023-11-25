import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View, Text, ImageBackground, Image, Dimensions} from "react-native";
import { Colors } from "../styles/colors";
import { FishData, TileInputData, TileData, ArtifactData, PenguinData, GarbageData, UrlData } from "../types/types";
import IslandArea from "./IslandArea";
import FooterArea from "./FooterArea";
import Header from "./Header";
import convert from "./FetchServer";

import * as constants from "./Constants"

export default function Game(): JSX.Element {

  const [sidebar,setSidebar] = useState<boolean>(false);
  const [adminbar,setAdminbar] = useState<boolean>(false);
  const [runningState, setRunningState] = useState<number>(constants.NOT_STARTED);
  const [admin,setAdmin] = useState<boolean>(false);
  const [showBalloons,setShowBalloons] = useState<boolean>(false);
  const [island,setIsland] = useState<any>({});
  const [baseURL,setBaseURL] = useState<UrlData>({name:"local", url:"http://127.0.0.1:5000/"});
  const [illuminatedKey,setIlluminatedKey] = useState<number>(0);
  const [selectedKey,setSelectedKey] = useState<number>(0);
  const [boardSize,setBoardSize] = useState<number>(9)
  const [boardDifficulty, setBoardDificulty] = useState<number>(2)
  const [tileSize,setTileSize] = useState<number>(64);
  const [gridClass,setGridClass] = useState<string>('GridClass64');
  const [islandsList,setIslandsList] = useState<any>([]);
  const [movedPenguins,setMovedPenguins] = useState<any>([]);
  const [renewSpeed,setRenewSpeed] = useState<number>(2000)
  const [moveSpeed,setMoveSpeed] = useState<number>(1500)

  const windowDimensions = Dimensions.get('window');
  const screenDimensions = Dimensions.get('screen');

  
//   useEffect(() => {
//     document.title = 'TAP TAP Penguin (' + baseURL.name + ")";
//   },[baseURL]);

  useEffect(() => {
    refreshIslandsList(baseURL.url)
    .then((updatedIslandsList) => setIslandsList(updatedIslandsList));
  },[baseURL]);
  
  useEffect(() => {
      let intervalId 
      if (runningState === constants.RUNNING && island && island.id > 0 ) {
          intervalId = setInterval( () => {
              refreshIsland(baseURL.url, island.id)
              .then((updatedIsland) => {
                  setMovedPenguins([]);
                  setIsland(updatedIsland);
                  setRenewSpeed(2200-updatedIsland.evolutionSpeed * 200);
                  setMoveSpeed(1650-updatedIsland.evolutionSpeed * 150);
          
                  updatedIsland.penguins.forEach(penguin => {
                    if (penguin.key === selectedKey && ! penguin.alive) setSelectedKey(0);
                  });
          
                  if ( ! updatedIsland.running) {
                    setRunningState(constants.ENDED)
                  } 
          
                  if (updatedIsland.islands) {
                    setIslandsList(updatedIsland.islands);
                  }
              });
          },renewSpeed)
      }  else {
        clearInterval(intervalId);
      } 
      return () => {
      clearInterval(intervalId);
      }

  },[runningState,island,baseURL]);

  const handleCreateButton = () => { // size : number,difficulty :number) => {

    let size : number = 9;
    let difficulty : number = 2;
    console.log("received values " + size + " " + difficulty) 

    setRunningState(constants.RUNNING)   
    setBoardSize(size);
    setBoardDificulty(difficulty);
    setSelectedKey(0)
    getNewIsland(baseURL.url,size,difficulty)
    .then((newIsland ) => {
      if (newIsland.size === 6) {
        setTileSize(96);
        setGridClass('GridArea96');
      } else if (newIsland.size === 9) {
        setTileSize(64);
        setGridClass('GridArea64');
      } else {
        setTileSize(48);
        setGridClass('GridArea48');
      }  
      setIsland(newIsland)
    }); 
  }

  const handleStartButton = () => {
    setRunningState(constants.RUNNING) 
    console.log("BUTTON START PRESSED");  
  }

  const handleOnceButton = () => {
    if (runningState !== constants.RUNNING && island && island.id > 0 ) {
      refreshIsland(baseURL.url, island.id)
      .then((updatedIsland) => {
        setMovedPenguins([]);
        setIsland(updatedIsland);
        setRenewSpeed(2200-updatedIsland.evolutionSpeed * 200);
        setMoveSpeed(1650-updatedIsland.evolutionSpeed * 150);

        updatedIsland.penguins.forEach(penguin => {
          if (penguin.key === selectedKey && ! penguin.alive) setSelectedKey(0);
        });

        if ( ! updatedIsland.running) {
          setRunningState(constants.ENDED)
        } 

        if (updatedIsland.islands) {
          setIslandsList(updatedIsland.islands);
        }
      });
    } 
    console.log("BUTTON ONCE PRESSED");
  }

  const handleStopButton = () => {
    if(runningState === constants.RUNNING) {
      setRunningState(constants.PAUSED)
    } else {
      setRunningState(constants.RUNNING);
    }
    console.log("BUTTON STOP PRESSED");
  } 

  const handlePlusButton = () => {
    setRunningState(constants.NOT_STARTED);
    console.log("BUTTON PLUS PRESSED");
  } 

  const handleCloneButton = () => {
    setSidebar( !sidebar);
    console.log("BUTTON CLONE PRESSED");
  } 

  const handleAdminButton = () => {
    if (sidebar) {
      setSidebar(false);
    } 
    setAdminbar(!adminbar);
    console.log("BUTTON ADMIN PRESSED");
  } 

  const handleCloseButton = () => {
    setSidebar(false);
    setAdminbar(false);
    console.log("BUTTON CLOSE PRESSED");
  } 

//   const handleLogoutButton = () => {
//     setSidebar(false);
//     setAdminbar(false);
//     setAdmin(false);
//     // console.log("LOGOUT CLOSE PRESSED");
//   } 

//   const handleDetailsCloseButton = () => {
//     setSelectedKey(0);
//     setIlluminatedKey(0);
//   }

const handleTileClick = (vpos:number,hpos:number) => {
     console.log("TILE CLICKED AT " + vpos + "/" + hpos);
    
//     if (selectedKey > 0) {
//       const apenguin = island.penguins.find(penguin => penguin.vpos === vpos && penguin.hpos === hpos);
//       if (apenguin && apenguin.key === selectedKey) {
//         setSelectedKey(0);
//         setIlluminatedKey(0);
//       } else  {
        
//         const selectedPenguin = island.penguins.find(penguin => penguin.key === selectedKey );
//         const afish = island.fishes.find(fish => fish.vpos === vpos && fish.hpos === hpos);
//         const targetPenguin = island.penguins.find(penguin => penguin.vpos === vpos && penguin.hpos === hpos);
//         const agem = island.gems.find(gem => gem.vpos === vpos && gem.hpos === hpos);
//         const agarbage = island.garbages.find(garbage => garbage.vpos === vpos && garbage.hpos === hpos);
//         const acell = island.tiles.find(tile => tile.vpos === vpos && tile.hpos === hpos);

//         // console.log("on " + vpos + "/" + hpos + ", seledcted = " + selectedPenguin.vpos + "/" + selectedPenguin.hpos )

//         if (selectedPenguin && selectedPenguin.activity == constants.ACTIVITY_NONE &&
//             ((Math.abs(vpos - selectedPenguin.vpos) === 1 && hpos === selectedPenguin.hpos) || 
//             (Math.abs(hpos - selectedPenguin.hpos) === 1 && vpos === selectedPenguin.vpos))) {

//           let command1 = ""
//           let command2 = ""
//           let dir = "D" 

//           if (vpos < selectedPenguin.vpos) {
//             dir = "U"
//           } else if (vpos > selectedPenguin.vpos) {
//             dir = "D"
//           } else {
//             if (hpos < selectedPenguin.hpos) {
//               dir = "L"
//             } else {
//               dir = "R"
//             }
//           }

//           if (afish && ! afish.onHook && selectedPenguin.gender !== "y") {
//             command1 = "F"
//             command2 = dir
//             selectedPenguin.goal = constants.ACTIVITY_FISHING
//             selectedPenguin.activityText = "Going to fish"
//             console.log("there is a fish")
//           } else if (agem && ! agem.isTaken && selectedPenguin.gender !== "y") {
//             command1 = "G"
//             command2 = dir
//             selectedPenguin.goal = constants.ACTIVITY_GETING
//             console.log("There is a gem")
//             selectedPenguin.activityText = "Going to grab some ice "
//           } else if (agarbage && ! agarbage.isTaken && selectedPenguin.gender !== "y") {
//             command1 = "C"
//             command2 = dir
//             selectedPenguin.goal = constants.ACTIVITY_CLEANING
//             console.log("There is a garbage")  
//             selectedPenguin.activityText = "Going to clean"  
//           } else if (targetPenguin && selectedPenguin.gender !== "y" && targetPenguin.gender !== selectedPenguin.gender) {
//               command1 = "K"
//               command2 = dir
//               selectedPenguin.goal = constants.ACTIVITY_LOVING
//               selectedPenguin.activityText = "Going to love"
//               console.log("there is a loved once")
//           } else if (acell.type > 0 && ! agem) {
//             command1 = dir.toUpperCase().substring(0,1)  
//             if (command1 === "L") {
//               selectedPenguin.activityDirection =1;
//             } else if (command1 === "R") {
//               selectedPenguin.activityDirection =2;
//             } else if (command1 === "U") {
//               selectedPenguin.activityDirection =3;
//             } else if (command1 === "D") {
//               selectedPenguin.activityDirection =4;
//             }
//             selectedPenguin.goal = constants.ACTIVITY_MOVING
//             console.log("It's going to " + command1)
//             selectedPenguin.activityText = "Going to move to " + command1
//           } else if (acell.type === 0 && selectedPenguin.hasGem && selectedPenguin.gender !== "y") {
//             command1 = "B"
//             command2 = dir  
//             selectedPenguin.goal = constants.ACTIVITY_BUILDING
//             console.log("Let's build " + dir)
//             selectedPenguin.activityText = "Going to move"
//           } 

//           if (command1 !== "") {
//             setCommand(baseURL.url,island.id,selectedKey,command1,command2)
//             .then((updatedIsland) => setIsland(updatedIsland));
//           }  

//         } else {
//           if (targetPenguin && targetPenguin.alive) {
//             setSelectedKey(targetPenguin.key);
//             setIlluminatedKey(targetPenguin.key);
//           }
//         }
//       }
//     } else {
//       const apenguin = island.penguins.find(penguin => penguin.vpos === vpos && penguin.hpos === hpos);
//       if (apenguin && apenguin.alive) {
//         setSelectedKey(apenguin.key);
//         setIlluminatedKey(apenguin.key);
//       }
//     }
} 

//   const handleEatButton = (key) => {
//     console.log("EAT BUTToN PRESSED for " + key);
   
//     const selectedPenguin = island.penguins.find(penguin => penguin.key === selectedKey );
//     selectedPenguin.goal = 1
//     selectedPenguin.activityText = "Going to eat "

//     setCommand(baseURL.url,island.id,key,"E","")
//     .then((commandData) => console.log(commandData));
//     setSelectedKey(0);
//     setIlluminatedKey(0);
//     setIsland(island)
    
//   } 

//   const handlePenguinClick = (key) => {
//     console.log("PENGUIN CLICK ON " + key)
//     setSelectedKey(key);
//     setIlluminatedKey(key);

//   }

//   const handlePenguinEnter = (id) => {
//     setIlluminatedKey(id);
//   }

//   const handlePenguinLeave = () => {
//     if (illuminatedKey > 0) {
//       setIlluminatedKey(0);
//     }
//   }

//   const handleIslandSelect = (id,size) => {
//     setSidebar(false);
//     setAdminbar(false);

//     if (size === 6) {
//       setTileSize(96);
//       setGridClass('GridArea96');
//     } else if (size === 9) {
//       setTileSize(64);
//       setGridClass('GridArea64');
//     } else {
//       setTileSize(48);
//       setGridClass('GridArea48');
//     }  

//     setRunningState(constants.RUNNING);
//     refreshIsland(baseURL.url, id)
//     .then((updatedIsland) => setIsland(updatedIsland));
//   }

//   const handleIslandDelete = (idList) => {
//     idList.forEach(islandId => {
//       console.log("doing delete " + islandId)
//       refreshIslandsList(baseURL.url,islandId)
//       .then((updatedIslandsList) => setIslandsList(updatedIslandsList));

//       if (islandId === island.id) {
//         setRunningState(constants.NOT_STARTED);
//         setIsland({});
//       }

//     })
//   }

//   const handleURLSelect = (url) => {

//     console.log("URL SELECTED " + url)
//     setBaseURL(url);
//     setIsland({});
//     setRunningState(constants.NOT_STARTED);
//     setSidebar(false);
//     setAdminbar(false);
//   }

//   const handlUserInput = (user,pwd) => {
//     setAdmin(user === "admin" && pwd==="admin")
//     setSidebar(false);
//     setAdminbar(false);
//   }

//   const handleSetBalloons = (checkBalloons) => {
//     console.log("BALLOOMS " + checkBalloons);
//     setShowBalloons(checkBalloons);
//   }

//   return (
//     <div className="App">
//       <Sidebar admin={admin} baseURL={baseURL} onCloseButton={handleCloseButton} onIslandSelect={handleIslandSelect} onIslandDelete={handleIslandDelete} islandId={island.id} islandsList={islandsList} sidebar={sidebar}/>
//       <Adminbar showBalloons={showBalloons} admin={admin} baseURL={baseURL} onCloseButton={handleCloseButton} onLogoutButton={handleLogoutButton} onSetBalloons={handleSetBalloons} adminbar={adminbar} urls={urls} onURLSelect={handleURLSelect} onUserInput={handlUserInput}/>
//       <Navbar runningState={runningState} island={island} admin={admin} onStartButton={handleStartButton} onOnceButton={handleOnceButton} onStopButton={handleStopButton} onPlusButton={handlePlusButton} onCloneButton={handleCloneButton} onAdminButton={handleAdminButton} />
//       <div className="WorkArea">
//         {runningState === constants.NOT_STARTED && <Startup originalSize={boardSize} originalDifficulty={boardDifficulty} onCreateButton={handleCreateButton}/>}
//         {runningState !== constants.NOT_STARTED && <IslandArea showBalloons={showBalloons} runningState={runningState} island={island} onTileClick={handleTileClick} illuminatedKey={illuminatedKey} movedPenguins={movedPenguins} tileSize={tileSize} gridClass={gridClass} moveSpeed={moveSpeed}/>}
//         {runningState !== constants.NOT_STARTED && selectedKey === 0 && (<Footer penguins={island.penguins} onPenguinEnter={handlePenguinEnter} onPenguinLeave={handlePenguinLeave} onPenguinClick={handlePenguinClick} illuminatedKey={illuminatedKey}/>)}
//         {runningState !== constants.NOT_STARTED && selectedKey > 0 && (<Details penguinObj={island.penguins.find(penguin => penguin.key === selectedKey)} onDetailsCloseButton={handleDetailsCloseButton} onEatButton={handleEatButton}/> )}
//         {runningState === constants.NOT_STARTED && <div className="Footer">&nbsp;</div>}
//       </div>
//     </div>
//   );

var screenwidth = screenDimensions.width;

  if (screenwidth % boardSize < 2) {
    screenwidth =  screenDimensions.width -4;
  }

  var margins = Math.floor(screenwidth % boardSize)
  var squareSize = Math.floor(screenwidth / boardSize);
  var unitSize = Math.floor(screenwidth / 12);
  var areaSize = squareSize * boardSize;
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
              onCreateButton={handleCreateButton}
              onOnceButton={handleOnceButton}
              onCloneButton={handleCloneButton}
              onStopButton={handleStopButton}
              onPlusButton={handlePlusButton}
              onAdminButton={handleAdminButton}
              island={island}
              admin={admin}
              unitSize = {unitSize}
              runningState={runningState}
              /> 
          
        </View>
        </ImageBackground> 
        <ImageBackground source={require("../images/TapTapBackSquare.png")} style={{width: areaSize, height : areaSize }} imageStyle={{ resizeMode: 'center' }}> 
            <View style={[{ width: screenSize, height : screenSize, borderWidth : margins}, styles.basebounds]}>
              <IslandArea  
                runningState = {runningState}
                island = {island} 
                handleTileClick ={handleTileClick} 
                illuminatedKey = {illuminatedKey} 
                showBalloons = {showBalloons}
                squareSize = {squareSize}
                areaSize = {areaSize - margins} />
            </View> 
        </ImageBackground> 
          <View style={[{ width: screenSize, height : footerHeight, borderWidth : margins, padding : 4 }, styles.footerbounds]}>
            <FooterArea 
                runningState = {runningState}
                island = {island}
                unitSize = {unitSize}  />
          </View>
      </SafeAreaView>
  );

}

const getNewIsland = async (baseURL : string,boardSize : number ,boardDifficulty: number) : Promise<any> => {
  const islandData = await convert(baseURL + "create?size=" + boardSize + "&difficulty=" + boardDifficulty)
  return extractIslandData(islandData);
}

const refreshIsland = async (baseURL : string ,islandId:number) : Promise<any>  => {
  const islandData = await convert(baseURL + "refresh/" + islandId);
  return extractIslandData(islandData);
}

const setCommand = async (baseURL : string ,islandId : number ,penguinId : number ,command1: string,command2:string) : Promise<any>=> {
   const islandData = await convert(baseURL + "command/" + islandId + "?penguinId=" + penguinId + "&command1=" + command1 + "&command2=" + command2  );
   return extractIslandData(islandData);
}

const refreshIslandsList = async (baseURL :string ,islandToDelete : number =0) : Promise<any> => {
  if (islandToDelete > 0) {
    const islandsListData = await convert(baseURL + "deleteIsland?islandId=" + islandToDelete );
    return islandsListData.islands;
  } else {
    const islandsListData = await convert(baseURL + "islands" );
    return islandsListData.islands;
  }
}

const extractIslandData = (islandData :any) : any => {

  const tiles = [];
  const artifacts = [];
  const penguins = [];
  const fishes = [];
  const gems = [];
  const garbages = [];
  const islands = [];

  if (islandData) {

    islandData.cells.forEach(cell => {
      tiles.push({key: cell.key, 
                type: cell.cellType, 
                angle: cell.angle, 
                vpos: cell.vpos, 
                hpos: cell.hpos})
    }); 

    islandData.penguins.forEach(penguin => {
      var gender = penguin.gender==="M"?"m":"f";
      var genderName  = penguin.gender==="M"?"Male":"Female";
      if (penguin.age < 3 ) gender = "y";
      var activity = penguin.activity;

      penguins.push({key: penguin.key, 
                    alive:penguin.alive, 
                    name:penguin.name, 
                    vpos:penguin.vpos, 
                    hpos:penguin.hpos, 
                    hasGem:penguin.hasGem, 
                    hasFish:penguin.hasFish,
                    gender: gender, 
                    activity: activity, 
                    hunger:penguin.hunger, 
                    temp:penguin.temp, 
                    shape:penguin.figure, 
                    age:penguin.age, 
                    genderName:genderName, 
                    activityDirection:penguin.activityDirection, 
                    activityText:penguin.activityText, 
                    goal:penguin.goal,
                    vision: 2,
                    targetDirections: penguin.activityTarget,
                    targetvpos: 0, 
                    targetHPos: 0, 
                    path:"",
                    inLove:penguin.inLove})
    }); 

    if (islandData.fishes) { 
      islandData.fishes.forEach(fish => {
        fishes.push({key: fish.key, 
                    vpos:fish.vpos, 
                    hpos:fish.hpos, 
                    onHook:fish.onHook, 
                    staying:false,
                    direction:fish.direction})
      }); 
    }

    if (islandData.gems) { 
      islandData.gems.forEach(gem => {
        gems.push({key: gem.key, 
                    vpos:gem.vpos, 
                    hpos:gem.hpos, 
                    age:gem.age,
                    isTaken:gem.isTaken})
      }); 
    }

    if (islandData.garbages) { 
      islandData.garbages.forEach(garbage => {
        garbages.push({key: garbage.key, 
                    vpos:garbage.vpos, 
                    hpos:garbage.hpos, 
                    kind:garbage.kind + 1})
      }); 
    }

    if (islandData.islands) { 
      islandData.islands.forEach(anisland => {
        islands.push({key: anisland.id,
                      id: anisland.id, 
                      name: anisland.name,
                      year: anisland.year,
                      size: anisland.size})
              
      }); 
    } 

    return {id: islandData.id,
            name: islandData.name,
            size: islandData.size,
            points: islandData.points,
            year: islandData.year,
            weather: islandData.weather,
            plasticControl: true,
            evolutionSpeed : islandData.evolutionSpeed,
            running: islandData.onGoing,
            tiles: tiles,
            artifacts: artifacts,
            penguins: penguins,
            fishes: fishes,
            gems: gems,
            garbages: garbages,
            islands: islands
          }

  } else {
    return {}
  }
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

// export default function Game(): JSX.Element {

//   const [island,setIsland] = useState<any>({});
//   const [baseURL,setBaseURL] = useState<UrlData>({name:"local", url:"http://192.168.178.30:3001/"});
//   const [admin,setAdmin] = useState(false);
//   const [followId, setFollowId] = useState<number>(0);
//   const [selectedId,setSelectedId] = useState<number>(0);
//   const [score, setScore] = useState<number>(0);
//   const [isGameOver, setIsGameOver] = useState<boolean>(false);
//   const [isPaused, setIsPaused] = useState<boolean>(false);
//   const [showBalloons,setShowBalloons] = useState(false);
//   const [pulser,setPulser] = useState(false);

//   const [runningState, setRunningState] = useState<number>(NOT_STARTED);
//   const [illuminatedId,setIlluminatedId] = useState<number>(0);

//   const windowDimensions = Dimensions.get('window');
//   const screenDimensions = Dimensions.get('screen');

//   useEffect(() => {
//     if (runningState === RUNNING || runningState === PAUSED ) {
//       if(!island.id) {
//         getNewIsland(baseURL.url)
//         .then((newIsland ) => setIsland(newIsland));
//       }
//       const intervalId = setInterval( () => {
//         refreshIsland(baseURL.url, island.id, followId)
//         .then((updatedIsland) => {
//           setIsland(updatedIsland);         
//         });

//         setFollowId(0);

//       },MOVE_INTERVAL)
//       return () => clearInterval(intervalId);
      
//     } 

//   },[runningState,island,baseURL,followId,selectedId]);

//   useEffect(() => {
//     if (pulser) {
//       const pulserIntervalId = setInterval( () => {
//         sendState(baseURL.url);
//       },2000)
//       return () => {clearInterval(pulserIntervalId)};
//     } 
//   },[pulser,baseURL]);  

//   const handleStartButton = () => {
//     if (runningState !== RUNNING) {
//       setRunningState(RUNNING)
//       setRunning(baseURL.url, island.id, true)
//       // console.log("BUTTON START PRESSED");
//     } else {
//       setRunningState(PAUSED)
//       setRunning(baseURL.url, island.id, true)
//       // console.log("BUTTON START PRESSED");
//     }
//   } 

//   const handleReloadButton = () => {
//     setRunningState(NOT_STARTED)
//     setIsland({});
//     // console.log("BUTTON START PRESSED");
//   } 

//   // const handlePlusButton = () => {
//   //   setRunningState(RUNNING);
//   //   setIsland({});
//   //   // console.log("BUTTON PLUS PRESSED");
//   // } 

//   const handleCloneButton = () => {
//     // setSidebar( !sidebar);
//     // console.log("BUTTON CLONE PRESSED");
//   } 

//   const handleStepsButton = () => {
//     setPulser(!pulser);
//     // console.log("BUTTON STEPS PRESSED");
//   } 

//   const handleAdminButton = () => {
//     //if (sidebar) {
//     //  setSidebar(false);
//     // } 
//     // setAdminbar(!adminbar);
//     // console.log("BUTTON ADMIN PRESSED");
//   } 

//   // const handleCloseButton = () => {
//   //   setSidebar(false);
//   //   setAdminbar(false);
//   //   // console.log("BUTTON CLOSE PRESSED");
//   // } 

//   // const handleLogoutButton = () => {
//   //   setSidebar(false);
//   //   setAdminbar(false);
//   //   setAdmin(false);
//   //   console.log("LOGOUT CLOSE PRESSED");
//   // } 

//   // const handleDetailsCloseButton = () => {
//   //   setSelectedId(0);
//   //   setIlluminatedId(0);
//   //   setFollowId(0);
//   // }

//   const handleTileClick = (x: number, y:number) => { 
//     // console.log("TILE CLICKED AT " + x + "/" + y);

//     // const apenguin = island.penguins.find(penguin => penguin.hpos === x && penguin.lpos === y);
//     // if (apenguin && apenguin.alive) {
//     //   if (apenguin.key === selectedId) {
//     //     setSelectedId(0);
//     //     setIlluminatedId(0);
//     //     setFollowId(0);
//     //   } else {
//     //     // console.log("FOUND PENGUIN " + apenguin.name + " " + apenguin.key + " AT " + x + "/" + y);
//     //     setSelectedId(apenguin.key);
//     //     setIlluminatedId(apenguin.key);
//     //     setFollowId(apenguin.key);
//     //   }
//     // } else {
//        setTile(baseURL.url,island.id,x,y)
//     //   .then((updatedIsland) => setIsland(updatedIsland));
//     // }
//   } 

//   // const handlePenguinEnter = (id) => {
//   //   setIlluminatedId(id);
//   // }

//   // const handlePenguinLeave = () => {
//   //   if (illuminatedId > 0) {
//   //     setIlluminatedId(0);
//   //   }
//   // }

//   // const handleIslandSelect = (id) => {
//   //   setSidebar(false);
//   //   setAdminbar(false);
//   //   setRunningState(RUNNING);
//   //   refreshIsland(baseURL.url, id)
//   //   .then((updatedIsland) => setIsland(updatedIsland));
//   // }

//   // const handleIslandDelete = (idList) => {
//   //   idList.forEach(islandId => {
//   //     console.log("doing delete " + islandId)
//   //     refreshIslandsList(baseURL.url,islandId)
//   //     .then((updatedIslandsList) => setIslandsList(updatedIslandsList));

//   //     if (islandId === island.id) {
//   //       setRunningState(NOT_STARTED);
//   //       setIsland({});
//   //     }

//   //   })
//   // }

//   // const handleURLSelect = (url) => {

//   //   console.log("URL SELECTED " + url)
//   //   setBaseURL(url);
//   //   setIsland({});
//   //   setRunningState(NOT_STARTED);
//   //   setSidebar(false);
//   //   setAdminbar(false);
//   // }

//   // const handlUserInput = (user,pwd) => {
//   //   setAdmin(user === "admin" && pwd==="admin")
//   //   setSidebar(false);
//   //   setAdminbar(false);
//   // }

//   // const handleSetBalloons = (checkBalloons) => {
//   //   console.log("BALLOOMS " + checkBalloons);
//   //   setShowBalloons(checkBalloons);
//   // }


//   const sendState = async (baseURL : string) => {
//     const data = await convert(baseURL + "state");
//     return data;
//   }

//   const reloadGame = () => {
//     setIsGameOver(false);
//     setScore(0);
//     setIsPaused(false);
//   };

//   const pauseGame = () => {
//     setIsPaused(!isPaused);
//   };

//   const getNewIsland = async (baseURL : string) => {
//     const islandData = await convert(baseURL + "island")
//     return extractIslandData(islandData);
//   }

//   const setTile = async (baseURL : string ,islandId : number,x : number,y: number) => {
//     const islandData = await convert(baseURL + "setTile?islandId=" + islandId + "&hpos=" + y + "&lpos=" + x)
//     return extractIslandData(islandData);
//   }


//   // console.log("-------- window --------");
//   // Object.entries(windowDimensions).map(([key, value]) => (console.log(key + "-" + value)));
//   // console.log("-------- screen --------");
//   // Object.entries(screenDimensions).map(([key, value]) => (console.log(key + "-" + value)));
//   // console.log("------------------------");

//   

  
// }


// const setRunning = async (baseURL : string, islandId : number, isrunning :boolean) => {
//   if (islandId > 0) {
//     await convert(baseURL + "setrunning?islandId=" + islandId + "&runningstate=" + isrunning);
//   } 
// }

// const refreshIsland = async (baseURL :string,islandId :number,followId : number) => {
//   var followString = "";
//   if (followId > 0) {
//     followString =  "&followId=" + followId;
    
//   } 
//   const islandData = await convert(baseURL + "islandmoves?islandId=" + islandId + followString);
//   return extractIslandData(islandData);
// }


// const extractIslandData = (islandData : any) => {

//   // console.dir(islandData)

//   const tiles : TileData [] = [];
//   const artifacts : ArtifactData [] = [];
//   const penguins : PenguinData [] = [];
//   const fishes : FishData[] = [];
//   const garbages: GarbageData [] = [];

//   if (islandData && islandData.island) {

//     islandData.island.forEach((tile : TileInputData) => {
//       tiles.push({key: tile.li *1000 + tile.col, type: tile.nat, num: tile.sml, ta: tile.ta, line: tile.li, col:tile.col})
//       artifacts.push({key: (100000 + tile.li *1000 + tile.col), type: tile.art, age: tile.age, line: tile.li, col:tile.col})
//     }); 

//     islandData.penguins.forEach((penguin : PenguinData)  => {
//       var gender = penguin.gender==="male"?"m":"f";
//       if (penguin.age < 6 ) gender = "y";
//       var activity = 0;
//       if (penguin.eating > 0) {
//         activity = 1;
//       } else if (penguin.fishTime > 0) {
//         activity = 2;
//       } else if (penguin.loving > 0) {
//         activity = 3;
//       } else if (penguin.digTime > 0) {
//         activity = 4;
//       } else if (penguin.fillTime > 0) {
//         activity = 5;
//       }

      
//       penguins.push({id: penguin.id, 
//                     alive:penguin.alive, 
//                     name:penguin.name, 
//                     lpos:penguin.lpos, 
//                     hpos:penguin.hpos, 
//                     hasIce:penguin.hasIce, 
//                     gender: gender, 
//                     activity: activity, 
//                     hungry:penguin.hungry, 
//                     wealth:penguin.wealth, 
//                     fat:penguin.fat, 
//                     age:penguin.age, 
//                     genderName:penguin.gender, 
//                     loving:penguin.loving,
//                     fishTime: penguin.fishTime,
//                     fishDirection:penguin.fishDirection, 
//                     eating:penguin.eating,
//                     digTime:penguin.digTime,
//                     digDirection:penguin.digDirection, 
//                     fillTime: penguin.fillTime,
//                     fillDirection:penguin.fillDirection, 
//                     strategyShort:penguin.strategyShort, 
//                     moveDirection:penguin.moveDirection, 
//                     knownWorld: penguin.knownWorld,
//                     vision: penguin.vision,
//                     targetDirections: penguin.targetDirections,
//                     targetLPos: penguin.targetLPos,
//                     targetHPos: penguin.targetHPos,
//                     path:penguin.path,
//                     illuminated:false})
//     }); 

//     if (islandData.fishes) { 
//       islandData.fishes.forEach((fish : FishData) => {
//         fishes.push({id: fish.id, 
//                     lpos:fish.lpos, 
//                     hpos:fish.hpos, 
//                     onHook:fish.onHook, 
//                     staying:fish.staying,
//                     fishDirection:fish.fishDirection})
//       }); 
//     }

//     if (islandData.garbages) { 
//       islandData.garbages.forEach((garbage : GarbageData)  => {
//         garbages.push({id: garbage.id, 
//                     lpos:garbage.lpos, 
//                     hpos:garbage.hpos, 
//                     kind:garbage.kind})
//       }); 
//     }

//     return {id: islandData.islandId,
//             name: islandData.islandName,
//             size: islandData.islandSize,
//             points: islandData.lastInvocation,
//             year: islandData.year,
//             weather: islandData.weather,
//             temperature : islandData.temperature,
//             plasticControl: islandData.plasticControl,
//             oceanTemperature: islandData.oceanTemperature,
//             tilesCount: islandData.tiles,
//             foodCount: islandData.food,
//             counter: islandData.counter,
//             running: islandData.running,
//             runonce: islandData.runonce,
//             tiles: tiles,
//             artifacts: artifacts,
//             penguins: penguins,
//             fishes: fishes,
//             garbages: garbages}


//   } else {
//     return {}
//   }

// }