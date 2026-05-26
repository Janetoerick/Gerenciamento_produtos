package com.inverview.project.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.inverview.project.model.Product;
import com.inverview.project.service.ProductService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/products")
public class ProductController {

	private final ProductService productService;
	
	public ProductController(ProductService productService) {
		this.productService = productService;
	}
	
	/* 
	 * Lista todos os produtos
	 * GET ->  /
	 * */
	@GetMapping
	public ResponseEntity<List<Product>> getAllProducts() {
		List<Product> products = productService.findAll();
		return ResponseEntity.ok(products);
	}
	
	/* 
	 * Retorna um produto pelo Id
	 * GET ->  /:id
	 * */
	@GetMapping("/{id}")
	public ResponseEntity<Product> getProductById(@PathVariable Integer id) {
		Product product = productService.findById(id);
        return ResponseEntity.ok(product);
	}
	
	/* 
	 * Adiciona um novo produto
	 * POST ->  /
	 * */
	@PostMapping
    public ResponseEntity<Product> createProduct(@Valid @RequestBody Product product) {
        Product savedProduct = productService.save(product);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedProduct);
    }
	
	/* 
	 * Atualiza dados de um produto
	 * PUT ->  /:id
	 * */
	@PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Integer id, @Valid @RequestBody Product product) {
		Product updatedProduct = productService.update(id, product);
        return ResponseEntity.ok(updatedProduct);
    }
	
	/* 
	 * Deleta um produto
	 * DELETE ->  /:id
	 * */
	@DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Integer id) {
		productService.findById(id);
        productService.delete(id);
        return ResponseEntity.noContent().build();
    }
	
	/* 
	 * Lista produtos com paginacao e filtros dinamicos
	 * GET ->  /filter
	 * */
	@GetMapping("/filter")
    public ResponseEntity<Page<Product>> getProductsPaginated(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String category,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "ASC") String direction
    ) {
        Sort sort = direction.equalsIgnoreCase("DESC") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        
        Page<Product> productPage = productService.findWithFilters(name, category, pageable);
        return ResponseEntity.ok(productPage);
    }
	
}
