import { PaymentCreatedEvent, Publisher, Subjects } from 'tickets-common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
