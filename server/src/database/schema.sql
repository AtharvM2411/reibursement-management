-- Database Schema for Reimbursement Management System
-- This file is for reference only. The actual implementation uses MongoDB.

-- Users Table
CREATE TABLE users (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'manager', 'employee') DEFAULT 'employee',
  department VARCHAR(100),
  manager_id VARCHAR(36),
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (manager_id) REFERENCES users(id)
);

-- Expenses Table
CREATE TABLE expenses (
  id VARCHAR(36) PRIMARY KEY,
  employee_id VARCHAR(36) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT,
  receipt_url VARCHAR(255),
  status ENUM('draft', 'submitted', 'approved', 'rejected', 'reimbursed') DEFAULT 'draft',
  approved_by VARCHAR(36),
  rejection_reason TEXT,
  submit_date TIMESTAMP,
  approval_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (employee_id) REFERENCES users(id),
  FOREIGN KEY (approved_by) REFERENCES users(id)
);

-- Approvals Table
CREATE TABLE approvals (
  id VARCHAR(36) PRIMARY KEY,
  expense_id VARCHAR(36) NOT NULL,
  approver_id VARCHAR(36) NOT NULL,
  status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
  comment TEXT,
  rejection_reason TEXT,
  approval_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (expense_id) REFERENCES expenses(id),
  FOREIGN KEY (approver_id) REFERENCES users(id)
);

-- Rules Table
CREATE TABLE rules (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  condition JSON,
  action JSON,
  active BOOLEAN DEFAULT TRUE,
  priority INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Company Table
CREATE TABLE company (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20),
  address VARCHAR(255),
  city VARCHAR(100),
  country VARCHAR(100),
  tax_id VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
