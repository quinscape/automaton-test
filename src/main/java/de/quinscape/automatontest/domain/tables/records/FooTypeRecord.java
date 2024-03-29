/*
 * This file is generated by jOOQ.
 */
package de.quinscape.automatontest.domain.tables.records;


import de.quinscape.automatontest.domain.tables.FooType;

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
import org.jooq.Record2;
import org.jooq.Row2;
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
    name = "foo_type",
    schema = "public",
    uniqueConstraints = {
        @UniqueConstraint(name = "foo_type_name_key", columnNames = { "name" })
    }
)
public class FooTypeRecord extends UpdatableRecordImpl<FooTypeRecord> implements Record2<Integer, String> {

    private static final long serialVersionUID = 1L;

    /**
     * Setter for <code>public.foo_type.ordinal</code>.
     */
    public void setOrdinal(Integer value) {
        set(0, value);
    }

    /**
     * Getter for <code>public.foo_type.ordinal</code>.
     */
    @Id
    @Column(name = "ordinal", nullable = false)
    @NotNull
    public Integer getOrdinal() {
        return (Integer) get(0);
    }

    /**
     * Setter for <code>public.foo_type.name</code>.
     */
    public void setName(String value) {
        set(1, value);
    }

    /**
     * Getter for <code>public.foo_type.name</code>.
     */
    @Column(name = "name", nullable = false, length = 100)
    @NotNull
    @Size(max = 100)
    public String getName() {
        return (String) get(1);
    }

    // -------------------------------------------------------------------------
    // Primary key information
    // -------------------------------------------------------------------------

    @Override
    public Record1<Integer> key() {
        return (Record1) super.key();
    }

    // -------------------------------------------------------------------------
    // Record2 type implementation
    // -------------------------------------------------------------------------

    @Override
    public Row2<Integer, String> fieldsRow() {
        return (Row2) super.fieldsRow();
    }

    @Override
    public Row2<Integer, String> valuesRow() {
        return (Row2) super.valuesRow();
    }

    @Override
    public Field<Integer> field1() {
        return FooType.FOO_TYPE.ORDINAL;
    }

    @Override
    public Field<String> field2() {
        return FooType.FOO_TYPE.NAME;
    }

    @Override
    public Integer component1() {
        return getOrdinal();
    }

    @Override
    public String component2() {
        return getName();
    }

    @Override
    public Integer value1() {
        return getOrdinal();
    }

    @Override
    public String value2() {
        return getName();
    }

    @Override
    public FooTypeRecord value1(Integer value) {
        setOrdinal(value);
        return this;
    }

    @Override
    public FooTypeRecord value2(String value) {
        setName(value);
        return this;
    }

    @Override
    public FooTypeRecord values(Integer value1, String value2) {
        value1(value1);
        value2(value2);
        return this;
    }

    // -------------------------------------------------------------------------
    // Constructors
    // -------------------------------------------------------------------------

    /**
     * Create a detached FooTypeRecord
     */
    public FooTypeRecord() {
        super(FooType.FOO_TYPE);
    }

    /**
     * Create a detached, initialised FooTypeRecord
     */
    public FooTypeRecord(Integer ordinal, String name) {
        super(FooType.FOO_TYPE);

        setOrdinal(ordinal);
        setName(name);
    }

    /**
     * Create a detached, initialised FooTypeRecord
     */
    public FooTypeRecord(de.quinscape.automatontest.domain.tables.pojos.FooType value) {
        super(FooType.FOO_TYPE);

        if (value != null) {
            setOrdinal(value.getOrdinal());
            setName(value.getName());
        }
    }
}
