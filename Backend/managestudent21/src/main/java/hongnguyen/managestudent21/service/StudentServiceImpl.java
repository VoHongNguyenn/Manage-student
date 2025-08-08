package hongnguyen.managestudent21.service;

import hongnguyen.managestudent21.dto.Response;
import hongnguyen.managestudent21.dto.StudentDTO;
import hongnguyen.managestudent21.entity.StudentEntity;
import hongnguyen.managestudent21.repository.StudentRepository;
import hongnguyen.managestudent21.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;

    @Autowired
    public StudentServiceImpl(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Override
    public Response getAllStudent() {
        Response response = new Response();
        try {
            List<StudentEntity> studentEntityList = this.studentRepository.findAll();
            if (studentEntityList.isEmpty()) {
                response.setStatusCode(400);
                response.setMessage("No student found");
            } else {
                List<StudentDTO> studentDTOList = Utils.mapStudentEntityListToStudentDTOList(studentEntityList);
                response.setStatusCode(200);
                response.setMessage("Success");
                response.setStudentList(studentDTOList);
            }
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error: " + e.getMessage());
        }

        return response;
    }

    @Override
    public Response getStudentById(Long studentId) {
        Response response = new Response();
        try {
            Optional<StudentEntity> studentEntityOptional = this.studentRepository.findById(studentId);
            if (studentEntityOptional.isEmpty()) {
                response.setStatusCode(400);
                response.setMessage("Student id " + studentId + " not found");
            } else {
                StudentEntity existStudent = studentEntityOptional.get();
                StudentDTO studentDTO = Utils.mapStudentEntityToStudentDTO(existStudent);
                response.setStatusCode(200);
                response.setMessage("Success");
                response.setStudent(studentDTO);
            }
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response addStudent(StudentEntity student) {
        Response response = new Response();
        try {
            if (this.studentExistByEmail(student.getEmail())) {
                response.setStatusCode(400);
                response.setMessage("Student email already exist");
            } else {
                StudentEntity savedStudent = this.studentRepository.save(student);
                StudentDTO studentDTO = Utils.mapStudentEntityToStudentDTO(savedStudent);
                response.setStatusCode(200);
                response.setMessage("Success");
                response.setStudent(studentDTO);
            }
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response deleteStudentById(Long studentId) {
        Response response = new Response();
        try {
            Optional<StudentEntity> studentEntityOptional = this.studentRepository.findById(studentId);
            if (studentEntityOptional.isEmpty()) {
                response.setStatusCode(400);
                response.setMessage("Student id " + studentId + " not found");
            } else {
                this.studentRepository.deleteById(studentId);
                response.setStatusCode(200);
                response.setMessage("Success");
            }
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response updateStudentById(StudentEntity student, Long studentId) {
        Response response = new Response();
        try {
            Optional<StudentEntity> studentEntityOptional = this.studentRepository.findById(studentId);
            if (studentEntityOptional.isEmpty()) {
                response.setStatusCode(400);
                response.setMessage("Student id " + studentId + " not found");
            } else {
                StudentEntity existStudent = studentEntityOptional.get();
                existStudent.setName(student.getName());
                existStudent.setEmail(student.getEmail());
                existStudent.setAvatar(student.getAvatar());
                existStudent.setPassword(student.getPassword());
                existStudent.setUserName(student.getUserName());
                existStudent.setDepartment(student.getDepartment());
                StudentEntity updatedStudent = this.studentRepository.save(existStudent);
                StudentDTO studentDTO = Utils.mapStudentEntityToStudentDTO(updatedStudent);
                response.setStatusCode(200);
                response.setMessage("Success");
                response.setStudent(studentDTO);
            }
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response findStudentByName(String name) {
        Response response = new Response();
        try {
            List<StudentEntity> studentEntityList = this.studentRepository.findByNameContaining(name);
            if (studentEntityList.isEmpty()) {
                response.setStatusCode(400);
                response.setMessage("No student found");
            } else {
                List<StudentDTO> studentDTOList = Utils.mapStudentEntityListToStudentDTOList(studentEntityList);
                response.setStatusCode(200);
                response.setMessage("Success");
                response.setStudentList(studentDTOList);
            }
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error: " + e.getMessage());
        }
        return response;
    }

    @Override
    public List<String> getDistinctDepartment() {
        return this.studentRepository.getDistinctDepartments();
    }

    @Override
    public Response findStudentByDepartment(String department) {
        Response response = new Response();
        try {
            List<StudentEntity> studentEntityList = this.studentRepository.findByDepartment(department);
            if (studentEntityList.isEmpty()) {
                response.setStatusCode(400);
                response.setMessage("No student found");
            } else {
                List<StudentDTO> studentDTOList = Utils.mapStudentEntityListToStudentDTOList(studentEntityList);
                response.setStatusCode(200);
                response.setMessage("Success");
                response.setStudentList(studentDTOList);
            }
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error: " + e.getMessage());
        }
        return response;
    }

    private boolean studentExistByEmail(String email) {
        return this.studentRepository.findByEmail(email).isPresent();
    }
}
