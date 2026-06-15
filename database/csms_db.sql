-- ============================================
--  Car Service Management System (CSMS)
--  MySQL Database Setup Script
-- ============================================

-- Create and use database
CREATE DATABASE IF NOT EXISTS csms_db;
USE csms_db;

-- ============================================
-- TABLE: users
-- ============================================
CREATE TABLE IF NOT EXISTS users (
    id       BIGINT AUTO_INCREMENT PRIMARY KEY,
    name     VARCHAR(100)        NOT NULL,
    email    VARCHAR(150)        NOT NULL UNIQUE,
    password VARCHAR(255)        NOT NULL,
    phone    VARCHAR(20),
    role     ENUM('ADMIN','CUSTOMER') NOT NULL DEFAULT 'CUSTOMER',
    CONSTRAINT chk_role CHECK (role IN ('ADMIN','CUSTOMER'))
);

-- ============================================
-- TABLE: cars
-- ============================================
CREATE TABLE IF NOT EXISTS cars (
    id         BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id    BIGINT       NOT NULL,
    car_model  VARCHAR(100) NOT NULL,
    car_brand  VARCHAR(100) NOT NULL,
    car_number VARCHAR(50)  NOT NULL UNIQUE,
    CONSTRAINT fk_car_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ============================================
-- TABLE: service_requests
-- ============================================
CREATE TABLE IF NOT EXISTS service_requests (
    id           BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id      BIGINT       NOT NULL,
    car_id       BIGINT       NOT NULL,
    service_type VARCHAR(150) NOT NULL,
    request_date DATE         NOT NULL,
    status       ENUM('PENDING','IN_PROGRESS','COMPLETED','CANCELLED') NOT NULL DEFAULT 'PENDING',
    notes        TEXT,
    CONSTRAINT fk_sr_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_sr_car  FOREIGN KEY (car_id)  REFERENCES cars(id)  ON DELETE CASCADE
);

-- ============================================
-- SEED DATA — Admin only (customers register themselves)
-- ============================================

-- Admin user (email: admin@csms.com  password: admin123)
INSERT IGNORE INTO users (name, email, password, phone, role) VALUES
('Admin User', 'admin@csms.com', 'admin123', '555-0000', 'ADMIN');
