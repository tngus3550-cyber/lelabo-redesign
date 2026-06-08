export interface ScentProduct {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  description: string;
  image: string;
  mainNotes: string[];
  character: string;
  strength: string;
  details: string;
  batchNumber: string;
}

export interface FormulationAnswer {
  category: string;
  value: string;
}

export interface ScentQuizQuestion {
  id: string;
  question: string;
  options: {
    label: string;
    value: string;
    description: string;
  }[];
}
