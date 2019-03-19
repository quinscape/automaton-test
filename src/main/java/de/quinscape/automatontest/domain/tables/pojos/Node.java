/*
 * This file is generated by jOOQ.
*/
package de.quinscape.automatontest.domain.tables.pojos;


import de.quinscape.domainql.generic.GeneratedDomainObject;

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
@Table(name = "node", schema = "public", indexes = {
    @Index(name = "pk_node", unique = true, columnList = "id ASC"),
    @Index(name = "uc_node_name", unique = true, columnList = "name ASC")
})
public class Node extends GeneratedDomainObject implements Serializable {

    private static final long serialVersionUID = -2043893752;

    private String id;
    private String name;
    private String parentId;

    public Node() {}

    public Node(Node value) {
        this.id = value.id;
        this.name = value.name;
        this.parentId = value.parentId;
    }

    public Node(
        String id,
        String name,
        String parentId
    ) {
        this.id = id;
        this.name = name;
        this.parentId = parentId;
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

    @Column(name = "name", unique = true, nullable = false, length = 64)
    @NotNull
    @Size(max = 64)
    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Column(name = "parent_id", length = 36)
    @Size(max = 36)
    public String getParentId() {
        return this.parentId;
    }

    public void setParentId(String parentId) {
        this.parentId = parentId;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder("Node (");

        sb.append(id);
        sb.append(", ").append(name);
        sb.append(", ").append(parentId);

        sb.append(")");
        return sb.toString();
    }
}
