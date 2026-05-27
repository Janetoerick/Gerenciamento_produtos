// Contrato do produto individual (idêntico ao banco/DTO do Spring)
export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  category: string;
  active: boolean;
  createdAt?: string;
}

// Contrato da paginação do Spring Data
export interface ProductPage {
  content: Product[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}