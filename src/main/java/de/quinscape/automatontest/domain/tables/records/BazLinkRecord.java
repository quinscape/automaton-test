/*
 * This file is generated by jOOQ.
 */
package de.quinscape.automatontest.domain.tables.records;


import de.quinscape.automatontest.domain.tables.BazLink;

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
import org.jooq.Record3;
import org.jooq.Row3;
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
    name = "baz_link",
    schema = "public",
    uniqueConstraints = {
        @UniqueConstraint(name = "baz_link_baz_id_value_id_key", columnNames = { "baz_id", "value_id" })
    }
)
public class BazLinkRecord extends UpdatableRecordImpl<BazLinkRecord> implements Record3<String, String, String> {

    private static final long serialVersionUID = 1L;

    /**
     * Setter for <code>public.baz_link.id</code>.
     */
    public void setId(String value) {
        set(0, value);
    }

    /**
     * Getter for <code>public.baz_link.id</code>.
     */
    @Id
    @Column(name = "id", nullable = false, length = 36)
    @NotNull
    @Size(max = 36)
    public String getId() {
        return (String) get(0);
    }

    /**
     * Setter for <code>public.baz_link.baz_id</code>.
     */
    public void setBazId(String value) {
        set(1, value);
    }

    /**
     * Getter for <code>public.baz_link.baz_id</code>.
     */
    @Column(name = "baz_id", nullable = false, length = 36)
    @NotNull
    @Size(max = 36)
    public String getBazId() {
        return (String) get(1);
    }

    /**
     * Setter for <code>public.baz_link.value_id</code>.
     */
    public void setValueId(String value) {
        set(2, value);
    }

    /**
     * Getter for <code>public.baz_link.value_id</code>.
     */
    @Column(name = "value_id", nullable = false, length = 36)
    @NotNull
    @Size(max = 36)
    public String getValueId() {
        return (String) get(2);
    }

    // -------------------------------------------------------------------------
    // Primary key information
    // -------------------------------------------------------------------------

    @Override
    public Record1<String> key() {
        return (Record1) super.key();
    }

    // -------------------------------------------------------------------------
    // Record3 type implementation
    // -------------------------------------------------------------------------

    @Override
    public Row3<String, String, String> fieldsRow() {
        return (Row3) super.fieldsRow();
    }

    @Override
    public Row3<String, String, String> valuesRow() {
        return (Row3) super.valuesRow();
    }

    @Override
    public Field<String> field1() {
        return BazLink.BAZ_LINK.ID;
    }

    @Override
    public Field<String> field2() {
        return BazLink.BAZ_LINK.BAZ_ID;
    }

    @Override
    public Field<String> field3() {
        return BazLink.BAZ_LINK.VALUE_ID;
    }

    @Override
    public String component1() {
        return getId();
    }

    @Override
    public String component2() {
        return getBazId();
    }

    @Override
    public String component3() {
        return getValueId();
    }

    @Override
    public String value1() {
        return getId();
    }

    @Override
    public String value2() {
        return getBazId();
    }

    @Override
    public String value3() {
        return getValueId();
    }

    @Override
    public BazLinkRecord value1(String value) {
        setId(value);
        return this;
    }

    @Override
    public BazLinkRecord value2(String value) {
        setBazId(value);
        return this;
    }

    @Override
    public BazLinkRecord value3(String value) {
        setValueId(value);
        return this;
    }

    @Override
    public BazLinkRecord values(String value1, String value2, String value3) {
        value1(value1);
        value2(value2);
        value3(value3);
        return this;
    }

    // -------------------------------------------------------------------------
    // Constructors
    // -------------------------------------------------------------------------

    /**
     * Create a detached BazLinkRecord
     */
    public BazLinkRecord() {
        super(BazLink.BAZ_LINK);
    }

    /**
     * Create a detached, initialised BazLinkRecord
     */
    public BazLinkRecord(String id, String bazId, String valueId) {
        super(BazLink.BAZ_LINK);

        setId(id);
        setBazId(bazId);
        setValueId(valueId);
    }

    /**
     * Create a detached, initialised BazLinkRecord
     */
    public BazLinkRecord(de.quinscape.automatontest.domain.tables.pojos.BazLink value) {
        super(BazLink.BAZ_LINK);

        if (value != null) {
            setId(value.getId());
            setBazId(value.getBazId());
            setValueId(value.getValueId());
        }
    }
}
