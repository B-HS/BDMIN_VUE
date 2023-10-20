package net.gumyo.bmdm.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Menu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mekey;

    @Column
    private String mename;

    @Column
    private Long parentmekey;

    @Column
    private String path;

    @Column
    private String file;

    @Column
    private Integer meorder;

    @Column
    private Boolean hide;

    @Column
    private Boolean cache;

    @Column
    private String icon;

}
