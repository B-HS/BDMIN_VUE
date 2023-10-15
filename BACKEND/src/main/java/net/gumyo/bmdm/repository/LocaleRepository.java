package net.gumyo.bmdm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import net.gumyo.bmdm.entity.Locale;

public interface LocaleRepository extends JpaRepository<Locale, String> {
}
