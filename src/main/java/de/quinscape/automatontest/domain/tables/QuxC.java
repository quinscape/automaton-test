/*
 * This file is generated by jOOQ.
 */
package de.quinscape.automatontest.domain.tables;


import de.quinscape.automatontest.domain.Keys;
import de.quinscape.automatontest.domain.Public;
import de.quinscape.automatontest.domain.tables.records.QuxCRecord;

import java.util.Arrays;
import java.util.List;
import java.util.function.Function;

import javax.annotation.processing.Generated;

import org.jooq.Field;
import org.jooq.ForeignKey;
import org.jooq.Function4;
import org.jooq.Name;
import org.jooq.Record;
import org.jooq.Records;
import org.jooq.Row4;
import org.jooq.Schema;
import org.jooq.SelectField;
import org.jooq.Table;
import org.jooq.TableField;
import org.jooq.TableOptions;
import org.jooq.UniqueKey;
import org.jooq.impl.DSL;
import org.jooq.impl.SQLDataType;
import org.jooq.impl.TableImpl;


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
public class QuxC extends TableImpl<QuxCRecord> {

    private static final long serialVersionUID = 1L;

    /**
     * The reference instance of <code>public.qux_c</code>
     */
    public static final QuxC QUX_C = new QuxC();

    /**
     * The class holding records for this type
     */
    @Override
    public Class<QuxCRecord> getRecordType() {
        return QuxCRecord.class;
    }

    /**
     * The column <code>public.qux_c.id</code>.
     */
    public final TableField<QuxCRecord, String> ID = createField(DSL.name("id"), SQLDataType.VARCHAR(36).nullable(false), this, "");

    /**
     * The column <code>public.qux_c.name</code>.
     */
    public final TableField<QuxCRecord, String> NAME = createField(DSL.name("name"), SQLDataType.VARCHAR(100).nullable(false), this, "");

    /**
     * The column <code>public.qux_c.value</code>.
     */
    public final TableField<QuxCRecord, Integer> VALUE = createField(DSL.name("value"), SQLDataType.INTEGER.nullable(false), this, "");

    /**
     * The column <code>public.qux_c.description</code>.
     */
    public final TableField<QuxCRecord, String> DESCRIPTION = createField(DSL.name("description"), SQLDataType.CLOB, this, "");

    private QuxC(Name alias, Table<QuxCRecord> aliased) {
        this(alias, aliased, null);
    }

    private QuxC(Name alias, Table<QuxCRecord> aliased, Field<?>[] parameters) {
        super(alias, null, aliased, parameters, DSL.comment(""), TableOptions.table());
    }

    /**
     * Create an aliased <code>public.qux_c</code> table reference
     */
    public QuxC(String alias) {
        this(DSL.name(alias), QUX_C);
    }

    /**
     * Create an aliased <code>public.qux_c</code> table reference
     */
    public QuxC(Name alias) {
        this(alias, QUX_C);
    }

    /**
     * Create a <code>public.qux_c</code> table reference
     */
    public QuxC() {
        this(DSL.name("qux_c"), null);
    }

    public <O extends Record> QuxC(Table<O> child, ForeignKey<O, QuxCRecord> key) {
        super(child, key, QUX_C);
    }

    @Override
    public Schema getSchema() {
        return aliased() ? null : Public.PUBLIC;
    }

    @Override
    public UniqueKey<QuxCRecord> getPrimaryKey() {
        return Keys.PK_QUX_C;
    }

    @Override
    public List<UniqueKey<QuxCRecord>> getUniqueKeys() {
        return Arrays.asList(Keys.QUX_C_NAME_KEY);
    }

    @Override
    public QuxC as(String alias) {
        return new QuxC(DSL.name(alias), this);
    }

    @Override
    public QuxC as(Name alias) {
        return new QuxC(alias, this);
    }

    @Override
    public QuxC as(Table<?> alias) {
        return new QuxC(alias.getQualifiedName(), this);
    }

    /**
     * Rename this table
     */
    @Override
    public QuxC rename(String name) {
        return new QuxC(DSL.name(name), null);
    }

    /**
     * Rename this table
     */
    @Override
    public QuxC rename(Name name) {
        return new QuxC(name, null);
    }

    /**
     * Rename this table
     */
    @Override
    public QuxC rename(Table<?> name) {
        return new QuxC(name.getQualifiedName(), null);
    }

    // -------------------------------------------------------------------------
    // Row4 type methods
    // -------------------------------------------------------------------------

    @Override
    public Row4<String, String, Integer, String> fieldsRow() {
        return (Row4) super.fieldsRow();
    }

    /**
     * Convenience mapping calling {@link SelectField#convertFrom(Function)}.
     */
    public <U> SelectField<U> mapping(Function4<? super String, ? super String, ? super Integer, ? super String, ? extends U> from) {
        return convertFrom(Records.mapping(from));
    }

    /**
     * Convenience mapping calling {@link SelectField#convertFrom(Class,
     * Function)}.
     */
    public <U> SelectField<U> mapping(Class<U> toType, Function4<? super String, ? super String, ? super Integer, ? super String, ? extends U> from) {
        return convertFrom(toType, Records.mapping(from));
    }
}
