package LingoConnect.app.repository;

import LingoConnect.app.entity.GuardianMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GuardianMemberRepository extends JpaRepository<GuardianMember, Long> {
}
