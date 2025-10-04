export type Section = 'architect' | 'artist' | 'analyst';

export type View = 'hub' | Section | 'about';

export type Insight = {
  title: string;
  content: string;
};

// Data types for Analyst Dashboards
export type Transaction = {
    id: number;
    date: string; // YYYY-MM-DD
    description: string;
    amount: number;
    type: 'income' | 'expense';
    category: 'Salary' | 'Groceries' | 'Utilities' | 'Transport' | 'Entertainment' | 'Other';
};

export type SalesRecord = {
    orderId: string;
    date: string; // YYYY-MM-DD
    customerName: string;
    country: string;
    product: string;
    amount: number;
};

export type Project = {
  title: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  codeUrl?: string;
  
  // New fields for advanced project views
  projectType?: 'personal-finance-dashboard' | 'sales-performance-dashboard'; 
  chartData?: Transaction[] | SalesRecord[];
  renderType?: 'image' | 'text-card';

  // Legacy fields
  insights?: Insight[];
  simulationGif?: string;
};

export type ArtistProjectCollection = {
  [category: string]: Project[];
};