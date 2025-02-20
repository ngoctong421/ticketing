import { OrderCancelledEvent, Publisher, Subjects } from 'tickets-common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
