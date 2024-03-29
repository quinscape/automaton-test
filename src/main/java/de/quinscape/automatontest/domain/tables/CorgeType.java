/*
 * This file is generated by jOOQ.
 */
package de.quinscape.automatontest.domain.tables;


import de.quinscape.automatontest.domain.Keys;
import de.quinscape.automatontest.domain.Public;
import de.quinscape.automatontest.domain.tables.records.CorgeTypeRecord;

import java.util.function.Function;

import javax.annotation.processing.Generated;

import org.jooq.Field;
import org.jooq.ForeignKey;
import org.jooq.Function2;
import org.jooq.Name;
import org.jooq.Record;
import org.jooq.Records;
import org.jooq.Row2;
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
public class CorgeType extends TableImpl<CorgeTypeRecord> {

    private static final long serialVersionUID = 1L;

    /**
     * The reference instance of <code>public.corge_type</code>
     */
    public static final CorgeType CORGE_TYPE = new CorgeType();

    /**
     * The class holding records for this type
     */
    @Override
    public Class<CorgeTypeRecord> getRecordType() {
        return CorgeTypeRecord.class;
    }

    /**
     * The column <code>public.corge_type.id</code>.
     */
    public final TableField<CorgeTypeRecord, String> ID = createField(DSL.name("id"), SQLDataType.VARCHAR(36).nullable(false), this, "");

    /**
     * The column <code>public.corge_type.name</code>.
     */
    public final TableField<CorgeTypeRecord, String> NAME = createField(DSL.name("name"), SQLDataType.VARCHAR(100).nullable(false), this, "");

    private CorgeType(Name alias, Table<CorgeTypeRecord> aliased) {
        this(alias, aliased, null);
    }

    private CorgeType(Name alias, Table<CorgeTypeRecord> aliased, Field<?>[] parameters) {
        super(alias, null, aliased, parameters, DSL.comment(""), TableOptions.table());
    }

    /**
     * Create an aliased <code>public.corge_type</code> table reference
     */
    public CorgeType(String alias) {
        this(DSL.name(alias), CORGE_TYPE);
    }

    /**
     * Create an aliased <code>public.corge_type</code> table reference
     */
    public CorgeType(Name alias) {
        this(alias, CORGE_TYPE);
    }

    /**
     * Create a <code>public.corge_type</code> table reference
     */
    public CorgeType() {
        this(DSL.name("corge_type"), null);
    }

    public <O extends Record> CorgeType(Table<O> child, ForeignKey<O, CorgeTypeRecord> key) {
        super(child, key, CORGE_TYPE);
    }

    @Override
    public Schema getSchema() {
        return aliased() ? null : Public.PUBLIC;
    }

    @Override
    public UniqueKey<CorgeTypeRecord> getPrimaryKey() {
        return Keys.PK_CORGE_TYPE;
    }

    @Override
    public CorgeType as(String alias) {
        return new CorgeType(DSL.name(alias), this);
    }

    @Override
    public CorgeType as(Name alias) {
        return new CorgeType(alias, this);
    }

    @Override
    public CorgeType as(Table<?> alias) {
        return new CorgeType(alias.getQualifiedName(), this);
    }

    /**
     * Rename this table
     */
    @Override
    public CorgeType rename(String name) {
        return new CorgeType(DSL.name(name), null);
    }

    /**
     * Rename this table
     */
    @Override
    public CorgeType rename(Name name) {
        return new CorgeType(name, null);
    }

    /**
     * Rename this table
     */
    @Override
    public CorgeType rename(Table<?> name) {
        return new CorgeType(name.getQualifiedName(), null);
    }

    // -------------------------------------------------------------------------
    // Row2 type methods
    // -------------------------------------------------------------------------

    @Override
    public Row2<String, String> fieldsRow() {
        return (Row2) super.fieldsRow();
    }

    /**
     * Convenience mapping calling {@link SelectField#convertFrom(Function)}.
     */
    public <U> SelectField<U> mapping(Function2<? super String, ? super String, ? extends U> from) {
        return convertFrom(Records.mapping(from));
    }

    /**
     * Convenience mapping calling {@link SelectField#convertFrom(Class,
     * Function)}.
     */
    public <U> SelectField<U> mapping(Class<U> toType, Function2<? super String, ? super String, ? extends U> from) {
        return convertFrom(toType, Records.mapping(from));
    }
}
