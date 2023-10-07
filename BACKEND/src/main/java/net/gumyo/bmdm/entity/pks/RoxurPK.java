package net.gumyo.bmdm.entity.pks;

import jakarta.persistence.Embeddable;
import lombok.Getter;

@Embeddable
@Getter
public class RoxurPK {
    private Integer urkey;
    private Long rokey;

    public RoxurPK() {
    }

    public RoxurPK(Long rokey, Integer urkey) {
        this.rokey = rokey;
        this.urkey = urkey;
    }
}
