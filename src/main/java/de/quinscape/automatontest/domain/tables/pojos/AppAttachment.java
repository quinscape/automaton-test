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
@Table(name = "app_attachment", schema = "public", indexes = {
    @Index(name = "pk_app_attachment", unique = true, columnList = "id ASC")
})
public class AppAttachment extends GeneratedDomainObject implements Serializable {

    private static final long serialVersionUID = 977079230;

    private String id;
    private String description;
    private String type;
    private String contentId;

    public AppAttachment() {}

    public AppAttachment(AppAttachment value) {
        this.id = value.id;
        this.description = value.description;
        this.type = value.type;
        this.contentId = value.contentId;
    }

    public AppAttachment(
        String id,
        String description,
        String type,
        String contentId
    ) {
        this.id = id;
        this.description = description;
        this.type = type;
        this.contentId = contentId;
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

    @Column(name = "description")
    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Column(name = "type", nullable = false, length = 64)
    @NotNull
    @Size(max = 64)
    public String getType() {
        return this.type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Column(name = "content_id")
    public String getContentId() {
        return this.contentId;
    }

    public void setContentId(String contentId) {
        this.contentId = contentId;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder("AppAttachment (");

        sb.append(id);
        sb.append(", ").append(description);
        sb.append(", ").append(type);
        sb.append(", ").append(contentId);

        sb.append(")");
        return sb.toString();
    }
}
