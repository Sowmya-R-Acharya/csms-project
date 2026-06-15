package com.csms.controller;

import com.csms.dto.ServiceRequestDTO;
import com.csms.service.ServiceRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/service-requests")
@RequiredArgsConstructor
public class ServiceRequestController {

    private final ServiceRequestService serviceRequestService;

    // POST /api/service-requests
    @PostMapping
    public ResponseEntity<ServiceRequestDTO> createRequest(@RequestBody ServiceRequestDTO dto) {
        return ResponseEntity.ok(serviceRequestService.createRequest(dto));
    }

    // GET /api/service-requests  (admin - all)
    @GetMapping
    public ResponseEntity<List<ServiceRequestDTO>> getAllRequests() {
        return ResponseEntity.ok(serviceRequestService.getAllRequests());
    }

    // GET /api/service-requests/user/{userId}
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ServiceRequestDTO>> getRequestsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(serviceRequestService.getRequestsByUser(userId));
    }

    // GET /api/service-requests/filter?status=PENDING
    @GetMapping("/filter")
    public ResponseEntity<List<ServiceRequestDTO>> filterRequests(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String serviceType) {

        if (status != null && !status.isBlank()) {
            return ResponseEntity.ok(serviceRequestService.getRequestsByStatus(status));
        }
        if (serviceType != null && !serviceType.isBlank()) {
            return ResponseEntity.ok(serviceRequestService.getRequestsByServiceType(serviceType));
        }
        return ResponseEntity.ok(serviceRequestService.getAllRequests());
    }

    // PUT /api/service-requests/{id}/status?value=COMPLETED
    @PutMapping("/{id}/status")
    public ResponseEntity<ServiceRequestDTO> updateStatus(@PathVariable Long id,
                                                           @RequestParam String value) {
        return ResponseEntity.ok(serviceRequestService.updateStatus(id, value));
    }

    // DELETE /api/service-requests/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteRequest(@PathVariable Long id) {
        serviceRequestService.deleteRequest(id);
        return ResponseEntity.ok("Request deleted successfully");
    }
}
