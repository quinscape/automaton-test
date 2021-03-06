/*
 * This file is generated by jOOQ.
*/
package de.quinscape.automatontest.domain.tables.records;


import de.quinscape.automatontest.domain.tables.Bar;

import java.sql.Timestamp;

import javax.annotation.Generated;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.jooq.Field;
import org.jooq.Record5;
import org.jooq.Row5;
import org.jooq.impl.TableRecordImpl;


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
@Table(name = "bar", schema = "public")
public class BarRecord extends TableRecordImpl<BarRecord> implements Record5<String, String, Integer, Integer, Timestamp> {

    private static final long serialVersionUID = 347789866;

    /**
     * Setter for <code>public.bar.id</code>.
     */
    public void setId(String value) {
        set(0, value);
    }

    /**
     * Getter for <code>public.bar.id</code>.
     */
    @Column(name = "id", nullable = false, length = 36)
    @NotNull
    @Size(max = 36)
    public String getId() {
        return (String) get(0);
    }

    /**
     * Setter for <code>public.bar.name</code>.
     */
    public void setName(String value) {
        set(1, value);
    }

    /**
     * Getter for <code>public.bar.name</code>.
     */
    @Column(name = "name", nullable = false, length = 100)
    @NotNull
    @Size(max = 100)
    public String getName() {
        return (String) get(1);
    }

    /**
     * Setter for <code>public.bar.numa</code>.
     */
    public void setNuma(Integer value) {
        set(2, value);
    }

    /**
     * Getter for <code>public.bar.numa</code>.
     */
    @Column(name = "numa", nullable = false, precision = 32)
    @NotNull
    public Integer getNuma() {
        return (Integer) get(2);
    }

    /**
     * Setter for <code>public.bar.numb</code>.
     */
    public void setNumb(Integer value) {
        set(3, value);
    }

    /**
     * Getter for <code>public.bar.numb</code>.
     */
    @Column(name = "numb", nullable = false, precision = 32)
    @NotNull
    public Integer getNumb() {
        return (Integer) get(3);
    }

    /**
     * Setter for <code>public.bar.created</code>.
     */
    public void setCreated(Timestamp value) {
        set(4, value);
    }

    /**
     * Getter for <code>public.bar.created</code>.
     */
    @Column(name = "created", nullable = false)
    public Timestamp getCreated() {
        return (Timestamp) get(4);
    }

    // -------------------------------------------------------------------------
    // Record5 type implementation
    // -------------------------------------------------------------------------

    /**
     * {@inheritDoc}
     */
    @Override
    public Row5<String, String, Integer, Integer, Timestamp> fieldsRow() {
        return (Row5) super.fieldsRow();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Row5<String, String, Integer, Integer, Timestamp> valuesRow() {
        return (Row5) super.valuesRow();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field1() {
        return Bar.BAR.ID;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field2() {
        return Bar.BAR.NAME;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<Integer> field3() {
        return Bar.BAR.NUMA;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<Integer> field4() {
        return Bar.BAR.NUMB;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<Timestamp> field5() {
        return Bar.BAR.CREATED;
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
        return getName();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Integer component3() {
        return getNuma();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Integer component4() {
        return getNumb();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Timestamp component5() {
        return getCreated();
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
        return getName();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Integer value3() {
        return getNuma();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Integer value4() {
        return getNumb();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Timestamp value5() {
        return getCreated();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public BarRecord value1(String value) {
        setId(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public BarRecord value2(String value) {
        setName(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public BarRecord value3(Integer value) {
        setNuma(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public BarRecord value4(Integer value) {
        setNumb(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public BarRecord value5(Timestamp value) {
        setCreated(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public BarRecord values(String value1, String value2, Integer value3, Integer value4, Timestamp value5) {
        value1(value1);
        value2(value2);
        value3(value3);
        value4(value4);
        value5(value5);
        return this;
    }

    // -------------------------------------------------------------------------
    // Constructors
    // -------------------------------------------------------------------------

    /**
     * Create a detached BarRecord
     */
    public BarRecord() {
        super(Bar.BAR);
    }

    /**
     * Create a detached, initialised BarRecord
     */
    public BarRecord(String id, String name, Integer numa, Integer numb, Timestamp created) {
        super(Bar.BAR);

        set(0, id);
        set(1, name);
        set(2, numa);
        set(3, numb);
        set(4, created);
    }
}
