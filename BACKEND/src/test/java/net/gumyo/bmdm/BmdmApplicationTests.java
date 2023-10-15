package net.gumyo.bmdm;

import java.util.List;
import java.util.Set;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import net.gumyo.bmdm.entity.AppRole;
import net.gumyo.bmdm.entity.Menu;
import net.gumyo.bmdm.entity.Menubyrole;
import net.gumyo.bmdm.entity.RoleByUser;
import net.gumyo.bmdm.entity.User;
import net.gumyo.bmdm.entity.User.Role;
import net.gumyo.bmdm.entity.pks.MexroPk;
import net.gumyo.bmdm.entity.pks.RoxurPK;
import net.gumyo.bmdm.repository.MenuByRoleRepository;
import net.gumyo.bmdm.repository.MenuRepository;
import net.gumyo.bmdm.repository.RoleByUserRepository;
import net.gumyo.bmdm.repository.RoleRepository;
import net.gumyo.bmdm.repository.UserRepository;

@SpringBootTest
class BmdmApplicationTests {
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private UserRepository urepo;
	@Autowired
	private MenuRepository merpo;
	@Autowired
	private MenuByRoleRepository mbrrepo;
	@Autowired
	private RoleRepository rrepo;
	@Autowired
	private RoleByUserRepository rburepo;

	@Test
	void createBasicUserWithRoleAndMenu() {
		User user = urepo.save(User
				.builder()
				.urname("admin")
				.urnickname("bmdm")
				.email("hs")
				.pw(passwordEncoder.encode("1234"))
				.isAuthed(true)
				.isDisabled(false)
				.isLogged(false)
				.introduce("HELLO!")
				.isDeleted(false)
				.roles(Set.of(Role.ADMIN, Role.USER))
				.build());
		Menu sysMenu = createMenu("SYSTEM", "/system", 0, null);
		sysMenu = merpo.save(sysMenu);
		List<Menu> menus = List.of(
				createMenu("USER", "/system/user", 1, sysMenu.getMekey()),
				createMenu("ROLE", "/system/role", 2, sysMenu.getMekey()),
				createMenu("MENU", "/system/menu", 3, sysMenu.getMekey()),
				createMenu("LOCALE", "/system/locale", 5, sysMenu.getMekey()));

		List<Menu> savedMenus = merpo.saveAll(menus);
		AppRole role = rrepo.save(AppRole.builder().roname("DEFAULT").build());
		savedMenus.add(sysMenu);
		rburepo.save(RoleByUser.builder().pk(new RoxurPK(role.getRokey(), user.getUrkey())).build());
		savedMenus.forEach(
				menu -> mbrrepo.save(Menubyrole.builder().pk(new MexroPk(role.getRokey(), menu.getMekey())).build()));
	}

	private Menu createMenu(String name, String file, int order, Long parentKey) {
		return Menu.builder()
				.mename(name)
				.cache(true)
				.hide(false)
				.file(file)
				.meorder(order)
				.parentmekey(parentKey)
				.build();
	}

}
