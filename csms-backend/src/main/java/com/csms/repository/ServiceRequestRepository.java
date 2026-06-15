package com.csms.repository;

import com.csms.entity.ServiceRequest;
import com.csms.entity.ServiceRequest.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ServiceRequestRepository extends JpaRepository<ServiceRequest, Long> {
    List<ServiceRequest> findByUserId(Long userId);
    List<ServiceRequest> findByStatus(Status status);
    List<ServiceRequest> findByServiceTypeContainingIgnoreCase(String serviceType);
}
