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
@Table(name = "app_attachment_data", schema = "public", indexes = {
    @Index(name = "pk_app_attachment_data", unique = true, columnList = "id ASC"),
    @Index(name = "uc_app_attachment_data_attachment_id", unique = true, columnList = "attachment_id ASC")
})
public class AppAttachmentData extends GeneratedDomainObject implements Serializable {

    private static final long serialVersionUID = -867106366;

    private String id;
    private String attachmentId;
    private byte[] data;

    public AppAttachmentData() {}

    public AppAttachmentData(AppAttachmentData value) {
        this.id = value.id;
        this.attachmentId = value.attachmentId;
        this.data = value.data;
    }

    public AppAttachmentData(
        String id,
        String attachmentId,
        byte[] data
    ) {
        this.id = id;
        this.attachmentId = attachmentId;
        this.data = data;
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

    @Column(name = "attachment_id", unique = true, nullable = false, length = 36)
    @NotNull
    @Size(max = 36)
    public String getAttachmentId() {
        return this.attachmentId;
    }

    public void setAttachmentId(String attachmentId) {
        this.attachmentId = attachmentId;
    }

    @Column(name = "data", nullable = false)
    @NotNull
    public byte[] getData() {
        return this.data;
    }

    public void setData(byte... data) {
        this.data = data;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder("AppAttachmentData (");

        sb.append(id);
        sb.append(", ").append(attachmentId);
        sb.append(", ").append("[binary...]");

        sb.append(")");
        return sb.toString();
    }
}