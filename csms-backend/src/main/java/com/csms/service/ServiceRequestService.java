package com.csms.service;

import com.csms.dto.ServiceRequestDTO;
import com.csms.entity.*;
import com.csms.entity.ServiceRequest.Status;
import com.csms.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ServiceRequestService {

    private final ServiceRequestRepository serviceRequestRepository;
    private final UserRepository userRepository;
    private final CarRepository carRepository;

    // Create service request
    public ServiceRequestDTO createRequest(ServiceRequestDTO dto) {
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        Car car = carRepository.findById(dto.getCarId())
                .orElseThrow(() -> new RuntimeException("Car not found"));

        ServiceRequest req = new ServiceRequest();
        req.setUser(user);
        req.setCar(car);
        req.setServiceType(dto.getServiceType());
        req.setRequestDate(LocalDate.now());
        req.setStatus(Status.PENDING);
        req.setNotes(dto.getNotes());

        return toDTO(serviceRequestRepository.save(req));
    }

    // Get all requests (admin)
    public List<ServiceRequestDTO> getAllRequests() {
        return serviceRequestRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    // Get requests by user
    public List<ServiceRequestDTO> getRequestsByUser(Long userId) {
        return serviceRequestRepository.findByUserId(userId).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    // Filter by status
    public List<ServiceRequestDTO> getRequestsByStatus(String status) {
        return serviceRequestRepository.findByStatus(Status.valueOf(status.toUpperCase())).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    // Filter by service type
    public List<ServiceRequestDTO> getRequestsByServiceType(String serviceType) {
        return serviceRequestRepository.findByServiceTypeContainingIgnoreCase(serviceType).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    // Update status (admin)
    public ServiceRequestDTO updateStatus(Long id, String status) {
        ServiceRequest req = serviceRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));
        req.setStatus(Status.valueOf(status.toUpperCase()));
        return toDTO(serviceRequestRepository.save(req));
    }

    // Delete request
    public void deleteRequest(Long id) {
        serviceRequestRepository.deleteById(id);
    }

    private ServiceRequestDTO toDTO(ServiceRequest r) {
        ServiceRequestDTO dto = new ServiceRequestDTO();
        dto.setId(r.getId());
        dto.setUserId(r.getUser().getId());
        dto.setUserName(r.getUser().getName());
        dto.setCarId(r.getCar().getId());
        dto.setCarInfo(r.getCar().getCarBrand() + " " + r.getCar().getCarModel()
                + " - " + r.getCar().getCarNumber());
        dto.setServiceType(r.getServiceType());
        dto.setRequestDate(r.getRequestDate());
        dto.setStatus(r.getStatus());
        dto.setNotes(r.getNotes());
        return dto;
    }
}
