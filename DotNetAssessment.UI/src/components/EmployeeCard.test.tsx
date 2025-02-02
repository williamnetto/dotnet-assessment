import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from 'vitest';
import EmployeeCard from "../components/EmployeeCard";
import { Employee } from "../types/Employee";

const mockEmployee: Employee = {
  id: 1,
  firstName: "John",
  lastName: "Doe",
  hireDate: "2022-01-01",
  phone: "123456789",
  address: "123 Main St",
  departmentId: 1,
  department: { id: 1, name: "IT" },
};

describe("EmployeeCard Component", () => {
  test("renders employee name and department", () => {
    render(<EmployeeCard employee={mockEmployee} onViewDetails={() => {}} onDelete={() => {}} />);
    
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("IT")).toBeInTheDocument();
  });

  test("renders hire date correctly", () => {
    render(<EmployeeCard employee={mockEmployee} onViewDetails={() => {}} onDelete={() => {}} />);
    
    expect(screen.getByText(/Hire Date/i)).toBeInTheDocument();
  });

  test("calls onViewDetails when 'View Details' button is clicked", () => {
    const onViewDetailsMock = vi.fn();
    render(<EmployeeCard employee={mockEmployee} onViewDetails={onViewDetailsMock} onDelete={() => {}} />);
    
    fireEvent.click(screen.getByText(/View Details/i));
    expect(onViewDetailsMock).toHaveBeenCalledWith(mockEmployee);
  });

  test("calls onDelete when 'Delete' button is clicked", () => {
    const onDeleteMock = vi.fn();
    render(<EmployeeCard employee={mockEmployee} onViewDetails={() => {}} onDelete={onDeleteMock} />);
    
    fireEvent.click(screen.getByText(/Delete/i));
    expect(onDeleteMock).toHaveBeenCalledWith(mockEmployee.id);
  });
});
