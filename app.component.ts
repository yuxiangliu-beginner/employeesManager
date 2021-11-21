import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public employees: Employee[];
  public editEmployee: Employee;
  public deleteEmployee: Employee;
  
  
  constructor(private employeeService: EmployeeService){};
  ngOnInit()
  {
    this.getEmployees();
  }
  public getEmployees():void
  {
    this.employeeService.getEmployees().subscribe
    (
      (response:Employee[])=>
      {
        this.employees = response;
      },
      (error:HttpErrorResponse)=>
      {
          alert(error.message);
      }
    );
  }
  public onOpenModal(employee:Employee, mode:string) : void
  {
      const container = document.getElementById('main-container');
      const button = document.createElement('button');
      button.type = 'button';
      button.style.display = 'none';
      button.setAttribute('data-toggle','modal');
      
      if(mode === 'add')
      {
         button.setAttribute('data-target','#addEmployeeModal');
      }
      if(mode === 'edit')
      {
        this.editEmployee = employee;
        button.setAttribute('data-target','#updateEmployeeModal');
      }
      if(mode === 'delete')
      {
        this.deleteEmployee = employee;
         button.setAttribute('data-target','#deleteEmployeeModal');
      }
      container?.appendChild(button);
      button.click();
  }
  public onAddEmployee(addForm : NgForm): void
  {
    //get close button and click to close the form
    document.getElementById("add-employee-form")?.click();
    
    //add Empolyee to the database
      this.employeeService.addEmployees(addForm.value).subscribe
      (
        (response:Employee) =>
        {
          console.log(response);
          this.getEmployees();
          addForm.reset();
        },
        (error:HttpErrorResponse) =>
        {
          alert(error.message);
        }
      );
  }
  public onUpdateEmployee(employee:Employee): void
  {
      this.employeeService.updateEmployees(employee).subscribe
      (
        (response:Employee) =>
        {
          console.log(response);
          this.getEmployees();

        },
        (error:HttpErrorResponse) =>
        {
          alert(error.message);
        }
        

      );
  }
  public onDeleteEmloyee(id:number): void
  {
      this.employeeService.deleteEmployees(id).subscribe
      (
        (response:void) =>
        {
          // console.log(response);
          this.getEmployees();

        },
        (error:HttpErrorResponse) =>
        {
          alert(error.message);
        }
        

      );
  }
  public searchEmployees(key:string): void
  {
    const results : Employee[] = [];
    for(const empolyee of this.employees)
    {
      if(empolyee.name.toLocaleLowerCase().indexOf(key.toLocaleLowerCase())!=-1
      ||empolyee.email.toLocaleLowerCase().indexOf(key.toLocaleLowerCase())!=-1
      ||empolyee.phone.toLocaleLowerCase().indexOf(key.toLocaleLowerCase())!=-1
      ||empolyee.jobTitle.toLocaleLowerCase().indexOf(key.toLocaleLowerCase())!=-1)
        results.push(empolyee);

    }
    this.employees =results;
    if(results.length===0||!key)
    {
      this.getEmployees();
    }
  }
}
