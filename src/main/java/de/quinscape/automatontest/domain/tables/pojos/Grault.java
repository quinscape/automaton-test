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
@Table(name = "grault", schema = "public", indexes = {
    @Index(name = "pk_grault", unique = true, columnList = "id ASC")
})
public class Grault extends GeneratedDomainObject implements Serializable {

    private static final long serialVersionUID = 1966762660;

    private String id;
    private String name;
    private String attachmentId;
    private String url;

    public Grault() {}

    public Grault(Grault value) {
        this.id = value.id;
        this.name = value.name;
        this.attachmentId = value.attachmentId;
        this.url = value.url;
    }

    public Grault(
        String id,
        String name,
        String attachmentId,
        String url
    ) {
        this.id = id;
        this.name = name;
        this.attachmentId = attachmentId;
        this.url = url;
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

    @Column(name = "attachment_id", length = 36)
    @Size(max = 36)
    public String getAttachmentId() {
        return this.attachmentId;
    }

    public void setAttachmentId(String attachmentId) {
        this.attachmentId = attachmentId;
    }

    @Column(name = "url")
    public String getUrl() {
        return this.url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder("Grault (");

        sb.append(id);
        sb.append(", ").append(name);
        sb.append(", ").append(attachmentId);
        sb.append(", ").append(url);

        sb.append(")");
        return sb.toString();
    }
}
