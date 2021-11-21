package YuxiangLiuPractice.employeeManager.repo;
import YuxiangLiuPractice.employeeManager.model.Employee;



import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;



public interface EmployeeRepo extends JpaRepository<Employee,Long>{
	@Modifying
	@Transactional
    void deleteEmployeeById(Long id);


	Optional<Employee> findEmployeeById(Long id);

}
