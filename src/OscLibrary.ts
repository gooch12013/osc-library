import { OscSender } from './OscSender';
import { OscReceiver } from './OscReceiver';
import { OscMessage } from './OscMessage';

export class OscLibrary {
  private sender: OscSender;
  private receiver: OscReceiver;

  constructor(host: string, port: number, onMessage: (message: OscMessage) => void) {
    this.sender = new OscSender(host, port);
    this.receiver = new OscReceiver(onMessage);
  }

  public send(address: string, ...args: any[]): void {
    const message = new OscMessage(address, args);
    this.sender.send(message);
  }

  public close(): void {
    this.sender.close();
    this.receiver.close();
  }
}
