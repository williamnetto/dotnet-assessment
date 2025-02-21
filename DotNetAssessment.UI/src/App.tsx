import { useState, useEffect } from 'react';
import ViewEmployeeModal from './modals/ViewEmployeeModal';
import AddEmployeeModal from './modals/AddEmployeeModal';
import { getAllEmployees, deleteEmployee } from './services/employeeService';
import EmployeeCard from './components/EmployeeCard';
import Loader from './components/Loader';
import { Employee } from './types/Employee';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [addEmpModalOpen, setAddEmpModalOpen] = useState(false);
  const [viewEmpModalOpen, setViewEmpModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      const employeeData = await getAllEmployees();
      setEmployees(employeeData);
      setIsLoading(false);
    };

    fetchEmployees();
  }, []);

  const handleEmployeeCreated = (newEmployee: Employee) => {
    setEmployees([...employees, newEmployee]);
  };

  const handleEmployeeUpdated = (updatedEmployee: Employee) => {
    // Update the employee list by replacing the updated employee
    setEmployees(prevEmployees =>
      prevEmployees.map(employee =>
        employee.id === updatedEmployee.id ? updatedEmployee : employee
      )
    );
  };

  const handleDeleteEmployee = async (id: number) => {
    await deleteEmployee(id);
    // Remove the employee from the state after successful deletion
    setEmployees(prevEmployees => prevEmployees.filter(emp => emp.id !== id));
  };

  const handleViewEmployeeDetails = (employee: Employee) => {
    setSelectedEmployee(employee);
    setViewEmpModalOpen(true);
  };


  //Show loader while fetching initial data
  if(isLoading)
    return <Loader/>

  return (
    <div className="container mx-auto px-4 py-8">

      {/* New Employee */}
      <div className="flex justify-center my-8">
        <button
          className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white px-4 py-2 rounded-md shadow-md transition-all duration-300"
          onClick={() => setAddEmpModalOpen(true)}
        >
          New Employee
        </button>
      </div>

      {/* Employee List */}
      <div className="flex flex-col gap-6 mt-6 items-center">
        {employees.map(employee => (
          <EmployeeCard
            key={employee.id}
            employee={employee}
            onViewDetails={handleViewEmployeeDetails}
            onDelete={handleDeleteEmployee}
          />
        ))}
      </div>

      {viewEmpModalOpen && (
        <ViewEmployeeModal
          employee={selectedEmployee}
          onEmployeeUpdated={handleEmployeeUpdated}
          onClose={() => setViewEmpModalOpen(false)}
        />
      )}

      {addEmpModalOpen && (
        <AddEmployeeModal
          onClose={() => setAddEmpModalOpen(false)}
          onEmployeeCreated={handleEmployeeCreated}
        />
      )}
    </div>
  );
};

export default App;
