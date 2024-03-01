import { Event } from './event.model';
import { Page } from './page.model';
import { Links } from './links.model';

export interface EventResponse {
  _embedded: {events: Event[];}
  page: Page;
  links: Links;
}