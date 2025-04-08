import { OscMessage } from './OscMessage';
import UDPManager from 'react-native-udpsocket';

export class OscReceiver {
  private socket: UDPManager;
  private callback: (message: OscMessage) => void;

  constructor(callback: (message: OscMessage) => void) {
    this.callback = callback;
    this.socket = UDPManager.createSocket('udp4');
    this.setupListener();
  }

  private setupListener(): void {
    this.socket.on('message', (data: Buffer) => {
      const message = OscMessage.from(data);
      this.callback(message);
    });
  }

  public close(): void {
    this.socket.close();
  }
}
