package net.gumyo.bmdm.utils.redis;

import java.time.Duration;
import java.util.Optional;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import net.gumyo.bmdm.entity.User;
import net.gumyo.bmdm.repository.UserRepository;
import net.gumyo.bmdm.utils.JwtManager;

@Component
@RequiredArgsConstructor
@NoRepositoryBean
public class RedisRepository {
    private final RedisTemplate<String, Object> redisTemplate;
    private final UserRepository urepo;
    private final JwtManager manager;

    @Transactional
    public void setRefreshToken(String token, Integer urkey) {
        ValueOperations<String, Object> refreshToken = redisTemplate.opsForValue();
        refreshToken.set(token, urkey.toString(), Duration.ofDays(7L));
        urepo.loggedMember(urkey, true);
    }

    @Transactional
    public void removeRefreshToken(String token) {
        Optional<Object> urkey = Optional.ofNullable(redisTemplate.opsForValue().get(token));
        if (urkey.isPresent()) {
            redisTemplate.delete(token);
            urepo.loggedMember(Integer.valueOf(urkey.toString()), false);
        }
    }

    @Transactional
    public Boolean tokenChecker(String atk, String rtk) {
        Claims atkClaims = manager.tokenParser(atk);
        Integer atkUrkey = atkClaims.get("urkey", Integer.class);
        Integer rtkUrkey = Integer
                .valueOf(Optional.ofNullable(redisTemplate.opsForValue().get(rtk)).orElseGet(() -> "-1").toString());
        User atkDBInfo = urepo.findById(atkUrkey).orElseGet(() -> User.builder().urkey(-1).build());
        if (!manager.tokenValidator("Bearer " + rtk) ||
                atkDBInfo.getUrkey() == -1 ||
                !atkUrkey.equals(rtkUrkey)) {
            return false;
        }
        return true;
    }
}