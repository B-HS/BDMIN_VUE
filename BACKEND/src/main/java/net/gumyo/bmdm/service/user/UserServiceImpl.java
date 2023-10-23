package net.gumyo.bmdm.service.user;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import net.gumyo.bmdm.entity.User;
import net.gumyo.bmdm.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository urepo;
    private ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public List<Map<String, Object>> getUserList(Map<String, Object> map) {
        return urepo.findAll().stream()
                .map(val -> objectMapper.convertValue(val.getLoginInfo(), new TypeReference<Map<String, Object>>() {
                })).toList();

    }

    @Override
    public void saveUserList(List<Map<String, Object>> list) {
        list.forEach(val -> {
            if ("I".equals(val.get("row_status")) || "U".equals(val.get("row_status"))) {
                val.remove("row_status");
                urepo.save(objectMapper.convertValue(val, User.class));
            } else if ("D".equals(val.get("row_status"))) {
                urepo.deleteById(Integer.parseInt(val.get("urkey").toString()));
            }
        });

    }

}
