/*
 * This file is generated by jOOQ.
 */
package de.quinscape.automatontest.domain.tables.records;


import de.quinscape.automatontest.domain.tables.QuxMid;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
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
    name = "qux_mid",
    schema = "public",
    uniqueConstraints = {
        @UniqueConstraint(name = "qux_mid_name_key", columnNames = { "name" })
    }
)
public class QuxMidRecord extends UpdatableRecordImpl<QuxMidRecord> implements Record4<String, String, String, String> {

    private static final long serialVersionUID = 1L;

    /**
     * Setter for <code>public.qux_mid.id</code>.
     */
    public void setId(String value) {
        set(0, value);
    }

    /**
     * Getter for <code>public.qux_mid.id</code>.
     */
    @Id
    @Column(name = "id", nullable = false, length = 36)
    @NotNull
    @Size(max = 36)
    public String getId() {
        return (String) get(0);
    }

    /**
     * Setter for <code>public.qux_mid.name</code>.
     */
    public void setName(String value) {
        set(1, value);
    }

    /**
     * Getter for <code>public.qux_mid.name</code>.
     */
    @Column(name = "name", nullable = false, length = 100)
    @NotNull
    @Size(max = 100)
    public String getName() {
        return (String) get(1);
    }

    /**
     * Setter for <code>public.qux_mid.description</code>.
     */
    public void setDescription(String value) {
        set(2, value);
    }

    /**
     * Getter for <code>public.qux_mid.description</code>.
     */
    @Column(name = "description")
    public String getDescription() {
        return (String) get(2);
    }

    /**
     * Setter for <code>public.qux_mid.qux_e_id</code>.
     */
    public void setQuxEId(String value) {
        set(3, value);
    }

    /**
     * Getter for <code>public.qux_mid.qux_e_id</code>.
     */
    @Column(name = "qux_e_id", length = 36)
    @Size(max = 36)
    public String getQuxEId() {
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
        return QuxMid.QUX_MID.ID;
    }

    @Override
    public Field<String> field2() {
        return QuxMid.QUX_MID.NAME;
    }

    @Override
    public Field<String> field3() {
        return QuxMid.QUX_MID.DESCRIPTION;
    }

    @Override
    public Field<String> field4() {
        return QuxMid.QUX_MID.QUX_E_ID;
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
        return getDescription();
    }

    @Override
    public String component4() {
        return getQuxEId();
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
        return getDescription();
    }

    @Override
    public String value4() {
        return getQuxEId();
    }

    @Override
    public QuxMidRecord value1(String value) {
        setId(value);
        return this;
    }

    @Override
    public QuxMidRecord value2(String value) {
        setName(value);
        return this;
    }

    @Override
    public QuxMidRecord value3(String value) {
        setDescription(value);
        return this;
    }

    @Override
    public QuxMidRecord value4(String value) {
        setQuxEId(value);
        return this;
    }

    @Override
    public QuxMidRecord values(String value1, String value2, String value3, String value4) {
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
     * Create a detached QuxMidRecord
     */
    public QuxMidRecord() {
        super(QuxMid.QUX_MID);
    }

    /**
     * Create a detached, initialised QuxMidRecord
     */
    public QuxMidRecord(String id, String name, String description, String quxEId) {
        super(QuxMid.QUX_MID);

        setId(id);
        setName(name);
        setDescription(description);
        setQuxEId(quxEId);
    }

    /**
     * Create a detached, initialised QuxMidRecord
     */
    public QuxMidRecord(de.quinscape.automatontest.domain.tables.pojos.QuxMid value) {
        super(QuxMid.QUX_MID);

        if (value != null) {
            setId(value.getId());
            setName(value.getName());
            setDescription(value.getDescription());
            setQuxEId(value.getQuxEId());
        }
    }
}
