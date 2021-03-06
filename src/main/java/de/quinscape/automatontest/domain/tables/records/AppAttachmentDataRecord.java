/*
 * This file is generated by jOOQ.
*/
package de.quinscape.automatontest.domain.tables.records;


import de.quinscape.automatontest.domain.tables.AppAttachmentData;

import javax.annotation.Generated;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.jooq.Field;
import org.jooq.Record1;
import org.jooq.Record3;
import org.jooq.Row3;
import org.jooq.impl.UpdatableRecordImpl;


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
public class AppAttachmentDataRecord extends UpdatableRecordImpl<AppAttachmentDataRecord> implements Record3<String, String, byte[]> {

    private static final long serialVersionUID = 987424218;

    /**
     * Setter for <code>public.app_attachment_data.id</code>.
     */
    public void setId(String value) {
        set(0, value);
    }

    /**
     * Getter for <code>public.app_attachment_data.id</code>.
     */
    @Id
    @Column(name = "id", unique = true, nullable = false, length = 36)
    @NotNull
    @Size(max = 36)
    public String getId() {
        return (String) get(0);
    }

    /**
     * Setter for <code>public.app_attachment_data.attachment_id</code>.
     */
    public void setAttachmentId(String value) {
        set(1, value);
    }

    /**
     * Getter for <code>public.app_attachment_data.attachment_id</code>.
     */
    @Column(name = "attachment_id", unique = true, nullable = false, length = 36)
    @NotNull
    @Size(max = 36)
    public String getAttachmentId() {
        return (String) get(1);
    }

    /**
     * Setter for <code>public.app_attachment_data.data</code>.
     */
    public void setData(byte... value) {
        set(2, value);
    }

    /**
     * Getter for <code>public.app_attachment_data.data</code>.
     */
    @Column(name = "data", nullable = false)
    @NotNull
    public byte[] getData() {
        return (byte[]) get(2);
    }

    // -------------------------------------------------------------------------
    // Primary key information
    // -------------------------------------------------------------------------

    /**
     * {@inheritDoc}
     */
    @Override
    public Record1<String> key() {
        return (Record1) super.key();
    }

    // -------------------------------------------------------------------------
    // Record3 type implementation
    // -------------------------------------------------------------------------

    /**
     * {@inheritDoc}
     */
    @Override
    public Row3<String, String, byte[]> fieldsRow() {
        return (Row3) super.fieldsRow();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Row3<String, String, byte[]> valuesRow() {
        return (Row3) super.valuesRow();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field1() {
        return AppAttachmentData.APP_ATTACHMENT_DATA.ID;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field2() {
        return AppAttachmentData.APP_ATTACHMENT_DATA.ATTACHMENT_ID;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<byte[]> field3() {
        return AppAttachmentData.APP_ATTACHMENT_DATA.DATA;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String component1() {
        return getId();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String component2() {
        return getAttachmentId();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public byte[] component3() {
        return getData();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String value1() {
        return getId();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String value2() {
        return getAttachmentId();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public byte[] value3() {
        return getData();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public AppAttachmentDataRecord value1(String value) {
        setId(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public AppAttachmentDataRecord value2(String value) {
        setAttachmentId(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public AppAttachmentDataRecord value3(byte... value) {
        setData(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public AppAttachmentDataRecord values(String value1, String value2, byte[] value3) {
        value1(value1);
        value2(value2);
        value3(value3);
        return this;
    }

    // -------------------------------------------------------------------------
    // Constructors
    // -------------------------------------------------------------------------

    /**
     * Create a detached AppAttachmentDataRecord
     */
    public AppAttachmentDataRecord() {
        super(AppAttachmentData.APP_ATTACHMENT_DATA);
    }

    /**
     * Create a detached, initialised AppAttachmentDataRecord
     */
    public AppAttachmentDataRecord(String id, String attachmentId, byte[] data) {
        super(AppAttachmentData.APP_ATTACHMENT_DATA);

        set(0, id);
        set(1, attachmentId);
        set(2, data);
    }
}
