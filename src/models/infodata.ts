export interface InfoData {
  quote: string;
  quote_author: string;
  transportation: string[];
  markets: {
    equity: string[];
    realEstate: string[];
  };
  good_to_know: string[];
  market_pulse: {
    date: string;
    highTemp: string;
    lowTemp: string;
    humidity: string;
    wind: string;
  };
  fetched_at?: string;
  place?: string;
  region?: string;
}
