package net.gumyo.bmdm;

import java.util.Set;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import net.gumyo.bmdm.entity.User;
import net.gumyo.bmdm.entity.User.Role;
import net.gumyo.bmdm.repository.UserRepository;

@SpringBootTest
class BmdmApplicationTests {
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private UserRepository urepo;

	@Test
	void createUser() {
		User user = User
				.builder()
				.urname("admin")
				.urnickname("bmdm")
				.email("hs@gumyo.net")
				.pw(passwordEncoder.encode("1234"))
				.isAuthed(true)
				.isDisabled(false)
				.isLogged(false)
				.introduce("HELLO!")
				.isDeleted(false)
				.roles(Set.of(Role.ADMIN, Role.USER))
				.build();

		urepo.save(user);
	}

}
