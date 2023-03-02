/*
 * This file is generated by jOOQ.
 */
package de.quinscape.automatontest.domain.tables.records;


import de.quinscape.automatontest.domain.tables.QuxC;

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
    name = "qux_c",
    schema = "public",
    uniqueConstraints = {
        @UniqueConstraint(name = "qux_c_name_key", columnNames = { "name" })
    }
)
public class QuxCRecord extends UpdatableRecordImpl<QuxCRecord> implements Record4<String, String, Integer, String> {

    private static final long serialVersionUID = 1L;

    /**
     * Setter for <code>public.qux_c.id</code>.
     */
    public void setId(String value) {
        set(0, value);
    }

    /**
     * Getter for <code>public.qux_c.id</code>.
     */
    @Id
    @Column(name = "id", nullable = false, length = 36)
    @NotNull
    @Size(max = 36)
    public String getId() {
        return (String) get(0);
    }

    /**
     * Setter for <code>public.qux_c.name</code>.
     */
    public void setName(String value) {
        set(1, value);
    }

    /**
     * Getter for <code>public.qux_c.name</code>.
     */
    @Column(name = "name", nullable = false, length = 100)
    @NotNull
    @Size(max = 100)
    public String getName() {
        return (String) get(1);
    }

    /**
     * Setter for <code>public.qux_c.value</code>.
     */
    public void setValue(Integer value) {
        set(2, value);
    }

    /**
     * Getter for <code>public.qux_c.value</code>.
     */
    @Column(name = "value", nullable = false)
    @NotNull
    public Integer getValue() {
        return (Integer) get(2);
    }

    /**
     * Setter for <code>public.qux_c.description</code>.
     */
    public void setDescription(String value) {
        set(3, value);
    }

    /**
     * Getter for <code>public.qux_c.description</code>.
     */
    @Column(name = "description")
    public String getDescription() {
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
    public Row4<String, String, Integer, String> fieldsRow() {
        return (Row4) super.fieldsRow();
    }

    @Override
    public Row4<String, String, Integer, String> valuesRow() {
        return (Row4) super.valuesRow();
    }

    @Override
    public Field<String> field1() {
        return QuxC.QUX_C.ID;
    }

    @Override
    public Field<String> field2() {
        return QuxC.QUX_C.NAME;
    }

    @Override
    public Field<Integer> field3() {
        return QuxC.QUX_C.VALUE;
    }

    @Override
    public Field<String> field4() {
        return QuxC.QUX_C.DESCRIPTION;
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
    public Integer component3() {
        return getValue();
    }

    @Override
    public String component4() {
        return getDescription();
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
    public Integer value3() {
        return getValue();
    }

    @Override
    public String value4() {
        return getDescription();
    }

    @Override
    public QuxCRecord value1(String value) {
        setId(value);
        return this;
    }

    @Override
    public QuxCRecord value2(String value) {
        setName(value);
        return this;
    }

    @Override
    public QuxCRecord value3(Integer value) {
        setValue(value);
        return this;
    }

    @Override
    public QuxCRecord value4(String value) {
        setDescription(value);
        return this;
    }

    @Override
    public QuxCRecord values(String value1, String value2, Integer value3, String value4) {
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
     * Create a detached QuxCRecord
     */
    public QuxCRecord() {
        super(QuxC.QUX_C);
    }

    /**
     * Create a detached, initialised QuxCRecord
     */
    public QuxCRecord(String id, String name, Integer value, String description) {
        super(QuxC.QUX_C);

        setId(id);
        setName(name);
        setValue(value);
        setDescription(description);
    }

    /**
     * Create a detached, initialised QuxCRecord
     */
    public QuxCRecord(de.quinscape.automatontest.domain.tables.pojos.QuxC value) {
        super(QuxC.QUX_C);

        if (value != null) {
            setId(value.getId());
            setName(value.getName());
            setValue(value.getValue());
            setDescription(value.getDescription());
        }
    }
}
