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
import java.sql.Timestamp;

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
    name = "plugh",
    schema = "public"
)
public class Plugh extends GeneratedDomainObject implements Serializable {

    private static final long serialVersionUID = 1L;

    private String id;
    private String name;
    private Integer num;
    private Timestamp created;
    private String description;
    private String ownerId;
    private Boolean flag;

    public Plugh() {}

    public Plugh(Plugh value) {
        this.id = value.id;
        this.name = value.name;
        this.num = value.num;
        this.created = value.created;
        this.description = value.description;
        this.ownerId = value.ownerId;
        this.flag = value.flag;
    }

    public Plugh(
        String id,
        String name,
        Integer num,
        Timestamp created,
        String description,
        String ownerId,
        Boolean flag
    ) {
        this.id = id;
        this.name = name;
        this.num = num;
        this.created = created;
        this.description = description;
        this.ownerId = ownerId;
        this.flag = flag;
    }

    /**
     * Getter for <code>public.plugh.id</code>.
     */
    @Id
    @Column(name = "id", nullable = false, length = 36)
    @NotNull
    @Size(max = 36)
    public String getId() {
        return this.id;
    }

    /**
     * Setter for <code>public.plugh.id</code>.
     */
    public void setId(String id) {
        this.id = id;
    }

    /**
     * Getter for <code>public.plugh.name</code>.
     */
    @Column(name = "name", nullable = false, length = 100)
    @NotNull
    @Size(max = 100)
    public String getName() {
        return this.name;
    }

    /**
     * Setter for <code>public.plugh.name</code>.
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Getter for <code>public.plugh.num</code>.
     */
    @Column(name = "num", nullable = false)
    @NotNull
    public Integer getNum() {
        return this.num;
    }

    /**
     * Setter for <code>public.plugh.num</code>.
     */
    public void setNum(Integer num) {
        this.num = num;
    }

    /**
     * Getter for <code>public.plugh.created</code>.
     */
    @Column(name = "created", nullable = false, precision = 6)
    @NotNull
    public Timestamp getCreated() {
        return this.created;
    }

    /**
     * Setter for <code>public.plugh.created</code>.
     */
    public void setCreated(Timestamp created) {
        this.created = created;
    }

    /**
     * Getter for <code>public.plugh.description</code>.
     */
    @Column(name = "description")
    public String getDescription() {
        return this.description;
    }

    /**
     * Setter for <code>public.plugh.description</code>.
     */
    public void setDescription(String description) {
        this.description = description;
    }

    /**
     * Getter for <code>public.plugh.owner_id</code>.
     */
    @Column(name = "owner_id", nullable = false, length = 36)
    @NotNull
    @Size(max = 36)
    public String getOwnerId() {
        return this.ownerId;
    }

    /**
     * Setter for <code>public.plugh.owner_id</code>.
     */
    public void setOwnerId(String ownerId) {
        this.ownerId = ownerId;
    }

    /**
     * Getter for <code>public.plugh.flag</code>.
     */
    @Column(name = "flag", nullable = false)
    @NotNull
    public Boolean getFlag() {
        return this.flag;
    }

    /**
     * Setter for <code>public.plugh.flag</code>.
     */
    public void setFlag(Boolean flag) {
        this.flag = flag;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        final Plugh other = (Plugh) obj;
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
        if (this.num == null) {
            if (other.num != null)
                return false;
        }
        else if (!this.num.equals(other.num))
            return false;
        if (this.created == null) {
            if (other.created != null)
                return false;
        }
        else if (!this.created.equals(other.created))
            return false;
        if (this.description == null) {
            if (other.description != null)
                return false;
        }
        else if (!this.description.equals(other.description))
            return false;
        if (this.ownerId == null) {
            if (other.ownerId != null)
                return false;
        }
        else if (!this.ownerId.equals(other.ownerId))
            return false;
        if (this.flag == null) {
            if (other.flag != null)
                return false;
        }
        else if (!this.flag.equals(other.flag))
            return false;
        return true;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((this.id == null) ? 0 : this.id.hashCode());
        result = prime * result + ((this.name == null) ? 0 : this.name.hashCode());
        result = prime * result + ((this.num == null) ? 0 : this.num.hashCode());
        result = prime * result + ((this.created == null) ? 0 : this.created.hashCode());
        result = prime * result + ((this.description == null) ? 0 : this.description.hashCode());
        result = prime * result + ((this.ownerId == null) ? 0 : this.ownerId.hashCode());
        result = prime * result + ((this.flag == null) ? 0 : this.flag.hashCode());
        return result;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder("Plugh (");

        sb.append(id);
        sb.append(", ").append(name);
        sb.append(", ").append(num);
        sb.append(", ").append(created);
        sb.append(", ").append(description);
        sb.append(", ").append(ownerId);
        sb.append(", ").append(flag);

        sb.append(")");
        return sb.toString();
    }
}
