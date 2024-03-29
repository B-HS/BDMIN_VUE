package net.gumyo.bmdm;

import java.util.List;
import java.util.Set;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import net.gumyo.bmdm.entity.AppRole;
import net.gumyo.bmdm.entity.Locale;
import net.gumyo.bmdm.entity.Menu;
import net.gumyo.bmdm.entity.Menubyrole;
import net.gumyo.bmdm.entity.RoleByUser;
import net.gumyo.bmdm.entity.User;
import net.gumyo.bmdm.entity.User.Role;
import net.gumyo.bmdm.entity.pks.MexroPk;
import net.gumyo.bmdm.entity.pks.RoxurPK;
import net.gumyo.bmdm.repository.LocaleRepository;
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
	@Autowired
	private LocaleRepository lrepo;

	@Test
	void createBasicUserWithRoleAndMenuAndLocale() {
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

		List<Locale> locales = List.of(
				createLocale("404", "Page not found", "ページが見つかりませんでした", "페이지를 찾을 수 없습니다"),
				createLocale("ADD", "Add", "追加", "추가"),
				createLocale("ALARM", "Alarm", "アラーム", "알림"),
				createLocale("CACHE", "Caching", "キャッシュ", "캐싱 여부"),
				createLocale("DELETE", "Delete", "削除", "삭제"),
				createLocale("EMAIL", "Email", "メールアドレス", "이메일"),
				createLocale("EN_TEXT", "English Text", "英語テキスト", "영어 텍스트"),
				createLocale("GITHUB", "Github", "Github", "깃허브"),
				createLocale("GOBACK", "Go back", "戻る", "뒤로가기"),
				createLocale("GRID_NO_DATA", "-", "-", "-"),
				createLocale("HIDE", "Hide", "隠し", "숨김 여부"),
				createLocale("ICON", "Icon", "アイコン", "아이콘"),
				createLocale("JP_TEXT", "Japanese Text", "日本語テキスト", "일어 텍스트"),
				createLocale("KO_TEXT", "Korean Text", "韓国語テキスト", "한글 텍스트"),
				createLocale("LASTLOGIN", "Last login", "最終ログイン日", "마지막 접속일"),
				createLocale("LOCALE", "Language Setting", "言語設定", "언어 설정"),
				createLocale("LOGIN", "Login", "ログイン", "로그인"),
				createLocale("MEKEY", "Menu key", "メニューキー", "메뉴키"),
				createLocale("MENAME", "Menu name", "メニュー名", "메뉴 명"),
				createLocale("MENU", "Menu", "メニュー", "메뉴"),
				createLocale("MEORDER", "Menu order", "メニュ順番", "메뉴 순서"),
				createLocale("MSG_KEY", "Translate key", "翻訳キー", "번역키"),
				createLocale("PARENTMEKEY", "Parent menu key", "上位メニューキー", "상위 메뉴키"),
				createLocale("PW", "Password", "パスワード", "비밀번호"),
				createLocale("REFRESH_BTN_DESC", "Refresh the current page", "現在のページ再読み込み", "현재 페이지 새로고침"),
				createLocale("ROLE", "Authorization", "権限", "권한"),
				createLocale("SAVE", "Save", "保存", "저장"),
				createLocale("SAVE_FAIL", "Failed to save", "保存に失敗しました", "저장에 실패하였습니다"),
				createLocale("SAVE_SUCCESS", "Success to save", "保存に成功しました", "저장에 성공하였습니다"),
				createLocale("SEARCH", "Search", "検索", "검색"),
				createLocale("SYSTEM", "System", "システム", "시스템"),
				createLocale("THEMES", "Theme", "テーマ", "테마"),
				createLocale("URKEY", "User key", "ユーザーキー", "사용자키"),
				createLocale("URNAME", "User name", "ユーザー名", "사용자명"),
				createLocale("URNICKNAME", "Nickname", "ニックネーム", "닉네임"),
				createLocale("USER", "User", "ユーザー", "사용자"));
		lrepo.saveAll(locales);
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

	private Locale createLocale(String mk, String e, String j, String k) {
		return Locale.builder().msgKey(mk).en_text(e).jp_text(j).ko_text(k).build();
	}

}
