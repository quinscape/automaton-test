/*
 * This file is generated by jOOQ.
 */
package de.quinscape.automatontest.domain.tables.records;


import de.quinscape.automatontest.domain.tables.Grault;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import javax.annotation.processing.Generated;

import org.jooq.Field;
import org.jooq.Record1;
import org.jooq.Record4;
import org.jooq.Row4;
import org.jooq.impl.UpdatableRecordImpl;


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
    name = "grault",
    schema = "public"
)
public class GraultRecord extends UpdatableRecordImpl<GraultRecord> implements Record4<String, String, String, String> {

    private static final long serialVersionUID = 1L;

    /**
     * Setter for <code>public.grault.id</code>.
     */
    public void setId(String value) {
        set(0, value);
    }

    /**
     * Getter for <code>public.grault.id</code>.
     */
    @Id
    @Column(name = "id", nullable = false, length = 36)
    @NotNull
    @Size(max = 36)
    public String getId() {
        return (String) get(0);
    }

    /**
     * Setter for <code>public.grault.name</code>.
     */
    public void setName(String value) {
        set(1, value);
    }

    /**
     * Getter for <code>public.grault.name</code>.
     */
    @Column(name = "name", nullable = false, length = 100)
    @NotNull
    @Size(max = 100)
    public String getName() {
        return (String) get(1);
    }

    /**
     * Setter for <code>public.grault.attachment_id</code>.
     */
    public void setAttachmentId(String value) {
        set(2, value);
    }

    /**
     * Getter for <code>public.grault.attachment_id</code>.
     */
    @Column(name = "attachment_id", length = 36)
    @Size(max = 36)
    public String getAttachmentId() {
        return (String) get(2);
    }

    /**
     * Setter for <code>public.grault.url</code>.
     */
    public void setUrl(String value) {
        set(3, value);
    }

    /**
     * Getter for <code>public.grault.url</code>.
     */
    @Column(name = "url")
    public String getUrl() {
        return (String) get(3);
    }

    // -------------------------------------------------------------------------
    // Primary key information
    // -------------------------------------------------------------------------

    @Override
    public Record1<String> key() {
        return (Record1) super.key();
    }

    // -------------------------------------------------------------------------
    // Record4 type implementation
    // -------------------------------------------------------------------------

    @Override
    public Row4<String, String, String, String> fieldsRow() {
        return (Row4) super.fieldsRow();
    }

    @Override
    public Row4<String, String, String, String> valuesRow() {
        return (Row4) super.valuesRow();
    }

    @Override
    public Field<String> field1() {
        return Grault.GRAULT.ID;
    }

    @Override
    public Field<String> field2() {
        return Grault.GRAULT.NAME;
    }

    @Override
    public Field<String> field3() {
        return Grault.GRAULT.ATTACHMENT_ID;
    }

    @Override
    public Field<String> field4() {
        return Grault.GRAULT.URL;
    }

    @Override
    public String component1() {
        return getId();
    }

    @Override
    public String component2() {
        return getName();
    }

    @Override
    public String component3() {
        return getAttachmentId();
    }

    @Override
    public String component4() {
        return getUrl();
    }

    @Override
    public String value1() {
        return getId();
    }

    @Override
    public String value2() {
        return getName();
    }

    @Override
    public String value3() {
        return getAttachmentId();
    }

    @Override
    public String value4() {
        return getUrl();
    }

    @Override
    public GraultRecord value1(String value) {
        setId(value);
        return this;
    }

    @Override
    public GraultRecord value2(String value) {
        setName(value);
        return this;
    }

    @Override
    public GraultRecord value3(String value) {
        setAttachmentId(value);
        return this;
    }

    @Override
    public GraultRecord value4(String value) {
        setUrl(value);
        return this;
    }

    @Override
    public GraultRecord values(String value1, String value2, String value3, String value4) {
        value1(value1);
        value2(value2);
        value3(value3);
        value4(value4);
        return this;
    }

    // -------------------------------------------------------------------------
    // Constructors
    // -------------------------------------------------------------------------

    /**
     * Create a detached GraultRecord
     */
    public GraultRecord() {
        super(Grault.GRAULT);
    }

    /**
     * Create a detached, initialised GraultRecord
     */
    public GraultRecord(String id, String name, String attachmentId, String url) {
        super(Grault.GRAULT);

        setId(id);
        setName(name);
        setAttachmentId(attachmentId);
        setUrl(url);
    }

    /**
     * Create a detached, initialised GraultRecord
     */
    public GraultRecord(de.quinscape.automatontest.domain.tables.pojos.Grault value) {
        super(Grault.GRAULT);

        if (value != null) {
            setId(value.getId());
            setName(value.getName());
            setAttachmentId(value.getAttachmentId());
            setUrl(value.getUrl());
        }
    }
}
