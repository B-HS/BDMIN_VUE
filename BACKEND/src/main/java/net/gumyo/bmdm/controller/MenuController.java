package net.gumyo.bmdm.controller;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import net.gumyo.bmdm.service.menu.MenuService;

@RestController
@RequiredArgsConstructor
public class MenuController {

    private final MenuService mser;

    @PostMapping("/menus")
    public List<Map<String, Object>> getMenuList(@RequestBody(required = false) Map<String, Object> map) {
        return mser.getMenuList(map);
    }

}
