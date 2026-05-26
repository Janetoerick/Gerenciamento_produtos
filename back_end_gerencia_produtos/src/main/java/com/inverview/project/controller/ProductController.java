package com.inverview.project.controller;

import org.springframework.web.bind.annotation.*;

import com.inverview.project.service.ProductService;

@RestController
@RequestMapping("/products")
public class ProductController {

	private final ProductService productService;
	
	public ProductController(ProductService productService) {
		this.productService = productService;
	}
	
	
}
