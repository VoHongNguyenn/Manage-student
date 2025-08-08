package hongnguyen.managestudent21.service;

import hongnguyen.managestudent21.dto.ChangePasswordRequest;
import hongnguyen.managestudent21.dto.LoginRequest;
import hongnguyen.managestudent21.dto.Response;
import hongnguyen.managestudent21.entity.AccountEntity;

public interface AccountService {
    Response login(LoginRequest loginRequest);
    Response getAllAccount();
    Response getAccountById(Long accountId);
    Response addAccount(AccountEntity account);
    Response updateAccount(Long accountId, AccountEntity account);
    Response deleteAccountById(Long accountId);
    Response findAccountByName(String name);
    Response findAccountByRole(String role);
    Response getLoggedInAccountNotPassword(String email); // lấy thông tin tài khoản đang đăng nhập
    Response updatePasswordLoggedInAccount(Long idAccount, ChangePasswordRequest changePasswordRequest);
}
