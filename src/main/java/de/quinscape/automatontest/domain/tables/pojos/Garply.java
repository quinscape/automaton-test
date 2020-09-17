/*
 * This file is generated by jOOQ.
*/
package de.quinscape.automatontest.domain.tables.pojos;


import de.quinscape.domainql.jooq.GeneratedDomainObject;

import java.io.Serializable;
import java.math.BigDecimal;

import javax.annotation.Generated;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;


/**
 * This class is generated by jOOQ.
 */
@Generated(
    value = {
        "http://www.jooq.org",
        "jOOQ version:3.10.6"
    },
    comments = "This class is generated by jOOQ"
)
@SuppressWarnings({ "all", "unchecked", "rawtypes" })
@Entity
@Table(name = "garply", schema = "public", indexes = {
    @Index(name = "pk_garply", unique = true, columnList = "id ASC")
})
public class Garply extends GeneratedDomainObject implements Serializable {

    private static final long serialVersionUID = 847147801;

    private String     id;
    private String     name;
    private BigDecimal value;
    private BigDecimal opt;

    public Garply() {}

    public Garply(Garply value) {
        this.id = value.id;
        this.name = value.name;
        this.value = value.value;
        this.opt = value.opt;
    }

    public Garply(
        String     id,
        String     name,
        BigDecimal value,
        BigDecimal opt
    ) {
        this.id = id;
        this.name = name;
        this.value = value;
        this.opt = opt;
    }

    @Id
    @Column(name = "id", unique = true, nullable = false, length = 36)
    @NotNull
    @Size(max = 36)
    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Column(name = "name", nullable = false, length = 100)
    @NotNull
    @Size(max = 100)
    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Column(name = "value", nullable = false, precision = 19, scale = 2)
    @NotNull
    public BigDecimal getValue() {
        return this.value;
    }

    public void setValue(BigDecimal value) {
        this.value = value;
    }

    @Column(name = "opt", precision = 19, scale = 2)
    public BigDecimal getOpt() {
        return this.opt;
    }

    public void setOpt(BigDecimal opt) {
        this.opt = opt;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder("Garply (");

        sb.append(id);
        sb.append(", ").append(name);
        sb.append(", ").append(value);
        sb.append(", ").append(opt);

        sb.append(")");
        return sb.toString();
    }
}
