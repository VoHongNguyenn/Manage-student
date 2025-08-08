package hongnguyen.managestudent21.controller;

import hongnguyen.managestudent21.dto.LoginRequest;
import hongnguyen.managestudent21.dto.Response;
import hongnguyen.managestudent21.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AccountService accountService;

    @Autowired
    public AuthController(AccountService accountService) {
        this.accountService = accountService;
    }

    @PostMapping("/login")
    public ResponseEntity<Response> login(@RequestBody LoginRequest loginRequest){
        Response response = this.accountService.login(loginRequest);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }
}
