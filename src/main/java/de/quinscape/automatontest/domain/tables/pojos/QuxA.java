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
@Table(name = "qux_a", schema = "public", indexes = {
    @Index(name = "pk_qux_a", unique = true, columnList = "id ASC"),
    @Index(name = "qux_a_name_key", unique = true, columnList = "name ASC")
})
public class QuxA extends GeneratedDomainObject implements Serializable {

    private static final long serialVersionUID = 1212123914;

    private String  id;
    private String  name;
    private Integer value;
    private String  description;

    public QuxA() {}

    public QuxA(QuxA value) {
        this.id = value.id;
        this.name = value.name;
        this.value = value.value;
        this.description = value.description;
    }

    public QuxA(
        String  id,
        String  name,
        Integer value,
        String  description
    ) {
        this.id = id;
        this.name = name;
        this.value = value;
        this.description = description;
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

    @Column(name = "name", unique = true, nullable = false, length = 100)
    @NotNull
    @Size(max = 100)
    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Column(name = "value", nullable = false, precision = 32)
    @NotNull
    public Integer getValue() {
        return this.value;
    }

    public void setValue(Integer value) {
        this.value = value;
    }

    @Column(name = "description")
    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder("QuxA (");

        sb.append(id);
        sb.append(", ").append(name);
        sb.append(", ").append(value);
        sb.append(", ").append(description);

        sb.append(")");
        return sb.toString();
    }
}
