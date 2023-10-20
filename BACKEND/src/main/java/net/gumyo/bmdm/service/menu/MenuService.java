package net.gumyo.bmdm.service.menu;

import java.util.List;
import java.util.Map;

public interface MenuService {
    List<Map<String, Object>> getMenuList(Map<String, Object> map);

    List<Map<String, Object>> menuListByUrkey(Integer urkey);
}
