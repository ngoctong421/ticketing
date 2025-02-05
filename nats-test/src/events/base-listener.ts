import { Message, Stan } from 'node-nats-streaming';

export abstract class Listener {
  abstract subject: string;
  abstract queueGroupName: string;
  abstract onMessage(data: any, msg: Message): void;

  private client: Stan;
  protected ackWait = 5 * 1000;

  constructor(client: Stan) {
    this.client = client;
  }

  subscriptionOptions() {
    return (
      this.client
        .subscriptionOptions()
        .setManualAckMode(true)
        .setAckWait(this.ackWait)
        // get all the events that have been emitted in the past
        .setDeliverAllAvailable()
        // keep track of all the different events that have gone to this subcription or the queue group, even if it goes offline for a litle bit
        .setDurableName(this.queueGroupName)
    );
  }

  listen() {
    const subcription = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions()
    );

    subcription.on('message', (msg: Message) => {
      console.log(`Message received: ${this.subject}/${this.queueGroupName}`);

      const parsedData = this.parseMessage(msg);
      this.onMessage(parsedData, msg);
    });
  }

  parseMessage(msg: Message) {
    const data = msg.getData();
    return typeof data === 'string'
      ? JSON.parse(data)
      : JSON.parse(data.toString('utf8'));
  }
}
