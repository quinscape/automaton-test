/*
 * This file is generated by jOOQ.
*/
package de.quinscape.automatontest.domain.tables.records;


import de.quinscape.automatontest.domain.tables.Plugh;

import java.sql.Timestamp;

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
import org.jooq.Record7;
import org.jooq.Row7;
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
@Table(name = "plugh", schema = "public", indexes = {
    @Index(name = "pk_plugh", unique = true, columnList = "id ASC")
})
public class PlughRecord extends UpdatableRecordImpl<PlughRecord> implements Record7<String, String, Integer, Timestamp, String, String, Boolean> {

    private static final long serialVersionUID = 3129125;

    /**
     * Setter for <code>public.plugh.id</code>.
     */
    public void setId(String value) {
        set(0, value);
    }

    /**
     * Getter for <code>public.plugh.id</code>.
     */
    @Id
    @Column(name = "id", unique = true, nullable = false, length = 36)
    @NotNull
    @Size(max = 36)
    public String getId() {
        return (String) get(0);
    }

    /**
     * Setter for <code>public.plugh.name</code>.
     */
    public void setName(String value) {
        set(1, value);
    }

    /**
     * Getter for <code>public.plugh.name</code>.
     */
    @Column(name = "name", nullable = false, length = 100)
    @NotNull
    @Size(max = 100)
    public String getName() {
        return (String) get(1);
    }

    /**
     * Setter for <code>public.plugh.num</code>.
     */
    public void setNum(Integer value) {
        set(2, value);
    }

    /**
     * Getter for <code>public.plugh.num</code>.
     */
    @Column(name = "num", nullable = false, precision = 32)
    @NotNull
    public Integer getNum() {
        return (Integer) get(2);
    }

    /**
     * Setter for <code>public.plugh.created</code>.
     */
    public void setCreated(Timestamp value) {
        set(3, value);
    }

    /**
     * Getter for <code>public.plugh.created</code>.
     */
    @Column(name = "created", nullable = false)
    @NotNull
    public Timestamp getCreated() {
        return (Timestamp) get(3);
    }

    /**
     * Setter for <code>public.plugh.description</code>.
     */
    public void setDescription(String value) {
        set(4, value);
    }

    /**
     * Getter for <code>public.plugh.description</code>.
     */
    @Column(name = "description")
    public String getDescription() {
        return (String) get(4);
    }

    /**
     * Setter for <code>public.plugh.owner_id</code>.
     */
    public void setOwnerId(String value) {
        set(5, value);
    }

    /**
     * Getter for <code>public.plugh.owner_id</code>.
     */
    @Column(name = "owner_id", nullable = false, length = 36)
    @NotNull
    @Size(max = 36)
    public String getOwnerId() {
        return (String) get(5);
    }

    /**
     * Setter for <code>public.plugh.flag</code>.
     */
    public void setFlag(Boolean value) {
        set(6, value);
    }

    /**
     * Getter for <code>public.plugh.flag</code>.
     */
    @Column(name = "flag", nullable = false)
    @NotNull
    public Boolean getFlag() {
        return (Boolean) get(6);
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
    // Record7 type implementation
    // -------------------------------------------------------------------------

    /**
     * {@inheritDoc}
     */
    @Override
    public Row7<String, String, Integer, Timestamp, String, String, Boolean> fieldsRow() {
        return (Row7) super.fieldsRow();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Row7<String, String, Integer, Timestamp, String, String, Boolean> valuesRow() {
        return (Row7) super.valuesRow();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field1() {
        return Plugh.PLUGH.ID;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field2() {
        return Plugh.PLUGH.NAME;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<Integer> field3() {
        return Plugh.PLUGH.NUM;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<Timestamp> field4() {
        return Plugh.PLUGH.CREATED;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field5() {
        return Plugh.PLUGH.DESCRIPTION;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field6() {
        return Plugh.PLUGH.OWNER_ID;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<Boolean> field7() {
        return Plugh.PLUGH.FLAG;
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
        return getNum();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Timestamp component4() {
        return getCreated();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String component5() {
        return getDescription();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String component6() {
        return getOwnerId();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Boolean component7() {
        return getFlag();
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
        return getNum();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Timestamp value4() {
        return getCreated();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String value5() {
        return getDescription();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String value6() {
        return getOwnerId();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Boolean value7() {
        return getFlag();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public PlughRecord value1(String value) {
        setId(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public PlughRecord value2(String value) {
        setName(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public PlughRecord value3(Integer value) {
        setNum(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public PlughRecord value4(Timestamp value) {
        setCreated(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public PlughRecord value5(String value) {
        setDescription(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public PlughRecord value6(String value) {
        setOwnerId(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public PlughRecord value7(Boolean value) {
        setFlag(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public PlughRecord values(String value1, String value2, Integer value3, Timestamp value4, String value5, String value6, Boolean value7) {
        value1(value1);
        value2(value2);
        value3(value3);
        value4(value4);
        value5(value5);
        value6(value6);
        value7(value7);
        return this;
    }

    // -------------------------------------------------------------------------
    // Constructors
    // -------------------------------------------------------------------------

    /**
     * Create a detached PlughRecord
     */
    public PlughRecord() {
        super(Plugh.PLUGH);
    }

    /**
     * Create a detached, initialised PlughRecord
     */
    public PlughRecord(String id, String name, Integer num, Timestamp created, String description, String ownerId, Boolean flag) {
        super(Plugh.PLUGH);

        set(0, id);
        set(1, name);
        set(2, num);
        set(3, created);
        set(4, description);
        set(5, ownerId);
        set(6, flag);
    }
}