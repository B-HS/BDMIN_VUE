package net.gumyo.bmdm.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class MexroPk {
    @Column
    private Long mekey;

    @Column
    private Long rokey;
}
