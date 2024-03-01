import { Component } from '@angular/core';
import { EventService } from './services/events.service';
import { EventResponse } from './models/event-response.model';
import { PageEvent } from '@angular/material/paginator';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EventFilters } from './models/event-filters.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'events';
  panelOpenState = false;
  eventForm: FormGroup;
  eventResponse: EventResponse | null = null;

  constructor(
    private eventService: EventService,
    private fb: FormBuilder
  ) {
    this.eventForm = this.fb.group({
      startDate: [''],
      endDate: [''],
      location: ['']
    });
    this.getEvents();
  }

  getEvents(page?: number): void {
    const filters: EventFilters = {
      startDate: this.eventForm.value.startDate,
      endDate: this.eventForm.value.endDate,
      location: this.eventForm.value.location
    };

    this.eventService.getEvents(page, filters)
      .subscribe(
        response => {
          this.eventResponse = response;
          this.eventResponse._embedded.events.forEach(event => {
            event.formattedDate = this.formatDate(event.dates.start.localDate, event.dates.start.localTime);
          });
        },
        error => {
          alert("Error fetching events!");
        }
      );
  }

  onPageChange(event: PageEvent): void {
    const nextPage = event.pageIndex;
    this.getEvents(nextPage);
  }

  formatDate(date: string, time: string): string {
    const dateObj = new Date(date + 'T' + time + 'Z');
    const options: Intl.DateTimeFormatOptions = {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    };
    return dateObj.toLocaleDateString('en-US', options);
  }

  onSubmit(): void {
    this.getEvents();
  }
}
