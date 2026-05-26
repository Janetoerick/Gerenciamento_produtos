package com.inverview.project.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;

public record ProductCreateDTO(
    @NotBlank(message = "O nome é obrigatório")
    @Size(max = 100, message = "O nome não pode passar de 100 caracteres")
    String name,

    @Size(max = 255, message = "A descrição não pode passar de 255 caracteres")
    String description,

    @NotNull(message = "O preço é obrigatório")
    @Positive(message = "O preço deve ser maior que zero")
    BigDecimal price,

    @NotBlank(message = "A categoria é obrigatória")
    String category
) {}