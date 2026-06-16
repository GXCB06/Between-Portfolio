export type PortfolioCategoryKey =
  | "portfolio"
  | "highSchool"
  | "cu109Sem1"
  | "cu109Sem2";

export interface PortfolioItem {
  id: string;
  title: string;
  image: string;
  alt: string;
}

export interface PortfolioCategory {
  key: PortfolioCategoryKey;
  label: string;
  folder: string;
  items: PortfolioItem[];
}
