import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, ProductPage } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // URL base apontando para o Backend
  private readonly API_URL = 'http://localhost:8080/products';

  constructor(private http: HttpClient) { }

  /**
   * Consome o endpoint principal paginado e filtrado.
   * Converte os parâmetros do Angular para os QueryParams esperados pelo Spring Data Specification.
   */
  getProducts(
    name?: string,
    category?: string,
    page: number = 0,
    size: number = 20
  ): Observable<ProductPage> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (name) {
      params = params.set('name', name);
    }
    if (category) {
      params = params.set('category', category);
    }

    return this.http.get<ProductPage>(`${this.API_URL}/filter`, { params });
  }

  // Busca por ID individual
  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.API_URL}/${id}`);
  }

  // Cria um produto
  create(product: Omit<Product, 'id' | 'active' | 'createdAt'>): Observable<Product> {
    return this.http.post<Product>(this.API_URL, product);
  }

  // Atualiza um produto
  update(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.API_URL}/${id}`, product);
  }

  // Exclui um produto
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
