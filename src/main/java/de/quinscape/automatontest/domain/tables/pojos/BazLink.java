/*
 * This file is generated by jOOQ.
*/
package de.quinscape.automatontest.domain.tables.pojos;


import de.quinscape.domainql.jooq.GeneratedDomainObject;

import java.io.Serializable;

import javax.annotation.Generated;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
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
@Table(name = "baz_link", schema = "public", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"baz_id", "value_id"})
}, indexes = {
    @Index(name = "baz_link_baz_id_value_id_key", unique = true, columnList = "baz_id ASC, value_id ASC"),
    @Index(name = "pk_baz_link", unique = true, columnList = "id ASC")
})
public class BazLink extends GeneratedDomainObject implements Serializable {

    private static final long serialVersionUID = -1383669018;

    private String id;
    private String bazId;
    private String valueId;

    public BazLink() {}

    public BazLink(BazLink value) {
        this.id = value.id;
        this.bazId = value.bazId;
        this.valueId = value.valueId;
    }

    public BazLink(
        String id,
        String bazId,
        String valueId
    ) {
        this.id = id;
        this.bazId = bazId;
        this.valueId = valueId;
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

    @Column(name = "baz_id", nullable = false, length = 36)
    @NotNull
    @Size(max = 36)
    public String getBazId() {
        return this.bazId;
    }

    public void setBazId(String bazId) {
        this.bazId = bazId;
    }

    @Column(name = "value_id", nullable = false, length = 36)
    @NotNull
    @Size(max = 36)
    public String getValueId() {
        return this.valueId;
    }

    public void setValueId(String valueId) {
        this.valueId = valueId;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder("BazLink (");

        sb.append(id);
        sb.append(", ").append(bazId);
        sb.append(", ").append(valueId);

        sb.append(")");
        return sb.toString();
    }
}
