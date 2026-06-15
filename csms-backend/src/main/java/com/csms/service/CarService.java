package com.csms.service;

import com.csms.dto.CarDTO;
import com.csms.entity.Car;
import com.csms.entity.User;
import com.csms.repository.CarRepository;
import com.csms.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CarService {

    private final CarRepository carRepository;
    private final UserRepository userRepository;

    // Add car for a user
    public CarDTO addCar(CarDTO dto) {
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        Car car = new Car();
        car.setUser(user);
        car.setCarBrand(dto.getCarBrand());
        car.setCarModel(dto.getCarModel());
        car.setCarNumber(dto.getCarNumber());
        return toDTO(carRepository.save(car));
    }

    // Get all cars for a user
    public List<CarDTO> getCarsByUser(Long userId) {
        return carRepository.findByUserId(userId).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    // Get all cars (admin)
    public List<CarDTO> getAllCars() {
        return carRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    // Delete car
    public void deleteCar(Long id) {
        carRepository.deleteById(id);
    }

    private CarDTO toDTO(Car c) {
        CarDTO dto = new CarDTO();
        dto.setId(c.getId());
        dto.setUserId(c.getUser().getId());
        dto.setCarBrand(c.getCarBrand());
        dto.setCarModel(c.getCarModel());
        dto.setCarNumber(c.getCarNumber());
        return dto;
    }
}
