package hongnguyen.managestudent21.service;

import hongnguyen.managestudent21.dto.Response;
import hongnguyen.managestudent21.entity.StudentEntity;

import java.util.List;

public interface StudentService {
    Response getAllStudent();
    Response getStudentById(Long studentId);
    Response addStudent(StudentEntity student);
    Response deleteStudentById(Long studentId);
    Response updateStudentById(StudentEntity student, Long studentId);
    Response findStudentByName(String name);
    List<String> getDistinctDepartment();
    Response findStudentByDepartment(String department);
}
