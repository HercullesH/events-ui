// event.model.ts
export interface Event {
  name: string;
  _embedded: {
    venues: Venue[]
  };
  type: string;
  id: string;
  test: boolean;
  url: string;
  locale: string;
  sales: Sales;
  dates: Dates;
  info: string;
  formattedDate: string;
  pleaseNote: string;
  products: Product[];
}

export interface Sales {
  public: {
    startDateTime: string;
    startTBD: boolean;
    startTBA: boolean;
    endDateTime: string;
  };
  presales: {
    startDateTime: string;
    endDateTime: string;
    name: string;
  }[];
}

export interface Venue {
  name: string
}


export interface Dates {
  start: {
    localDate: string;
    localTime: string;
    dateTime: string;
    dateTBD: boolean;
    dateTBA: boolean;
    timeTBA: boolean;
    noSpecificTime: boolean;
  };
  timezone: string;
  status: {
    code: string;
  };
  spanMultipleDays: boolean;
}

export interface Product {
  name: string;
  id: string;
  url: string;
  type: string;
  classifications: Classification[];
}

export interface Classification {
  primary: boolean;
  segment: {
    id: string;
    name: string;
  };
  genre: {
    id: string;
    name: string;
  };
  subGenre: {
    id: string;
    name: string;
  };
  type: {
    id: string;
    name: string;
  };
  subType: {
    id: string;
    name: string;
  };
  family: boolean;
}

// attraction.model.ts
export interface Attraction {
  name: string;
  type: string;
  id: string;
  test: boolean;
  url: string;
  locale: string;
  externalLinks: {
    [key: string]: { url: string }[];
  };
  aliases: string[];
  images: Image[];
  classifications: Classification[];
  upcomingEvents: {
    tmr: number;
    ticketmaster: number;
    _total: number;
    _filtered: number;
  };
  _links: {
    self: {
      href: string;
    };
  };
}

export interface Image {
  ratio: string;
  url: string;
  width: number;
  height: number;
  fallback: boolean;
}
