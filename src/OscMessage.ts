export class OscMessage {
    private address: string;
    private args: any[];
  
    constructor(address: string, args: any[] = []) {
      this.address = address;
      this.args = args;
    }
  
    public get Address(): string {
      return this.address;
    }
  
    public get Args(): any[] {
      return this.args;
    }
  
    public static from(data: Buffer): OscMessage {
      const address = data.slice(0, data.indexOf(0x00, 0)).toString();
      const args = data.slice(address.length + 1);
      
      // Parse arguments
      const argsArray: any[] = [];
      let offset = 0;
      
      while (offset < args.length) {
        const tag = args[offset];
        offset++;
        
        switch (tag) {
          case 0x69: // int32
            argsArray.push(args.readInt32LE(offset));
            offset += 4;
            break;
          case 0x66: // float
            argsArray.push(args.readFloatLE(offset));
            offset += 4;
            break;
          case 0x73: // string
            {
              const length = args[offset] + (args[offset + 1] << 8);
              const stringEnd = offset + 2 + length;
              const string = args.toString('utf8', offset + 2, stringEnd);
              argsArray.push(string);
              offset = stringEnd;
            }
            break;
          case 0x62: // blob
            {
              const length = args[offset] + (args[offset + 1] << 8);
              const blob = args.slice(offset + 2, offset + 2 + length);
              argsArray.push(blob);
              offset += 2 + length;
            }
            break;
          // Add other types as needed
          default:
            throw new Error(`Unknown argument type: ${tag}`);
        }
      }
  
      return new OscMessage(address, argsArray);
    }
  
    public toBuffer(): Buffer {
      const addressBuffer = Buffer.from(this.address + '\x00');
      let argsBuffer = Buffer.alloc(0);
  
      for (const arg of this.args) {
        if (typeof arg === 'number') {
          argsBuffer.writeUInt32LE(arg);
        } else if (typeof arg === 'string') {
          const stringLength = arg.length;
          const stringBuffer = Buffer.alloc(2 + stringLength);
          stringBuffer.writeUInt16LE(stringLength, 0);
          stringBuffer.write(arg, 2);
          argsBuffer = Buffer.concat([argsBuffer, stringBuffer]);
        }
        // Add other types as needed
      }
  
      return Buffer.concat([addressBuffer, argsBuffer]);
    }
  }
  