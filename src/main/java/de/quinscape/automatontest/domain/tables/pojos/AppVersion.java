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
import java.math.BigInteger;
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
    name = "app_version",
    schema = "public"
)
public class AppVersion extends GeneratedDomainObject implements Serializable {

    private static final long serialVersionUID = 1L;

    private String id;
    private BigInteger fieldMask;
    private String ownerId;
    private Timestamp created;
    private String entityType;
    private String entityId;
    private String prev;

    public AppVersion() {}

    public AppVersion(AppVersion value) {
        this.id = value.id;
        this.fieldMask = value.fieldMask;
        this.ownerId = value.ownerId;
        this.created = value.created;
        this.entityType = value.entityType;
        this.entityId = value.entityId;
        this.prev = value.prev;
    }

    public AppVersion(
        String id,
        BigInteger fieldMask,
        String ownerId,
        Timestamp created,
        String entityType,
        String entityId,
        String prev
    ) {
        this.id = id;
        this.fieldMask = fieldMask;
        this.ownerId = ownerId;
        this.created = created;
        this.entityType = entityType;
        this.entityId = entityId;
        this.prev = prev;
    }

    /**
     * Getter for <code>public.app_version.id</code>.
     */
    @Id
    @Column(name = "id", nullable = false, length = 36)
    @NotNull
    @Size(max = 36)
    public String getId() {
        return this.id;
    }

    /**
     * Setter for <code>public.app_version.id</code>.
     */
    public void setId(String id) {
        this.id = id;
    }

    /**
     * Getter for <code>public.app_version.field_mask</code>.
     */
    @Column(name = "field_mask", nullable = false, precision = 39)
    @NotNull
    public BigInteger getFieldMask() {
        return this.fieldMask;
    }

    /**
     * Setter for <code>public.app_version.field_mask</code>.
     */
    public void setFieldMask(BigInteger fieldMask) {
        this.fieldMask = fieldMask;
    }

    /**
     * Getter for <code>public.app_version.owner_id</code>.
     */
    @Column(name = "owner_id", nullable = false, length = 36)
    @NotNull
    @Size(max = 36)
    public String getOwnerId() {
        return this.ownerId;
    }

    /**
     * Setter for <code>public.app_version.owner_id</code>.
     */
    public void setOwnerId(String ownerId) {
        this.ownerId = ownerId;
    }

    /**
     * Getter for <code>public.app_version.created</code>.
     */
    @Column(name = "created", nullable = false, precision = 6)
    @NotNull
    public Timestamp getCreated() {
        return this.created;
    }

    /**
     * Setter for <code>public.app_version.created</code>.
     */
    public void setCreated(Timestamp created) {
        this.created = created;
    }

    /**
     * Getter for <code>public.app_version.entity_type</code>.
     */
    @Column(name = "entity_type", nullable = false, length = 100)
    @NotNull
    @Size(max = 100)
    public String getEntityType() {
        return this.entityType;
    }

    /**
     * Setter for <code>public.app_version.entity_type</code>.
     */
    public void setEntityType(String entityType) {
        this.entityType = entityType;
    }

    /**
     * Getter for <code>public.app_version.entity_id</code>.
     */
    @Column(name = "entity_id", nullable = false, length = 36)
    @NotNull
    @Size(max = 36)
    public String getEntityId() {
        return this.entityId;
    }

    /**
     * Setter for <code>public.app_version.entity_id</code>.
     */
    public void setEntityId(String entityId) {
        this.entityId = entityId;
    }

    /**
     * Getter for <code>public.app_version.prev</code>.
     */
    @Column(name = "prev", length = 36)
    @Size(max = 36)
    public String getPrev() {
        return this.prev;
    }

    /**
     * Setter for <code>public.app_version.prev</code>.
     */
    public void setPrev(String prev) {
        this.prev = prev;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        final AppVersion other = (AppVersion) obj;
        if (this.id == null) {
            if (other.id != null)
                return false;
        }
        else if (!this.id.equals(other.id))
            return false;
        if (this.fieldMask == null) {
            if (other.fieldMask != null)
                return false;
        }
        else if (!this.fieldMask.equals(other.fieldMask))
            return false;
        if (this.ownerId == null) {
            if (other.ownerId != null)
                return false;
        }
        else if (!this.ownerId.equals(other.ownerId))
            return false;
        if (this.created == null) {
            if (other.created != null)
                return false;
        }
        else if (!this.created.equals(other.created))
            return false;
        if (this.entityType == null) {
            if (other.entityType != null)
                return false;
        }
        else if (!this.entityType.equals(other.entityType))
            return false;
        if (this.entityId == null) {
            if (other.entityId != null)
                return false;
        }
        else if (!this.entityId.equals(other.entityId))
            return false;
        if (this.prev == null) {
            if (other.prev != null)
                return false;
        }
        else if (!this.prev.equals(other.prev))
            return false;
        return true;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((this.id == null) ? 0 : this.id.hashCode());
        result = prime * result + ((this.fieldMask == null) ? 0 : this.fieldMask.hashCode());
        result = prime * result + ((this.ownerId == null) ? 0 : this.ownerId.hashCode());
        result = prime * result + ((this.created == null) ? 0 : this.created.hashCode());
        result = prime * result + ((this.entityType == null) ? 0 : this.entityType.hashCode());
        result = prime * result + ((this.entityId == null) ? 0 : this.entityId.hashCode());
        result = prime * result + ((this.prev == null) ? 0 : this.prev.hashCode());
        return result;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder("AppVersion (");

        sb.append(id);
        sb.append(", ").append(fieldMask);
        sb.append(", ").append(ownerId);
        sb.append(", ").append(created);
        sb.append(", ").append(entityType);
        sb.append(", ").append(entityId);
        sb.append(", ").append(prev);

        sb.append(")");
        return sb.toString();
    }
}
