package hongnguyen.managestudent21.repository;

import hongnguyen.managestudent21.entity.AccountEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AccountRepository extends JpaRepository<AccountEntity, Long> {
    Optional<AccountEntity> findByEmail(String email);
    List<AccountEntity> findByNameContaining(String name);
    List<AccountEntity> findByRole(String role);
}
