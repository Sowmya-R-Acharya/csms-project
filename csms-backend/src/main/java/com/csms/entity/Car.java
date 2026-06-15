package com.csms.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "cars")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String carModel;

    @Column(nullable = false)
    private String carBrand;

    @Column(nullable = false, unique = true)
    private String carNumber;
}
