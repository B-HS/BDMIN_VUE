package net.gumyo.bmdm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import net.gumyo.bmdm.entity.RoleByUser;
import net.gumyo.bmdm.entity.pks.RoxurPK;

public interface RoleByUserRepository extends JpaRepository<RoleByUser, RoxurPK> {
    List<RoleByUser> findByPkUrkey(Integer urkey);

}
