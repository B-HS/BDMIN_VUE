package net.gumyo.bmdm.service.menu;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import net.gumyo.bmdm.repository.MenuRepository;
import net.gumyo.bmdm.repository.RoleByUserRepository;

@Service
@RequiredArgsConstructor
public class MenuServiceImpl implements MenuService {
    private final RoleByUserRepository rburepo;
    private final MenuRepository mrepo;

    @Override
    public List<Map<String, Object>> menuListByUrkey(Integer urkey) {
        ObjectMapper objectMapper = new ObjectMapper();
        Long[] roles = rburepo.findByPkUrkey(urkey).stream().map(val -> val.getPk().getRokey()).toArray(Long[]::new);
        return mrepo.getMenuByUserRole(roles).stream()
                .map(val -> objectMapper.convertValue(val, new TypeReference<Map<String, Object>>() {
                })).toList();
    }

}
