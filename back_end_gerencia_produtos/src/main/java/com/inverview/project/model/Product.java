package com.inverview.project.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "product")
public class Product {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	// Nome obrigatorio, entre 3 e 100 caracteres
    @NotBlank(message = "O nome do produto é obrigatório")
    @Size(min = 3, max = 100, message = "O nome deve ter entre 3 e 100 caracteres")
    @Column(length = 100, nullable = false)
    private String name;

    // Descricao opcional, pode ser ate 1000 caracteres
    @Size(max = 1000, message = "A descrição não pode passar de 1000 caracteres")
    @Column(length = 1000, columnDefinition = "TEXT")
    private String description;

    // Preco obrigatorio e nao pode ser negativo
    @NotNull(message = "O preço é obrigatório")
    @PositiveOrZero(message = "O preço deve ser maior ou igual a zero")
    @Column(precision = 10, scale = 2, nullable = false)
    private BigDecimal price;

    // Categoria obrigatoria, tamanho menor no banco
    @NotBlank(message = "A categoria é obrigatória")
    @Size(max = 50, message = "A categoria deve ter no máximo 50 caracteres")
    @Column(length = 50, nullable = false)
    private String category;

    private boolean active = true; // Inicializa como ativo por padrao
	
    @Column(name = "created_at", length = 20, nullable = false, updatable = false)
	private String createdAt;

	public Product() {
	}
	
	public Product(String name, String description, BigDecimal price, String category) {
		super();
		this.name = name;
		this.description = description;
		this.price = price;
		this.category = category;
	}
	
	// executado automaticamente antes de salvar no banco
	@PrePersist
    protected void onCreate() {
        // Captura a data/hora atual do system
        LocalDateTime now = LocalDateTime.now();
        
        // Define o formato
        DateTimeFormatter format = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
        
        // Transforma a data em String e joga no atributo
        this.createdAt = now.format(format);
    }

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public String getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(String createdAt) {
		this.createdAt = createdAt;
	}
	
}
