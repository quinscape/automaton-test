/*
 * This file is generated by jOOQ.
*/
package de.quinscape.automatontest.domain.tables.records;


import de.quinscape.automatontest.domain.tables.CorgeAssoc;

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
import org.jooq.Record5;
import org.jooq.Row5;
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
@Table(name = "corge_assoc", schema = "public", indexes = {
    @Index(name = "pk_corge_assoc", unique = true, columnList = "id ASC")
})
public class CorgeAssocRecord extends UpdatableRecordImpl<CorgeAssocRecord> implements Record5<String, String, String, Integer, String> {

    private static final long serialVersionUID = -49036073;

    /**
     * Setter for <code>public.corge_assoc.id</code>.
     */
    public void setId(String value) {
        set(0, value);
    }

    /**
     * Getter for <code>public.corge_assoc.id</code>.
     */
    @Id
    @Column(name = "id", unique = true, nullable = false, length = 36)
    @NotNull
    @Size(max = 36)
    public String getId() {
        return (String) get(0);
    }

    /**
     * Setter for <code>public.corge_assoc.version</code>.
     */
    public void setVersion(String value) {
        set(1, value);
    }

    /**
     * Getter for <code>public.corge_assoc.version</code>.
     */
    @Column(name = "version", nullable = false, length = 36)
    @NotNull
    @Size(max = 36)
    public String getVersion() {
        return (String) get(1);
    }

    /**
     * Setter for <code>public.corge_assoc.name</code>.
     */
    public void setName(String value) {
        set(2, value);
    }

    /**
     * Getter for <code>public.corge_assoc.name</code>.
     */
    @Column(name = "name", nullable = false, length = 100)
    @NotNull
    @Size(max = 100)
    public String getName() {
        return (String) get(2);
    }

    /**
     * Setter for <code>public.corge_assoc.num</code>.
     */
    public void setNum(Integer value) {
        set(3, value);
    }

    /**
     * Getter for <code>public.corge_assoc.num</code>.
     */
    @Column(name = "num", nullable = false, precision = 32)
    @NotNull
    public Integer getNum() {
        return (Integer) get(3);
    }

    /**
     * Setter for <code>public.corge_assoc.description</code>.
     */
    public void setDescription(String value) {
        set(4, value);
    }

    /**
     * Getter for <code>public.corge_assoc.description</code>.
     */
    @Column(name = "description")
    public String getDescription() {
        return (String) get(4);
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
    // Record5 type implementation
    // -------------------------------------------------------------------------

    /**
     * {@inheritDoc}
     */
    @Override
    public Row5<String, String, String, Integer, String> fieldsRow() {
        return (Row5) super.fieldsRow();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Row5<String, String, String, Integer, String> valuesRow() {
        return (Row5) super.valuesRow();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field1() {
        return CorgeAssoc.CORGE_ASSOC.ID;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field2() {
        return CorgeAssoc.CORGE_ASSOC.VERSION;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field3() {
        return CorgeAssoc.CORGE_ASSOC.NAME;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<Integer> field4() {
        return CorgeAssoc.CORGE_ASSOC.NUM;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field5() {
        return CorgeAssoc.CORGE_ASSOC.DESCRIPTION;
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
        return getVersion();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String component3() {
        return getName();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Integer component4() {
        return getNum();
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
    public String value1() {
        return getId();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String value2() {
        return getVersion();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String value3() {
        return getName();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Integer value4() {
        return getNum();
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
    public CorgeAssocRecord value1(String value) {
        setId(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public CorgeAssocRecord value2(String value) {
        setVersion(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public CorgeAssocRecord value3(String value) {
        setName(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public CorgeAssocRecord value4(Integer value) {
        setNum(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public CorgeAssocRecord value5(String value) {
        setDescription(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public CorgeAssocRecord values(String value1, String value2, String value3, Integer value4, String value5) {
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
     * Create a detached CorgeAssocRecord
     */
    public CorgeAssocRecord() {
        super(CorgeAssoc.CORGE_ASSOC);
    }

    /**
     * Create a detached, initialised CorgeAssocRecord
     */
    public CorgeAssocRecord(String id, String version, String name, Integer num, String description) {
        super(CorgeAssoc.CORGE_ASSOC);

        set(0, id);
        set(1, version);
        set(2, name);
        set(3, num);
        set(4, description);
    }
}
