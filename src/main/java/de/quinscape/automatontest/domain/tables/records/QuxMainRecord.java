/*
 * This file is generated by jOOQ.
*/
package de.quinscape.automatontest.domain.tables.records;


import de.quinscape.automatontest.domain.tables.QuxMain;

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
@Table(name = "qux_main", schema = "public", indexes = {
    @Index(name = "pk_qux_main", unique = true, columnList = "id ASC")
})
public class QuxMainRecord extends UpdatableRecordImpl<QuxMainRecord> implements Record7<String, String, String, String, String, String, String> {

    private static final long serialVersionUID = 645366200;

    /**
     * Setter for <code>public.qux_main.id</code>.
     */
    public void setId(String value) {
        set(0, value);
    }

    /**
     * Getter for <code>public.qux_main.id</code>.
     */
    @Id
    @Column(name = "id", unique = true, nullable = false, length = 36)
    @NotNull
    @Size(max = 36)
    public String getId() {
        return (String) get(0);
    }

    /**
     * Setter for <code>public.qux_main.name</code>.
     */
    public void setName(String value) {
        set(1, value);
    }

    /**
     * Getter for <code>public.qux_main.name</code>.
     */
    @Column(name = "name", nullable = false, length = 100)
    @NotNull
    @Size(max = 100)
    public String getName() {
        return (String) get(1);
    }

    /**
     * Setter for <code>public.qux_main.qux_a_id</code>.
     */
    public void setQuxAId(String value) {
        set(2, value);
    }

    /**
     * Getter for <code>public.qux_main.qux_a_id</code>.
     */
    @Column(name = "qux_a_id", nullable = false, length = 36)
    @NotNull
    @Size(max = 36)
    public String getQuxAId() {
        return (String) get(2);
    }

    /**
     * Setter for <code>public.qux_main.qux_b_name</code>.
     */
    public void setQuxBName(String value) {
        set(3, value);
    }

    /**
     * Getter for <code>public.qux_main.qux_b_name</code>.
     */
    @Column(name = "qux_b_name", length = 100)
    @Size(max = 100)
    public String getQuxBName() {
        return (String) get(3);
    }

    /**
     * Setter for <code>public.qux_main.qux_c_id1</code>.
     */
    public void setQuxCId1(String value) {
        set(4, value);
    }

    /**
     * Getter for <code>public.qux_main.qux_c_id1</code>.
     */
    @Column(name = "qux_c_id1", nullable = false, length = 36)
    @NotNull
    @Size(max = 36)
    public String getQuxCId1() {
        return (String) get(4);
    }

    /**
     * Setter for <code>public.qux_main.qux_c_id2</code>.
     */
    public void setQuxCId2(String value) {
        set(5, value);
    }

    /**
     * Getter for <code>public.qux_main.qux_c_id2</code>.
     */
    @Column(name = "qux_c_id2", length = 36)
    @Size(max = 36)
    public String getQuxCId2() {
        return (String) get(5);
    }

    /**
     * Setter for <code>public.qux_main.qux_d_id</code>.
     */
    public void setQuxDId(String value) {
        set(6, value);
    }

    /**
     * Getter for <code>public.qux_main.qux_d_id</code>.
     */
    @Column(name = "qux_d_id", length = 36)
    @Size(max = 36)
    public String getQuxDId() {
        return (String) get(6);
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
    public Row7<String, String, String, String, String, String, String> fieldsRow() {
        return (Row7) super.fieldsRow();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Row7<String, String, String, String, String, String, String> valuesRow() {
        return (Row7) super.valuesRow();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field1() {
        return QuxMain.QUX_MAIN.ID;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field2() {
        return QuxMain.QUX_MAIN.NAME;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field3() {
        return QuxMain.QUX_MAIN.QUX_A_ID;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field4() {
        return QuxMain.QUX_MAIN.QUX_B_NAME;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field5() {
        return QuxMain.QUX_MAIN.QUX_C_ID1;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field6() {
        return QuxMain.QUX_MAIN.QUX_C_ID2;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field7() {
        return QuxMain.QUX_MAIN.QUX_D_ID;
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
    public String component3() {
        return getQuxAId();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String component4() {
        return getQuxBName();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String component5() {
        return getQuxCId1();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String component6() {
        return getQuxCId2();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String component7() {
        return getQuxDId();
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
    public String value3() {
        return getQuxAId();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String value4() {
        return getQuxBName();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String value5() {
        return getQuxCId1();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String value6() {
        return getQuxCId2();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String value7() {
        return getQuxDId();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public QuxMainRecord value1(String value) {
        setId(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public QuxMainRecord value2(String value) {
        setName(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public QuxMainRecord value3(String value) {
        setQuxAId(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public QuxMainRecord value4(String value) {
        setQuxBName(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public QuxMainRecord value5(String value) {
        setQuxCId1(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public QuxMainRecord value6(String value) {
        setQuxCId2(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public QuxMainRecord value7(String value) {
        setQuxDId(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public QuxMainRecord values(String value1, String value2, String value3, String value4, String value5, String value6, String value7) {
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
     * Create a detached QuxMainRecord
     */
    public QuxMainRecord() {
        super(QuxMain.QUX_MAIN);
    }

    /**
     * Create a detached, initialised QuxMainRecord
     */
    public QuxMainRecord(String id, String name, String quxAId, String quxBName, String quxCId1, String quxCId2, String quxDId) {
        super(QuxMain.QUX_MAIN);

        set(0, id);
        set(1, name);
        set(2, quxAId);
        set(3, quxBName);
        set(4, quxCId1);
        set(5, quxCId2);
        set(6, quxDId);
    }
}