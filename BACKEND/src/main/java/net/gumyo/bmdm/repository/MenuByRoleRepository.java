package net.gumyo.bmdm.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import net.gumyo.bmdm.entity.Menubyrole;
import net.gumyo.bmdm.entity.pks.MexroPk;

public interface MenuByRoleRepository extends JpaRepository<Menubyrole, MexroPk> {

}
