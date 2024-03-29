/*
 * This file is generated by jOOQ.
 */
package de.quinscape.automatontest.domain.tables.pojos;


import de.quinscape.domainql.jooq.GeneratedDomainObject;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.io.Serializable;

import javax.annotation.processing.Generated;


/**
 * This class is generated by jOOQ.
 */
@Generated(
    value = {
        "https://www.jooq.org",
        "jOOQ version:3.17.7"
    },
    comments = "This class is generated by jOOQ"
)
@SuppressWarnings({ "all", "unchecked", "rawtypes" })
@Entity
@Table(
    name = "qux_e",
    schema = "public",
    uniqueConstraints = {
        @UniqueConstraint(name = "qux_e_name_key", columnNames = { "name" })
    }
)
public class QuxE extends GeneratedDomainObject implements Serializable {

    private static final long serialVersionUID = 1L;

    private String id;
    private String name;
    private Integer value;
    private String description;

    public QuxE() {}

    public QuxE(QuxE value) {
        this.id = value.id;
        this.name = value.name;
        this.value = value.value;
        this.description = value.description;
    }

    public QuxE(
        String id,
        String name,
        Integer value,
        String description
    ) {
        this.id = id;
        this.name = name;
        this.value = value;
        this.description = description;
    }

    /**
     * Getter for <code>public.qux_e.id</code>.
     */
    @Id
    @Column(name = "id", nullable = false, length = 36)
    @NotNull
    @Size(max = 36)
    public String getId() {
        return this.id;
    }

    /**
     * Setter for <code>public.qux_e.id</code>.
     */
    public void setId(String id) {
        this.id = id;
    }

    /**
     * Getter for <code>public.qux_e.name</code>.
     */
    @Column(name = "name", nullable = false, length = 100)
    @NotNull
    @Size(max = 100)
    public String getName() {
        return this.name;
    }

    /**
     * Setter for <code>public.qux_e.name</code>.
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Getter for <code>public.qux_e.value</code>.
     */
    @Column(name = "value", nullable = false)
    @NotNull
    public Integer getValue() {
        return this.value;
    }

    /**
     * Setter for <code>public.qux_e.value</code>.
     */
    public void setValue(Integer value) {
        this.value = value;
    }

    /**
     * Getter for <code>public.qux_e.description</code>.
     */
    @Column(name = "description")
    public String getDescription() {
        return this.description;
    }

    /**
     * Setter for <code>public.qux_e.description</code>.
     */
    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        final QuxE other = (QuxE) obj;
        if (this.id == null) {
            if (other.id != null)
                return false;
        }
        else if (!this.id.equals(other.id))
            return false;
        if (this.name == null) {
            if (other.name != null)
                return false;
        }
        else if (!this.name.equals(other.name))
            return false;
        if (this.value == null) {
            if (other.value != null)
                return false;
        }
        else if (!this.value.equals(other.value))
            return false;
        if (this.description == null) {
            if (other.description != null)
                return false;
        }
        else if (!this.description.equals(other.description))
            return false;
        return true;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((this.id == null) ? 0 : this.id.hashCode());
        result = prime * result + ((this.name == null) ? 0 : this.name.hashCode());
        result = prime * result + ((this.value == null) ? 0 : this.value.hashCode());
        result = prime * result + ((this.description == null) ? 0 : this.description.hashCode());
        return result;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder("QuxE (");

        sb.append(id);
        sb.append(", ").append(name);
        sb.append(", ").append(value);
        sb.append(", ").append(description);

        sb.append(")");
        return sb.toString();
    }
}
