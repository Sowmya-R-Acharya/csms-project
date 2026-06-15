package com.csms.dto;

import lombok.Data;

@Data
public class CarDTO {
    private Long id;
    private Long userId;
    private String carModel;
    private String carBrand;
    private String carNumber;
}
