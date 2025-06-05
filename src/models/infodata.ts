// export interface InfoData {
//   quote: string | null;
//   quote_author: string | null;
//   transportation: string[];
//   markets: string[];
//   good_to_know: string[];
//   market_pulse: string[];
//   relevant_at: number;
//   place: string;
//   region: string;
//   realEstate: string[];
//   equity: string;
// }

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
