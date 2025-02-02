import userEvent from '@testing-library/user-event';
import { render, screen, waitFor, act } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ViewEmployeeModal from './ViewEmployeeModal';
import { Employee } from '../App';


describe('ViewEmployeeModal', () => {
    const onCloseMock = vi.fn();
    const onEmployeeUpdatedMock = vi.fn();

    const employee: Employee = {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        hireDate: '2022-01-01',
        phone: '1234567890',
        address: '123 Main St',
        department: { id: 1, name: 'IT' },
        departmentId: 2,
    };

    beforeEach(async () => {
        onCloseMock.mockClear();
        onEmployeeUpdatedMock.mockClear();

        await act(async () => {
            render(
                <ViewEmployeeModal
                    employee={employee}
                    onClose={onCloseMock}
                    onEmployeeUpdated={onEmployeeUpdatedMock}
                />
            );
        });
    });

    it('renders the modal with employee details', () => {
        expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
        expect(screen.getByText(/Employee ID:/i)).toBeInTheDocument();
        expect(screen.getByText(/IT/i)).toBeInTheDocument();
        expect(screen.getByText(/1234567890/i)).toBeInTheDocument();
        expect(screen.getByText(/123 Main St/i)).toBeInTheDocument();
    });

    it('fetches and displays departments', async () => {
        await waitFor(() => {
            expect(screen.getByText('HR')).toBeInTheDocument();
            expect(screen.getByText('Engineering')).toBeInTheDocument();
        });
    });

    it('calls onEmployeeUpdated and onClose when update is clicked', async () => {
        await userEvent.selectOptions(screen.getByRole('combobox'), '1');
        await userEvent.click(screen.getByRole('button', { name: /Update/i }));

        expect(onEmployeeUpdatedMock).toHaveBeenCalled();
        expect(onCloseMock).toHaveBeenCalled();
    });

    it('calls onClose when Cancel button is clicked', async () => {
        await userEvent.click(screen.getByText(/Cancel/i));
        expect(onCloseMock).toHaveBeenCalled();
    });
});
