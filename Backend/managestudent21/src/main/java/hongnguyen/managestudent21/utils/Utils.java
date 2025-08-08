package hongnguyen.managestudent21.utils;

import hongnguyen.managestudent21.dto.AccountDTO;
import hongnguyen.managestudent21.dto.StudentDTO;
import hongnguyen.managestudent21.entity.AccountEntity;
import hongnguyen.managestudent21.entity.StudentEntity;

import java.util.List;
import java.util.stream.Collectors;

public class Utils {

    static public StudentDTO mapStudentEntityToStudentDTO(StudentEntity student) {
        StudentDTO studentDTO = new StudentDTO();
        studentDTO.setId(student.getId());
        studentDTO.setName(student.getName());
        studentDTO.setAvatar(student.getAvatar());
        studentDTO.setEmail(student.getEmail());
        studentDTO.setUserName(student.getUserName());
        studentDTO.setDepartment(student.getDepartment());
        studentDTO.setPassword(student.getPassword());
        return studentDTO;
    }

    static public List<StudentDTO> mapStudentEntityListToStudentDTOList(List<StudentEntity> studentEntityList) {
        return studentEntityList.stream().map(Utils::mapStudentEntityToStudentDTO).collect(Collectors.toList());
    }

    static public AccountDTO mapAccountEntityToAccountDTO(AccountEntity account) {
        AccountDTO accountDTO = new AccountDTO();
        accountDTO.setId(account.getId());
        accountDTO.setName(account.getName());
        accountDTO.setRole(account.getRole());
        accountDTO.setAvatar(account.getAvatar());
        accountDTO.setEmail(account.getEmail());
        accountDTO.setUserName(account.getUserNameForDisplay());
        return accountDTO;
    }

    static public List<AccountDTO> mapAccountEntityListToAccountDTOList(List<AccountEntity> accountEntityList){
        return accountEntityList.stream().map(Utils::mapAccountEntityToAccountDTO).collect(Collectors.toList());
    }
}
