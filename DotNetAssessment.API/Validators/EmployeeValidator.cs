using DotNetAssessment.Domain.Entities;
using FluentValidation;

public class EmployeeValidator : AbstractValidator<Employee>
{
    public EmployeeValidator()
    {
        RuleFor(e => e.FirstName)
            .NotEmpty().WithMessage("First Name is required")
            .MaximumLength(50).WithMessage("First Name must be at most 50 characters");

        RuleFor(e => e.LastName)
            .NotEmpty().WithMessage("Last Name is required")
            .MaximumLength(50).WithMessage("Last Name must be at most 50 characters");

        RuleFor(e => e.HireDate)
            .NotEmpty().WithMessage("Hire Date is required")
            .Must(date => date != default).WithMessage("Invalid Hire Date.")
            .LessThan(DateTime.Today).WithMessage("Hire Date cannot be in the future");

        RuleFor(e => e.Phone)
            .NotEmpty().WithMessage("Phone number is required")
            .Matches(@"^\+?[1-9]\d{1,14}$").WithMessage("Phone number must be in E.164 format (e.g., +123456789)");

        RuleFor(e => e.Address)
            .NotEmpty().WithMessage("Address is required")
            .MaximumLength(255).WithMessage("Address must be at most 255 characters");

        RuleFor(e => e.DepartmentId)
            .GreaterThan(0).WithMessage("Department must be selected");
    }
}
