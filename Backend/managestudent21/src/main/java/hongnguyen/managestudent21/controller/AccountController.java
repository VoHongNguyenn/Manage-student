package hongnguyen.managestudent21.controller;

import hongnguyen.managestudent21.dto.ChangePasswordRequest;
import hongnguyen.managestudent21.dto.Response;
import hongnguyen.managestudent21.entity.AccountEntity;
import hongnguyen.managestudent21.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    private final AccountService accountService;

    @Autowired
    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @GetMapping()
    public ResponseEntity<Response> getAllAccount() {
        Response response = this.accountService.getAllAccount();
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Response> getAccountById(@PathVariable Long id) {
        Response response = this.accountService.getAccountById(id);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PostMapping("/addAccount")
    public ResponseEntity<Response> addAccount(@RequestBody AccountEntity account){
        Response response = this.accountService.addAccount(account);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PutMapping("/updateAccount/{id}")
    public ResponseEntity<Response> updateAccountById(@PathVariable Long id, @RequestBody AccountEntity account){
        Response response = this.accountService.updateAccount(id, account);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @DeleteMapping("/deleteAccountById/{id}")
    public ResponseEntity<Response> deleteAccountBYId(@PathVariable Long id){
        Response response = this.accountService.deleteAccountById(id);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/findByName")
    public ResponseEntity<Response> findAccountByName(@RequestParam("name") String name){
        Response response = this.accountService.findAccountByName(name);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/findByRole")
    public ResponseEntity<Response> findAccountByRole(@RequestParam("role") String role){
        Response response = this.accountService.findAccountByRole(role);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/getLoggedInAccountNotPassword")
    public ResponseEntity<Response> getLoggedInAccountNotPassword(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        Response response = this.accountService.getLoggedInAccountNotPassword(email);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PutMapping("/updatePasswordLoggedInAccount/{id}")
    public ResponseEntity<Response> updatePasswordLoggedInAccount(@PathVariable Long id,
                                                                  @RequestBody ChangePasswordRequest changePasswordRequest){
        Response response = this.accountService.updatePasswordLoggedInAccount(id, changePasswordRequest);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }
}
