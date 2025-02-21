import React, { useState, useEffect } from 'react';
import { Employee } from '../types/Employee';
import logo from '../assets/user.png';
import { createEmployee } from '../services/employeeService';
import { getAllDepartments } from '../services/departmentService';

interface AddEmployeeModalProps {
  onClose: () => void;
  onEmployeeCreated: (newEmployee: Employee) => void;
}

const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({ onClose, onEmployeeCreated }) => {
  const [newEmployee, setNewEmployee] = useState<Employee>({
    id: 0,
    firstName: '',
    lastName: '',
    hireDate: null,
    phone: '',
    address: '',
    departmentId: 1,
    department: { id: 1, name: 'IT' },
  });
  const [departments, setDepartments] = useState<{ id: number, name: string }[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});

  // Fetch departments from the API
  useEffect(() => {
    const fetchDepartments = async () => {
      const response = await getAllDepartments();
      setDepartments(response);
    };

    fetchDepartments();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'department') {
      setNewEmployee({
        ...newEmployee,
        departmentId: +value,
        department: departments.find(dept => dept.id.toString() === value) || newEmployee.department,
      });
    } else {
      setNewEmployee({
        ...newEmployee,
        [name]: value === '' ? null : value,
      });
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("aaa")

    try {
      const response = await createEmployee(newEmployee);
      console.log("bbb")
      onEmployeeCreated(response);
      onClose();
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        // Extract validation errors
        console.log("ccc")
        setErrors(error.response.data);
        console.log(errors.firstName)
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-500 opacity-50"></div>
      <div className="bg-white p-4 rounded-lg shadow-lg min-w-250 flex flex-col z-10">
        {/* Header */}
        <h2 className="text-xl font-semibold mb-4 text-center">Add New Employee</h2>

        <form onSubmit={handleFormSubmit} className="grid grid-cols-3 gap-4">
          {/* Avatar Column */}
          <div className="flex justify-center items-center">
            <img className="w-50 h-50 rounded-full object-cover" src={logo} alt="Avatar" />
          </div>

          {/* Employee Info (First Name, Last Name, Hire Date) Column */}
          <div className="space-y-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={newEmployee.firstName}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              {errors.FirstName && errors.FirstName.map((error, index) => (
                <p key={index} className="text-red-500 text-sm">{error}</p>
              ))}
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={newEmployee.lastName}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              {errors.LastName && errors.LastName.map((error, index) => (
                <p key={index} className="text-red-500 text-sm">{error}</p>
              ))}
            </div>
            <div>
              <label htmlFor="hireDate" className="block text-sm font-medium text-gray-700">Hire Date</label>
              <input
                type="date"
                name="hireDate"
                id="hireDate"
                value={newEmployee.hireDate ?? ''}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              {errors.HireDate && errors.HireDate.map((error, index) => (
                <p key={index} className="text-red-500 text-sm">{error}</p>
              ))}
            </div>
          </div>

          {/* Phone, Address, Department Column */}
          <div className="space-y-4">
            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                value={newEmployee.phone}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              {errors.Phone && errors.Phone.map((error, index) => (
                <p key={index} className="text-red-500 text-sm">{error}</p>
              ))}
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                name="address"
                id="address"
                value={newEmployee.address}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              {errors.Address && errors.Address.map((error, index) => (
                <p key={index} className="text-red-500 text-sm">{error}</p>
              ))}
            </div>

            {/* Department Dropdown */}
            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
              <select
                name="department"
                id="department"
                value={newEmployee.department.id}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                {departments.map(department => (
                  <option key={department.id} value={department.id}>
                    {department.name}
                  </option>
                ))}
              </select>
              {errors.Department && errors.Department.map((error, index) => (
                <p key={index} className="text-red-500 text-sm">{error}</p>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="col-span-3 flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gradient-to-r from-gray-500 to-gray-700 hover:from-gray-600 hover:to-gray-800 text-white px-4 py-2 rounded-md shadow-md transition-all duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white px-4 py-2 rounded-md shadow-md transition-all duration-300"
            >
              Save
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default AddEmployeeModal;
