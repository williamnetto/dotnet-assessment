import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App';
import { getAllEmployees, deleteEmployee } from './services/employeeService';

vi.mock('./services/employeeService', () => ({
    getAllEmployees: vi.fn(),
    deleteEmployee: vi.fn(),
}));

describe('App', () => {
    const mockEmployees = [
        {
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            hireDate: '2022-01-01',
            phone: '1234567890',
            address: '123 Main St',
            departmentId: 2,
            department: { id: 2, name: 'Engineering' },
        },
        {
            id: 2,
            firstName: 'Jane',
            lastName: 'Smith',
            hireDate: '2021-06-15',
            phone: '9876543210',
            address: '456 Elm St',
            departmentId: 1,
            department: { id: 1, name: 'HR' },
        },
    ];

    beforeEach(async () => {
        vi.mocked(getAllEmployees).mockResolvedValue(mockEmployees);
        vi.mocked(deleteEmployee).mockResolvedValue(undefined);

        await act(async () => {
            render(<App />);
        });
    });

    it('fetches and displays employees', async () => {
        await waitFor(() => {
            expect(screen.getByText('John Doe')).toBeInTheDocument();
            expect(screen.getByText('Jane Smith')).toBeInTheDocument();
        });
    });

    it('opens and closes the Add Employee modal', async () => {
        await userEvent.click(screen.getByText(/New Employee/i));
        expect(screen.getByText(/Save/i)).toBeInTheDocument(); //Check for modal save button

        await userEvent.click(screen.getByText(/Cancel/i));
        expect(screen.queryByText(/Save/i)).not.toBeInTheDocument();
    });

    it('opens and closes the View Employee modal', async () => {
        await userEvent.click(screen.getAllByText('View Details')[0]);//Clicks on the first View Details button
        expect(screen.getByRole('button', { name: /Update/i })).toBeInTheDocument(); //Check for modal update button

        await userEvent.click(screen.getByText(/Cancel/i));
        expect(screen.queryByText(/Update/i)).not.toBeInTheDocument();
    });

    it('deletes an employee when delete is clicked', async () => {
        await userEvent.click(screen.getAllByText(/Delete/i)[0]);

        expect(deleteEmployee).toHaveBeenCalledWith(1);
        expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    });
});
