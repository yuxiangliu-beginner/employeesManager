package YuxiangLiuPractice.employeeManager.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import YuxiangLiuPractice.employeeManager.model.Employee;
import YuxiangLiuPractice.employeeManager.service.EmployeeService;

@RestController
@RequestMapping("/employee")
public class EmployeeResourceController {
	
	@Autowired
	private final EmployeeService employeeservice;

	
	public EmployeeResourceController(EmployeeService employeeservice) {
		this.employeeservice = employeeservice;
	}
	
	
	@GetMapping("/all")
	public ResponseEntity<List<Employee>> getAllEmployees()
	{
		List<Employee> employees = employeeservice.findAllEmployees();
		return new ResponseEntity<>(employees,HttpStatus.OK);
	}
	
	@GetMapping("/find/{id}")
	public ResponseEntity<Employee> getEmployeeById(@PathVariable("id") Long id)
	{
		Employee employee = employeeservice.findEmployeeByID(id);
		return new ResponseEntity<>(employee,HttpStatus.OK);
	}

	@PostMapping("/add")
	public ResponseEntity<Employee> addEmployee(@RequestBody Employee employee)
	{
		Employee newemployee = employeeservice.addEmployee(employee);
		return new ResponseEntity<>(newemployee,HttpStatus.CREATED);
	}
	
	@PutMapping("/update")
	public ResponseEntity<Employee> updateEmployee(@RequestBody Employee employee)
	{
		Employee newemployee = employeeservice.updateEmployee(employee);
		return new ResponseEntity<>(newemployee,HttpStatus.OK);
	}
	
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable("id") Long id) {
    	employeeservice.deleteEmployee(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
	
	
}
