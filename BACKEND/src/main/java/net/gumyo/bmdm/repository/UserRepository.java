package net.gumyo.bmdm.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import net.gumyo.bmdm.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);

    Optional<User> findByUrname(String urname);

    @Modifying
    @Query("UPDATE User ur SET ur.isLogged=:logged where ur.urkey=:urkey")
    void loggedMember(Integer urkey, boolean logged);
}