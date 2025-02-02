import userEvent from '@testing-library/user-event'
import { render, screen, act } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import AddEmployeeModal from './AddEmployeeModal';


describe('AddEmployeeModal', () => {
    const onCloseMock = vi.fn();
    const onEmployeeCreatedMock = vi.fn();

    beforeEach(async () => {
      onCloseMock.mockClear();
      onEmployeeCreatedMock.mockClear();

      await act(async () => {
        render(<AddEmployeeModal onEmployeeCreated={onEmployeeCreatedMock} onClose={onCloseMock} />);
      });
    });

  it('renders the modal with form fields', async () => {
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Hire Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Department/i)).toBeInTheDocument();
  });

  it('fetches and displays departments', async () => {
    expect(screen.getByText('HR')).toBeInTheDocument();
    expect(screen.getByText('Engineering')).toBeInTheDocument();
  });

  it('calls onEmployeeCreated and onClose when form is submitted', async () => {
    // Fill in the form
    await userEvent.type(screen.getByLabelText(/First Name/i), 'John');
    await userEvent.type(screen.getByLabelText(/Last Name/i), 'Doe');
    await userEvent.type(screen.getByLabelText(/Hire Date/i), '2025-01-01');
    await userEvent.type(screen.getByLabelText(/Phone/i), '1234567890');
    await userEvent.type(screen.getByLabelText(/Address/i), '123 Main St');
    await userEvent.selectOptions(screen.getByLabelText(/Department/i), "2");

    // Submit the form
    await userEvent.click(screen.getByText(/Save/i));

    expect(onEmployeeCreatedMock).toHaveBeenCalled();
    expect(onCloseMock).toHaveBeenCalled();
  });

  it('calls onClose when Cancel button is clicked', async () => {
    await userEvent.click(screen.getByText(/Cancel/i));
    expect(onCloseMock).toHaveBeenCalled();
  });
});
