package LingoConnect.app.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.extern.slf4j.Slf4j;

@Entity
@Table(name = "Guardian_Member")
public class GuardianMember {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "guardian_id", nullable = false)
    private User guardian;

    @ManyToOne
    @JoinColumn(name = "member_id", nullable = false)
    private User member;

    @Builder
    public GuardianMember(Long id, User guardian, User member) {
        this.id = id;
        this.guardian = guardian;
        this.member = member;
    }

    public GuardianMember() {
    }
}
