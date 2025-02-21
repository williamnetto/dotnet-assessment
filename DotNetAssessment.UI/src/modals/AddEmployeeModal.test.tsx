import userEvent from '@testing-library/user-event';
import { render, screen, act, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import AddEmployeeModal from './AddEmployeeModal';
import { createEmployee } from '../services/employeeService';

// Mock API Calls
vi.mock('../services/departmentService', () => ({
  getAllDepartments: vi.fn().mockResolvedValue([
    { id: 1, name: 'HR' },
    { id: 2, name: 'Engineering' },
  ])
}));

vi.mock('../services/employeeService', () => ({
  createEmployee: vi.fn().mockResolvedValue({
    id: 100,
    firstName: 'John',
    lastName: 'Doe',
    hireDate: '2025-01-01',
    phone: '1234567890',
    address: '123 Main St',
    departmentId: 2,
  })
}));

describe('AddEmployeeModal', () => {
  const onCloseMock = vi.fn();
  const onEmployeeCreatedMock = vi.fn();

  beforeEach(async () => {
    vi.clearAllMocks();

    await act(async () => {
      render(<AddEmployeeModal onEmployeeCreated={onEmployeeCreatedMock} onClose={onCloseMock} />);
    });
  });

  it('renders the modal with form fields', () => {
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Hire Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Department/i)).toBeInTheDocument();
  });

  it('fetches and displays departments', async () => {
    await waitFor(() => {
      expect(screen.getByText('HR')).toBeInTheDocument();
      expect(screen.getByText('Engineering')).toBeInTheDocument();
    });
  });

  it('calls onEmployeeCreated and onClose when form is submitted', async () => {
    await userEvent.type(screen.getByLabelText(/First Name/i), 'John');
    await userEvent.type(screen.getByLabelText(/Last Name/i), 'Doe');
    await userEvent.type(screen.getByLabelText(/Hire Date/i), '2025-01-01');
    await userEvent.type(screen.getByLabelText(/Phone/i), '1234567890');
    await userEvent.type(screen.getByLabelText(/Address/i), '123 Main St');
    await userEvent.selectOptions(screen.getByLabelText(/Department/i), '2');

    await userEvent.click(screen.getByText(/Save/i));

    await waitFor(() => {
      expect(createEmployee).toHaveBeenCalledWith({
        id: 0,
        firstName: 'John',
        lastName: 'Doe',
        hireDate: '2025-01-01',
        phone: '1234567890',
        address: '123 Main St',
        departmentId: 2,
        department: { id: 2, name: 'Engineering' },
      });

      expect(onEmployeeCreatedMock).toHaveBeenCalled();
      expect(onCloseMock).toHaveBeenCalled();
    });
  });

  it('calls onClose when Cancel button is clicked', async () => {
    await userEvent.click(screen.getByText(/Cancel/i));
    expect(onCloseMock).toHaveBeenCalled();
  });

  // it('shows validation errors for empty fields', async () => {
  //   // Mock the API response with a 400 status and FluentValidation errors
  //   (createEmployee as Mock).mockRejectedValueOnce({
  //     error: {
  //       response: {
  //         status: 400,
  //         data: {
  //           errors: {
  //             firstName: ['First Name is required'],
  //             lastName: ['Last Name is required'],
  //             hireDate: ['Hire Date is required'],
  //           },
  //         },
  //       }
  //     }
  //   });

  //   await userEvent.click(screen.getByText(/Save/i));

  //   await waitFor(() => {
  //     expect(screen.getByText('First Name is required')).toBeInTheDocument();
  //     expect(screen.getByText('Last Name is required')).toBeInTheDocument();
  //     expect(screen.getByText('Hire Date is required')).toBeInTheDocument();
  //     expect(screen.getByText('Phone number is required')).toBeInTheDocument();
  //     expect(screen.getByText('Address is required')).toBeInTheDocument();
  //   });
  // });
});
