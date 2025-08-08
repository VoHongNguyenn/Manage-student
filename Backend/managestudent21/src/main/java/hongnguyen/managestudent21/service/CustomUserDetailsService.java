package hongnguyen.managestudent21.service;

import hongnguyen.managestudent21.exception.OurException;
import hongnguyen.managestudent21.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private AccountRepository accountRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return (UserDetails) this.accountRepository.findByEmail(username)
                .orElseThrow(() -> new OurException("Username/Email not found"));

    }
}
