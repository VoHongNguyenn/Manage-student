package hongnguyen.managestudent21.repository;

import hongnguyen.managestudent21.entity.StudentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface StudentRepository extends JpaRepository<StudentEntity, Long> {
    Optional<StudentEntity> findByEmail(String email);
    List<StudentEntity> findByNameContaining(String name);
    @Query("SELECT DISTINCT s.department FROM StudentEntity s")
    List<String> getDistinctDepartments();
    List<StudentEntity> findByDepartment(String department);
}
