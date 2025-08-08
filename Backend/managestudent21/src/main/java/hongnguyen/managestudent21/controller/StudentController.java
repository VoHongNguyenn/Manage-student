package hongnguyen.managestudent21.controller;

import hongnguyen.managestudent21.dto.Response;
import hongnguyen.managestudent21.entity.StudentEntity;
import hongnguyen.managestudent21.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    private final StudentService studentService;

    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping()
    public ResponseEntity<Response> getAllStudent(){
        Response response = this.studentService.getAllStudent();
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Response> getStudentById(@PathVariable Long id){
        Response response = this.studentService.getStudentById(id);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PostMapping("/addStudent")
    public ResponseEntity<Response> addStudent(@RequestBody StudentEntity student){
        Response response = this.studentService.addStudent(student);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @DeleteMapping("/deleteStudentById/{id}")
    public ResponseEntity<Response> deleteStudentById(@PathVariable Long id){
        Response response = this.studentService.deleteStudentById(id);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PutMapping("/updateStudent/{id}")
    public ResponseEntity<Response> updateStudentById(@RequestBody StudentEntity student, @PathVariable Long id){
        Response response = this.studentService.updateStudentById(student, id);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/findByName")
    public ResponseEntity<Response> findStudentByName(@RequestParam("name") String name){
        Response response = this.studentService.findStudentByName(name);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/getDistinctDepartment")
    public ResponseEntity<List<String>> getDistinctDepartment(){
        List<String> departments = this.studentService.getDistinctDepartment();
        return ResponseEntity.ok(departments);
    }

    @GetMapping("/findByDepartment")
    public ResponseEntity<Response> findStudentByDepartment(@RequestParam("department") String department){
        Response response = this.studentService.findStudentByDepartment(department);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }
}
