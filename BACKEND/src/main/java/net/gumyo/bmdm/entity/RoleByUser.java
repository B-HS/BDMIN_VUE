package net.gumyo.bmdm.entity;

import org.springframework.data.annotation.CreatedDate;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import net.gumyo.bmdm.entity.pks.RoxurPK;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class RoleByUser {
    @EmbeddedId
    private RoxurPK pk;

    @Column
    @CreatedDate
    private String insertDate;
}
