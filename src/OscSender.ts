import { OscMessage } from './OscMessage';
import UDPManager from 'react-native-udpsocket';

export class OscSender {
  private socket: UDPManager;

  constructor(private host: string, private port: number) {
    this.socket = UDPManager.createSocket('udp4');
  }

  public async send(message: OscMessage): Promise<void> {
    const buffer = message.toBuffer();
    await this.socket.send(buffer, this.host, this.port);
  }

  public close(): void {
    this.socket.close();
  }
}
