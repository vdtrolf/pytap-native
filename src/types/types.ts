export interface GestureEventType {
  nativeEvent: { translationX: number; translationY: number };
}

export interface Coordinate {
  x: number;
  y: number;
}

export enum Direction {
  Right,
  Up,
  Left,
  Down,
}

export interface FishData {
  key: number;
  vpos:number; 
  hpos:number; 
  onHook:boolean; 
  staying: boolean;
  direction: number;
}

export interface TileInputData {
  id: number;
  type: number;
  num: number;
  nat: number;
  art: number;
  sml: number;
  age: number;
  ta: string;
  li: number;
  col:number;
}

export interface TileData {
  key: number;
  type: number;
  angle: string;
  vpos: number;
  hpos:number;
}

export interface ArtifactData {
  key: number;
  type: number; 
  age: number;
  line: number;
  col: number;
}

export interface PenguinData {
  key: number;
  alive: boolean; 
  name: string; 
  lpos:number; 
  hpos:number; 
  hasIce:boolean; 
  gender: string; 
  activity: number; 
  hunger:number; 
  temp:number; 
  fat:number; 
  age:number; 
  genderName: string;  
  loving: number;
  fishTime : number;
  fishDirection:number; 
  digTime : number;
  digDirection:number; 
  fillTime: number;
  fillDirection:number; 
  strategyShort: string; 
  moveDirection:number; 
  eating: number;
  knownWorld: string; 
  vision: number;
  targetDirections: number;
  targetLPos: number;
  targetHPos: number;
  path: string; 
  illuminated: boolean;
}

export interface GarbageData {
  key: number;
  vpos:number;
  hpos:number;
  kind:number;
}

export interface UrlData {
  name: string;
  url: string;
}

export interface IslandData { 
  id : number;
  name: string;
  size: number;
  points: number;
  year: number;
  weather: number; 
  plasticControl: boolean;
  evolutionSpeed : number;
  running: boolean;
  // tiles: tiles,
  //           artifacts: artifacts,
  //           penguins: penguins,
  //           fishes: fishes,
  //           gems: gems,
  //           garbages: garbages,
  //           islands: islands
}

