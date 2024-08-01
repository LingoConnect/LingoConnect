package LingoConnect.app.service;

import LingoConnect.app.dto.UserDTO;
import LingoConnect.app.entity.GuardianMember;
import LingoConnect.app.entity.User;
import LingoConnect.app.repository.GuardianMemberRepository;
import LingoConnect.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService implements UserDetailsService {
    private final GuardianMemberRepository guardianMemberRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(GuardianMemberRepository guardianMemberRepository,
                       UserRepository userRepository,
                       PasswordEncoder passwordEncoder) {
        this.guardianMemberRepository = guardianMemberRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<UserDTO> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(this::convertEntityToDTO)
                .collect(Collectors.toList());
    }

    public UserDTO getUserById(Long id) {
        Optional<User> user = userRepository.findById(id);
        return user.map(this::convertEntityToDTO).orElse(null);
    }

    public UserDTO createUser(UserDTO userDTO) {
        userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        User user = convertDTOToEntity(userDTO);
        User savedUser = userRepository.save(user);
        return convertEntityToDTO(savedUser);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    private UserDTO convertEntityToDTO(User user) {
        return UserDTO.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .password(user.getPassword())
                .role(user.getRole())
                .build();
    }

    private User convertDTOToEntity(UserDTO userDTO) {
        return User.builder()
                .id(userDTO.getId())
                .username(userDTO.getUsername())
                .email(userDTO.getEmail())
                .password(userDTO.getPassword())
                .role(userDTO.getRole())
                .build();
    }

    public boolean linkGuardianToMember(Long guardianId, Long memberId) {
        Optional<User> guardianOptional = userRepository.findById(guardianId);
        Optional<User> memberOptional = userRepository.findById(memberId);

        if (guardianOptional.isPresent() && memberOptional.isPresent()) {
            User guardian = guardianOptional.get();
            User member = memberOptional.get();

            GuardianMember guardianMember = GuardianMember.builder()
                    .guardian(guardian)
                    .member(member)
                    .build();

            guardianMemberRepository.save(guardianMember);
            return true;
        }
        return false;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("No user found with name"));

        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getUsername())
                .password(user.getPassword())
                .roles(user.getRole())
                .build();
    }
}
