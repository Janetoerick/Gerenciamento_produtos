import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product, ProductPage } from '../../models/product.model';

import { MOCK_PRODUCTS } from '../../models/product.mock'; // PARA TESTES

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
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

  // Sinalizar para carregar
  isLoading: boolean = false;

  // Referentes a salvar produto
  productForm!: FormGroup;
  isSaving: boolean = false;

  feedbackMode: 'success' | 'error' | 'confirm-delete' = 'success';
  feedbackTitle: string = '';
  feedbackMessage: string = '';
  isFeedbackSuccess: boolean = true;

  // Referente a delecao do produto
  productIdToDelete: number | null = null;

  constructor(
    private productService: ProductService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // this.totalElements = MOCK_PRODUCTS.length;
    // this.totalPages = Math.ceil(MOCK_PRODUCTS.length / this.pageSize);
    // this.products = MOCK_PRODUCTS.slice(0, this.pageSize);
    // const categoriesSet = new Set(MOCK_PRODUCTS.map(p => p.category));
    // this.existingCategories = Array.from(categoriesSet).filter(cat => cat);

    this.loadProducts();
    this.initForm();
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

  // --------------------------- METODOS REFERENTES A SALVAR PRODUTO   ---------------------------

  // define os campos e regras do form
  private initForm(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: ['', [Validators.maxLength(255)]],
      price: ['', [Validators.required, Validators.min(0.01)]],
      category: ['', [Validators.required]] 
    });
  }

  // metodo para salvar produto
  onSubmit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    this.isSaving = true;
    const formValue = this.productForm.value;
    const newProduct = {
      ...formValue,
      category: formValue.category ? formValue.category.trim() : ''
    };

    this.productService.create(newProduct).subscribe({
      next: (createdProduct) => {
        this.isSaving = false;
        this.productForm.reset();
        this.loadProducts();
        
        // fecha o modal de cadastro
        this.closeModal('productModal');

        // configura o feedback de SUCESSO
        this.feedbackMode = 'success';
        this.feedbackTitle = 'Sucesso!';
        this.feedbackMessage = `O produto "${createdProduct.name}" foi cadastrado com sucesso.`;
        this.isFeedbackSuccess = true;

        // Abre o modal de feedback
        this.openModal('feedbackModal');
      },
      error: (err) => {
        this.isSaving = false;
        console.error('Erro ao cadastrar produto:', err);
        
        // configura o feedback de ERRO
        this.feedbackMode = 'error';
        this.feedbackTitle = 'Ops, algo deu errado!';
        this.feedbackMessage = 'Não foi possível salvar o produto. Verifique a conexão com o servidor ou se os dados estão corretos.';
        this.isFeedbackSuccess = false;

        // abre o modal de feedback
        this.openModal('feedbackModal');
      }
    });
  }

  // ajuda na validacao visual
  isFieldInvalid(fieldName: string): boolean {
    const field = this.productForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  // fecha o modal
  private closeModal(modalId: string): void {
    const modalElement = document.getElementById(modalId);
    const closeButton = modalElement?.querySelector('.btn-close') as HTMLElement;
    closeButton?.click();
  }

  // abre o modal
  private openModal(modalId: string): void {
    // Dispara o clique em um botão invisível que colocaremos no HTML
    const trigger = document.getElementById(`trigger-${modalId}`);
    trigger?.click();
  }

  // --------------------------- METODOS REFERENTES A DELETAR PRODUTO   ---------------------------

  // Aciona a delecao do produto
  deleteProduct(id: number): void {
    this.productIdToDelete = id;
    
    // Transforma o modal em modo de CONFIRMAÇÃO DE EXCLUSÃO
    this.feedbackMode = 'confirm-delete';
    this.feedbackTitle = 'Tem certeza?';
    this.feedbackMessage = 'Esta ação não poderá ser desfeita. O produto será removido permanentemente.';
    
    this.openModal('feedbackModal');
  }

  confirmDelete(): void {
    if (this.productIdToDelete === null) return;

    this.isSaving = true;

    this.productService.delete(this.productIdToDelete).subscribe({
      next: () => {
        this.isSaving = false;
        this.closeModal('feedbackModal');
        this.loadProducts();

        this.feedbackMode = 'success';
        this.feedbackTitle = 'Excluído!';
        this.feedbackMessage = 'O produto foi removido permanentemente do sistema.';
        
        this.productIdToDelete = null;
      },
      error: (err) => {
        this.isSaving = false;
        this.closeModal('feedbackModal');
        console.error('Erro ao deletar produto:', err);

        this.feedbackMode = 'error';
        this.feedbackTitle = 'Não foi possível excluir';
        this.feedbackMessage = 'Ocorreu um erro interno no servidor ao tentar remover este produto.';
        
        this.productIdToDelete = null;
      }
    });
  }
}
