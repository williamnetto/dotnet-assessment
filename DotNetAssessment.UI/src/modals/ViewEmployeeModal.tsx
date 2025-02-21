import React, { useEffect, useState } from "react";
import moment from "moment";
import { Employee } from "../App";
import logo from "../assets/user.png";
import { calculateTimeInCompany } from "../utils/DateTimeHelper";
import { updateEmployeeDepartment } from "../services/employeeService";
import { getAllDepartments } from "../services/departmentService";

interface ViewEmployeeModalProps {
    employee: Employee | null;
    onClose: () => void;
    onEmployeeUpdated: (updatedEmployee: Employee) => void;
}

const ViewEmployeeModal: React.FC<ViewEmployeeModalProps> = ({ employee, onClose, onEmployeeUpdated }) => {
    const [departments, setDepartments] = useState<{ id: number, name: string }[]>([]);
    const [selectedDepartment, setSelectedDepartment] = useState<number | undefined>(employee?.department.id);

    useEffect(() => {
        const fetchDepartments = async () => {
            const response = await getAllDepartments();
            setDepartments(response);
        };

        fetchDepartments();
    }, []);

    // Handle department change
    const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDepartment(Number(e.target.value));
    };

    // Handle Save Button Click (Update department)
    const handleUpdate = async () => {
        if (employee && selectedDepartment !== undefined) {
            const updatedEmployee = {
                ...employee,
                departmentId: selectedDepartment,
                department: departments.find(dept => dept.id === selectedDepartment)
            } as Employee;

            const response = await updateEmployeeDepartment(updatedEmployee);
            onEmployeeUpdated(response);
            onClose();
        }
    };

    //Edge case of not having an Employee
    if (!employee) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Overlay */}
            <div className="absolute inset-0 bg-gray-500 opacity-50"></div>

            {/* Modal */}
            <div className="bg-white p-6 rounded-lg shadow-lg min-w-250 grid grid-cols-3 gap-6 z-10">
                {/* Left Column: Avatar */}
                <div className="flex justify-center items-center">
                    <img className="w-50 h-50 rounded-full object-cover" src={logo} alt="Avatar" />
                </div>

                {/* Middle Column: Employee Details */}
                <div>
                    <h3 className="text-xl font-semibold mb-3">{employee.firstName} {employee.lastName}</h3>

                    <p className="font-semibold w-60">
                        Employee ID:
                        <span className="text-sm text-gray-500 ml-2">{employee.id}</span>
                    </p>
                    <p className="font-semibold w-60">
                        Department:
                        <span className="text-sm text-gray-500 ml-2">{employee.department.name}</span>
                    </p>
                    <p className="font-semibold w-60">
                        Telephone:
                        <span className="text-sm text-gray-500 ml-2">{employee.phone}</span>
                    </p>

                    <p className="font-semibold w-60">
                        Address:
                        <span className="text-sm text-gray-500 ml-2">{employee.address}</span>
                    </p>

                    {/* Update Department */}
                    <div className="mt-4">
                        <p className="font-semibold">Update Department:</p>
                        <div className="flex items-center gap-2 mt-1">
                            <select className="w-60 p-2 border border-gray-300 rounded-md"
                                value={selectedDepartment}
                                onChange={handleDepartmentChange}
                            >
                                {departments.map(department => (
                                    <option key={department.id} value={department.id}>
                                        {department.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Right Column: Hire Date & Time in Company */}
                <div className="h-full">
                    <p className="font-semibold">Hire Date:</p>
                    <p className="text-sm text-gray-500">
                        {moment(employee.hireDate).format("MMM D, YYYY")}
                    </p>
                    <p className="text-sm text-gray-500">
                        ({calculateTimeInCompany(employee.hireDate)})
                    </p>
                </div>
                {/* Close Button */}
                <div className="col-span-3 flex justify-end items-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-gradient-to-r from-gray-500 to-gray-700 hover:from-gray-600 hover:to-gray-800 text-white px-4 py-2 rounded-md shadow-md transition-all duration-300"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleUpdate}
                        className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white px-4 py-2 rounded-md shadow-md transition-all duration-300"
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewEmployeeModal;
