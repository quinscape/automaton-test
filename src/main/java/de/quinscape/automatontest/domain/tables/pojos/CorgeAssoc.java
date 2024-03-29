/*
 * This file is generated by jOOQ.
 */
package de.quinscape.automatontest.domain.tables.pojos;


import de.quinscape.domainql.jooq.GeneratedDomainObject;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
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
    name = "corge_assoc",
    schema = "public"
)
public class CorgeAssoc extends GeneratedDomainObject implements Serializable {

    private static final long serialVersionUID = 1L;

    private String id;
    private String version;
    private String name;
    private Integer num;
    private String description;

    public CorgeAssoc() {}

    public CorgeAssoc(CorgeAssoc value) {
        this.id = value.id;
        this.version = value.version;
        this.name = value.name;
        this.num = value.num;
        this.description = value.description;
    }

    public CorgeAssoc(
        String id,
        String version,
        String name,
        Integer num,
        String description
    ) {
        this.id = id;
        this.version = version;
        this.name = name;
        this.num = num;
        this.description = description;
    }

    /**
     * Getter for <code>public.corge_assoc.id</code>.
     */
    @Id
    @Column(name = "id", nullable = false, length = 36)
    @NotNull
    @Size(max = 36)
    public String getId() {
        return this.id;
    }

    /**
     * Setter for <code>public.corge_assoc.id</code>.
     */
    public void setId(String id) {
        this.id = id;
    }

    /**
     * Getter for <code>public.corge_assoc.version</code>.
     */
    @Column(name = "version", nullable = false, length = 36)
    @NotNull
    @Size(max = 36)
    public String getVersion() {
        return this.version;
    }

    /**
     * Setter for <code>public.corge_assoc.version</code>.
     */
    public void setVersion(String version) {
        this.version = version;
    }

    /**
     * Getter for <code>public.corge_assoc.name</code>.
     */
    @Column(name = "name", nullable = false, length = 100)
    @NotNull
    @Size(max = 100)
    public String getName() {
        return this.name;
    }

    /**
     * Setter for <code>public.corge_assoc.name</code>.
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Getter for <code>public.corge_assoc.num</code>.
     */
    @Column(name = "num", nullable = false)
    @NotNull
    public Integer getNum() {
        return this.num;
    }

    /**
     * Setter for <code>public.corge_assoc.num</code>.
     */
    public void setNum(Integer num) {
        this.num = num;
    }

    /**
     * Getter for <code>public.corge_assoc.description</code>.
     */
    @Column(name = "description")
    public String getDescription() {
        return this.description;
    }

    /**
     * Setter for <code>public.corge_assoc.description</code>.
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
        final CorgeAssoc other = (CorgeAssoc) obj;
        if (this.id == null) {
            if (other.id != null)
                return false;
        }
        else if (!this.id.equals(other.id))
            return false;
        if (this.version == null) {
            if (other.version != null)
                return false;
        }
        else if (!this.version.equals(other.version))
            return false;
        if (this.name == null) {
            if (other.name != null)
                return false;
        }
        else if (!this.name.equals(other.name))
            return false;
        if (this.num == null) {
            if (other.num != null)
                return false;
        }
        else if (!this.num.equals(other.num))
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
        result = prime * result + ((this.version == null) ? 0 : this.version.hashCode());
        result = prime * result + ((this.name == null) ? 0 : this.name.hashCode());
        result = prime * result + ((this.num == null) ? 0 : this.num.hashCode());
        result = prime * result + ((this.description == null) ? 0 : this.description.hashCode());
        return result;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder("CorgeAssoc (");

        sb.append(id);
        sb.append(", ").append(version);
        sb.append(", ").append(name);
        sb.append(", ").append(num);
        sb.append(", ").append(description);

        sb.append(")");
        return sb.toString();
    }
}
