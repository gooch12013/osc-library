// types/osc.d.ts

interface OscMessage {
    readonly Address: string;
    readonly Args: any[];
  }
  
  interface OscBundle {
    readonly Timetag: number;
    readonly Messages: OscMessage[];
  }
  
  interface Timetag {
    readonly Seconds: number;
    readonly FractionalSeconds: number;
  }
  
  type OscArg = 
    | number
    | string
    | Buffer
    | boolean
    | null
    | number[];
  
  declare namespace OscTypes {
    type Int32 = number;
    type Float32 = number;
    type String = string;
    type Blob = Buffer;
    type Timetag = number;
  }
  