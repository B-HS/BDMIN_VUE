package net.gumyo.bmdm.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import net.gumyo.bmdm.entity.AppRole;

public interface RoleRepository extends JpaRepository<AppRole, Long> {

}
