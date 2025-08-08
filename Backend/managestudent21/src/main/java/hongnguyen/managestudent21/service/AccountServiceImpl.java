package hongnguyen.managestudent21.service;

import hongnguyen.managestudent21.dto.AccountDTO;
import hongnguyen.managestudent21.dto.ChangePasswordRequest;
import hongnguyen.managestudent21.dto.LoginRequest;
import hongnguyen.managestudent21.dto.Response;
import hongnguyen.managestudent21.entity.AccountEntity;
import hongnguyen.managestudent21.exception.OurException;
import hongnguyen.managestudent21.repository.AccountRepository;
import hongnguyen.managestudent21.utils.JWTUtils;
import hongnguyen.managestudent21.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AccountServiceImpl implements AccountService {

    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;
    private final JWTUtils jwtUtils;
    private final AuthenticationManager authenticationManager;

    @Autowired
    public AccountServiceImpl(AccountRepository accountRepository, PasswordEncoder passwordEncoder, JWTUtils jwtUtils, AuthenticationManager authenticationManager) {
        this.accountRepository = accountRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
        this.authenticationManager = authenticationManager;
    }

    @Override
    public Response login(LoginRequest loginRequest) {
        Response response = new Response();
        try {
            this.authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(),
                    loginRequest.getPassword()));
            var account = this.accountRepository.findByEmail(loginRequest.getEmail())
                    .orElseThrow(() -> new OurException("Account email not found"));
            var token = this.jwtUtils.generateToken(account);
            response.setStatusCode(200);
            response.setToken(token);
            response.setRole(account.getRole());
            response.setExpirationTime("7 Days");
            response.setMessage("Login success");
        } catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error Occurred During USer Login: " + e.getMessage());
        }

        return response;
    }

    @Override
    public Response getAllAccount() {
        Response response = new Response();
        try {
            List<AccountEntity> accountEntityList = this.accountRepository.findAll();
            if (accountEntityList.isEmpty()) {
                response.setStatusCode(400);
                response.setMessage("No account found");
            } else {
                List<AccountDTO> accountDTOList = Utils.mapAccountEntityListToAccountDTOList(accountEntityList);
                response.setStatusCode(200);
                response.setMessage("Success");
                response.setAccountList(accountDTOList);
            }
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getAccountById(Long accountId) {
        Response response = new Response();
        try {
            Optional<AccountEntity> optionalAccountEntity = this.accountRepository.findById(accountId);
            if (optionalAccountEntity.isEmpty()) {
                response.setStatusCode(400);
                response.setMessage("Account id " + accountId + " not found");
            } else {
                AccountEntity existAccount = optionalAccountEntity.get();
                AccountDTO accountDTO = Utils.mapAccountEntityToAccountDTO(existAccount);
                response.setStatusCode(200);
                response.setMessage("Success");
                response.setAccount(accountDTO);
            }
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response addAccount(AccountEntity account) {
        Response response = new Response();
        try {
            if (this.accountExistByEmail(account.getEmail())) {
                response.setStatusCode(400);
                response.setMessage("Account email already exist");
            } else {
                account.setPassword(this.passwordEncoder.encode(account.getPassword()));
                AccountEntity savedAccount = this.accountRepository.save(account);
                AccountDTO accountDTO = Utils.mapAccountEntityToAccountDTO(savedAccount);
                response.setStatusCode(200);
                response.setMessage("Success");
                response.setAccount(accountDTO);
            }
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response updateAccount(Long accountId, AccountEntity account) {
        Response response = new Response();
        try {
            Optional<AccountEntity> optionalAccountEntity = this.accountRepository.findById(accountId);
            if (optionalAccountEntity.isEmpty()) {
                response.setStatusCode(400);
                response.setMessage("Account id " + accountId + " not found");
            } else {
                AccountEntity existAccount = optionalAccountEntity.get();
                existAccount.setName(account.getName());
                existAccount.setAvatar(account.getAvatar());
                existAccount.setUserName(account.getUserNameForDisplay());
                existAccount.setRole(account.getRole());
                existAccount.setEmail(account.getEmail());
                AccountEntity updatedAccount = this.accountRepository.save(existAccount);
                AccountDTO accountDTO = Utils.mapAccountEntityToAccountDTO(updatedAccount);
                response.setStatusCode(200);
                response.setMessage("Success");
                response.setAccount(accountDTO);
            }
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response deleteAccountById(Long accountId) {
        Response response = new Response();
        try {
            if (!this.accountRepository.existsById(accountId)) {
                response.setStatusCode(400);
                response.setMessage("Account id " + accountId + " not found");
            } else {
                this.accountRepository.deleteById(accountId);
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
    public Response findAccountByName(String name) {
        Response response = new Response();
        try {
            List<AccountEntity> accountEntityList = this.accountRepository.findByNameContaining(name);
            if (accountEntityList.isEmpty()) {
                response.setStatusCode(400);
                response.setMessage("No student found");
            } else {
                List<AccountDTO> accountDTOList = Utils.mapAccountEntityListToAccountDTOList(accountEntityList);
                response.setStatusCode(200);
                response.setMessage("Success");
                response.setAccountList(accountDTOList);
            }
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response findAccountByRole(String role) {
        Response response = new Response();
        try {
            List<AccountEntity> accountEntityList = this.accountRepository.findByRole(role);
            if (accountEntityList.isEmpty()) {
                response.setStatusCode(400);
                response.setMessage("No account found");
            } else {
                List<AccountDTO> accountDTOList = Utils.mapAccountEntityListToAccountDTOList(accountEntityList);
                response.setStatusCode(200);
                response.setMessage("Success");
                response.setAccountList(accountDTOList);
            }
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getLoggedInAccountNotPassword(String email) {
        // hàm lấy thông tin tài khoản đang đăng nhập
        Response response = new Response();
        try {
            Optional<AccountEntity> optionalAccountEntity = this.accountRepository.findByEmail(email);
            if (optionalAccountEntity.isEmpty()){
                response.setStatusCode(400);
                response.setMessage("Account email not found");
            }
            else {
                AccountEntity existAccount = optionalAccountEntity.get();
                AccountDTO accountDTO = Utils.mapAccountEntityToAccountDTO(existAccount);
                response.setStatusCode(200);
                response.setMessage("Success");
                response.setAccount(accountDTO);
            }
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response updatePasswordLoggedInAccount(Long idAccount, ChangePasswordRequest changePasswordRequest) {
        Response response = new Response();
        try {
            Optional<AccountEntity> optionalAccountEntity = this.accountRepository.findById(idAccount);
            if (optionalAccountEntity.isEmpty()){
                response.setStatusCode(400);
                response.setMessage("Account id " + idAccount + " not found");
            }
            else {
                AccountEntity existAccount = optionalAccountEntity.get();
                if (this.passwordEncoder.matches(changePasswordRequest.getCurrentPassword(), existAccount.getPassword())){
                    existAccount.setPassword(this.passwordEncoder.encode(changePasswordRequest.getNewPassword()));
                    AccountEntity updatedAccount = this.accountRepository.save(existAccount);
                    AccountDTO accountDTO = Utils.mapAccountEntityToAccountDTO(updatedAccount);
                    response.setStatusCode(200);
                    response.setMessage("Success");
                    response.setAccount(accountDTO);
                }
                else {
                    response.setStatusCode(401);
                    response.setMessage("Password incorrect");
                }
            }
        }
        catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error: " + e.getMessage());
        }
        return response;
    }

    private boolean accountExistByEmail(String email) {
        return this.accountRepository.findByEmail(email).isPresent();
    }
}
