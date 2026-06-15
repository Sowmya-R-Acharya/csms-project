package com.csms.dto;

import com.csms.entity.ServiceRequest.Status;
import lombok.Data;
import java.time.LocalDate;

@Data
public class ServiceRequestDTO {
    private Long id;
    private Long userId;
    private String userName;
    private Long carId;
    private String carInfo;
    private String serviceType;
    private LocalDate requestDate;
    private Status status;
    private String notes;
}
