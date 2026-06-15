package com.csms.controller;

import com.csms.dto.CarDTO;
import com.csms.service.CarService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cars")
@RequiredArgsConstructor
public class CarController {

    private final CarService carService;

    // POST /api/cars
    @PostMapping
    public ResponseEntity<CarDTO> addCar(@RequestBody CarDTO dto) {
        return ResponseEntity.ok(carService.addCar(dto));
    }

    // GET /api/cars  (admin - all cars)
    @GetMapping
    public ResponseEntity<List<CarDTO>> getAllCars() {
        return ResponseEntity.ok(carService.getAllCars());
    }

    // GET /api/cars/user/{userId}
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<CarDTO>> getCarsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(carService.getCarsByUser(userId));
    }

    // DELETE /api/cars/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCar(@PathVariable Long id) {
        carService.deleteCar(id);
        return ResponseEntity.ok("Car deleted successfully");
    }
}
