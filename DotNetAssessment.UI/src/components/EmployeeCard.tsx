import React from "react";
import moment from "moment";
import { Employee } from "../types/Employee";
import logo from "../assets/user.png";
import { calculateTimeInCompany } from "../utils/DateTimeHelper";

interface EmployeeCardProps {
  employee: Employee;
  onViewDetails: (employee: Employee) => void;
  onDelete: (id: number) => void;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee, onViewDetails, onDelete }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-3 flex items-center gap-3 min-w-xl">
      {/* Avatar */}
      <img className="w-50 h-50 rounded-full object-cover" src={logo} alt="Avatar" />

      {/* Employee Info */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{employee.firstName} {employee.lastName}</h3>
        <p className="text-gray-600">{employee.department.name}</p>
        <p className="text-sm font-semibold mt-4">Hire Date</p>
        <p className="text-sm text-gray-500">{moment(employee.hireDate).format("MMM D, YYYY")} ({calculateTimeInCompany(employee.hireDate)})</p>

        {/* Buttons */}
        <div className="flex gap-2 mt-3 w-full justify-end">
          <button
            className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white px-4 py-2 rounded-md shadow-md transition-all duration-300"
            onClick={() => onViewDetails(employee)}
          >
            View Details
          </button>

          <button
            className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white px-4 py-2 rounded-md shadow-md transition-all duration-300"
            onClick={() => onDelete(employee.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
