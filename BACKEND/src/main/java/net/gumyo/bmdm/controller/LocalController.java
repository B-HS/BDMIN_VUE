package net.gumyo.bmdm.controller;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import net.gumyo.bmdm.service.local.LocaleService;

@RestController
@RequiredArgsConstructor
public class LocalController {
    private final LocaleService lser;

    @PostMapping("/locale")
    public List<Map<String, Object>> getLocaleListByRokey() {
        return lser.getLocales();
    }
}
