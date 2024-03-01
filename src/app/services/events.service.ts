import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventResponse } from '../models/event-response.model';
import { EventFilters } from '../models/event-filters.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'https://app.ticketmaster.com/discovery/v2/events';
  private apiKey = 'P2iXPuWNRrFyJtcg2wxEGSP4GqZI4lVU';

  constructor(private http: HttpClient) {}

  getEvents(page: number = 0, filters?: EventFilters): Observable<EventResponse> {
    let url = `${this.apiUrl}?apikey=${this.apiKey}&locale=*&page=${page}&size=20`;

    if (filters) {
      if (filters.startDate) {
        const startDate = new Date(filters.startDate).toISOString().split('.')[0] + 'Z';
        url += `&startDateTime=${startDate}`;
      }
      if (filters.endDate) {
        const endDate = new Date(filters.endDate).toISOString().split('.')[0] + 'Z';
        url += `&endDateTime=${endDate}`;
      }
      if (filters.location) {
        url += `&venueId=${filters.location}`;
      }
    }

    return this.http.get<EventResponse>(url);
  }
}
