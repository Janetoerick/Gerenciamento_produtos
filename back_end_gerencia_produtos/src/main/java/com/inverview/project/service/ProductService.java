package com.inverview.project.service;

import com.inverview.project.exception.ResourceNotFoundException;
import com.inverview.project.model.Product;
import com.inverview.project.repository.ProductRepository;

import jakarta.persistence.criteria.Predicate;

import java.util.Optional;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProductService {

	private final ProductRepository productRepository;
	
	
	public ProductService(ProductRepository productRepository) {
		this.productRepository = productRepository;
	}
	
	@Transactional(readOnly = true)
	public Product findById(Integer id) {
		return productRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Produto com ID " + id + " não foi encontrado."));
	}
	
	@Transactional(readOnly = true)
	public List<Product> findAll() {
		return productRepository.findAll();
	}
	
	@Transactional(readOnly = true)
    public Page<Product> findWithFilters(String name, String category, Pageable pageable) {
        Specification<Product> spec = (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            // Filtro dinamico por Nome
            if (name != null && !name.trim().isEmpty()) {
                predicates.add(criteriaBuilder.like(
                        criteriaBuilder.lower(root.get("name")), 
                        "%" + name.toLowerCase() + "%"
                ));
            }

            // Filtro dinamico por Categoria
            if (category != null && !category.trim().isEmpty()) {
                predicates.add(criteriaBuilder.equal(root.get("category"), category));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };

        return productRepository.findAll(spec, pageable);
    }
	
	@Transactional
	public Product save(Product product) {
		return productRepository.save(product);
	}
	
	@Transactional
    public Product update(Integer id, Product updatedProduct) {
		
		Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Impossível atualizar. Produto com ID " + id + " não existe."));
		
		existingProduct.setName(updatedProduct.getName());
        existingProduct.setDescription(updatedProduct.getDescription());
        existingProduct.setPrice(updatedProduct.getPrice());
        existingProduct.setCategory(updatedProduct.getCategory());
        existingProduct.setActive(updatedProduct.isActive());
        
        return productRepository.save(existingProduct);
    }
	
	@Transactional
	public void delete(Integer id) {
		productRepository.deleteById(id);
	}
	
	
}
