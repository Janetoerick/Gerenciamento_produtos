import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product, ProductPage } from '../../models/product.model';

import { MOCK_PRODUCTS } from '../../models/product.mock'; // PARA TESTES

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{

  // Estado dos dados vindos do Spring Boot
  products: Product[] = [];
  totalElements: number = 0;
  totalPages: number = 0;
  existingCategories: string[] = [];

  // Parametros de paginacao e filtros controlados pelo usuario
  searchTerm: string = '';
  currentPage: number = 0;
  pageSize: number = 20;

  isLoading: boolean = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // this.totalElements = MOCK_PRODUCTS.length;
    // this.totalPages = Math.ceil(MOCK_PRODUCTS.length / this.pageSize);
    // this.products = MOCK_PRODUCTS.slice(0, this.pageSize);
    // const categoriesSet = new Set(MOCK_PRODUCTS.map(p => p.category));
    // this.existingCategories = Array.from(categoriesSet).filter(cat => cat);

    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;

    let nameParam: string | undefined = undefined;
    let categoryParam: string | undefined = undefined;
    const trimmedTerm = this.searchTerm.trim();

    if (trimmedTerm) {
      // Se o termo bater exatamente com uma categoria existente no banco, filtra por ela
      if (this.existingCategories.some(cat => cat.toLowerCase() === trimmedTerm.toLowerCase())) {
        categoryParam = this.existingCategories.find(cat => cat.toLowerCase() === trimmedTerm.toLowerCase());
      } else {
        // Caso contrario, trata como busca por texto no nome
        nameParam = trimmedTerm;
      }
    }

    this.productService.getProducts(
      nameParam,
      categoryParam,
      this.currentPage,
      this.pageSize
    ).subscribe({
      next: (page: ProductPage) => {
        this.products = page.content;
        this.totalElements = page.totalElements;
        this.totalPages = page.totalPages;

        // Atualiza a lista de sugestões do autocomplete com base no banco
        this.updateExistingCategories();

      },
      error: (err) => {
        console.error('Erro ao buscar produtos da API', err);
        
      }
    });

    this.isLoading = false;
  }

  // Aciona o filtro
  onSearch(): void {
    this.currentPage = 0;
    this.loadProducts();
  }

  // Acionado o seletor de quantidade
  onPageSizeChange(newSize: number): void {
    this.pageSize = newSize;
    this.currentPage = 0;
    this.loadProducts();
  }

  // Aciona a navegacao da paginacao
  changePage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.loadProducts();
    }
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i);
  }

  // Reseta o filtro
  clearSearch(): void {
    this.searchTerm = '';
    this.currentPage = 0;
    this.loadProducts();
  }

  private updateExistingCategories(): void {
    const categoriesSet = new Set(this.products.map(p => p.category));
    this.existingCategories = Array.from(categoriesSet).filter(cat => cat && cat.trim() !== '');
  }

  // Aciona a delecao do produto
  deleteProduct(id: number): void {
    if (confirm('Tem certeza que deseja excluir permanentemente este produto?')) {
      this.productService.delete(id).subscribe({
        next: () => {
          this.loadProducts();
        }
      });
    }
  }
}
