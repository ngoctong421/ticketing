import { ExpirationCompleteEvent, Publisher, Subjects } from 'tickets-common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
