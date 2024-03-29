/*
 * This file is generated by jOOQ.
 */
package de.quinscape.automatontest.domain.tables;


import de.quinscape.automatontest.domain.Keys;
import de.quinscape.automatontest.domain.Public;
import de.quinscape.automatontest.domain.tables.records.AppConfigRecord;
import de.quinscape.domainql.jsonb.JSONB;
import de.quinscape.domainql.jsonb.PGJSONBinding;

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
public class AppConfig extends TableImpl<AppConfigRecord> {

    private static final long serialVersionUID = 1L;

    /**
     * The reference instance of <code>public.app_config</code>
     */
    public static final AppConfig APP_CONFIG = new AppConfig();

    /**
     * The class holding records for this type
     */
    @Override
    public Class<AppConfigRecord> getRecordType() {
        return AppConfigRecord.class;
    }

    /**
     * The column <code>public.app_config.name</code>.
     */
    public final TableField<AppConfigRecord, String> NAME = createField(DSL.name("name"), SQLDataType.VARCHAR(64).nullable(false), this, "");

    /**
     * The column <code>public.app_config.scope</code>.
     */
    public final TableField<AppConfigRecord, JSONB> SCOPE = createField(DSL.name("scope"), SQLDataType.JSONB.nullable(false), this, "", new PGJSONBinding());

    private AppConfig(Name alias, Table<AppConfigRecord> aliased) {
        this(alias, aliased, null);
    }

    private AppConfig(Name alias, Table<AppConfigRecord> aliased, Field<?>[] parameters) {
        super(alias, null, aliased, parameters, DSL.comment(""), TableOptions.table());
    }

    /**
     * Create an aliased <code>public.app_config</code> table reference
     */
    public AppConfig(String alias) {
        this(DSL.name(alias), APP_CONFIG);
    }

    /**
     * Create an aliased <code>public.app_config</code> table reference
     */
    public AppConfig(Name alias) {
        this(alias, APP_CONFIG);
    }

    /**
     * Create a <code>public.app_config</code> table reference
     */
    public AppConfig() {
        this(DSL.name("app_config"), null);
    }

    public <O extends Record> AppConfig(Table<O> child, ForeignKey<O, AppConfigRecord> key) {
        super(child, key, APP_CONFIG);
    }

    @Override
    public Schema getSchema() {
        return aliased() ? null : Public.PUBLIC;
    }

    @Override
    public UniqueKey<AppConfigRecord> getPrimaryKey() {
        return Keys.PK_APP_CONFIG;
    }

    @Override
    public AppConfig as(String alias) {
        return new AppConfig(DSL.name(alias), this);
    }

    @Override
    public AppConfig as(Name alias) {
        return new AppConfig(alias, this);
    }

    @Override
    public AppConfig as(Table<?> alias) {
        return new AppConfig(alias.getQualifiedName(), this);
    }

    /**
     * Rename this table
     */
    @Override
    public AppConfig rename(String name) {
        return new AppConfig(DSL.name(name), null);
    }

    /**
     * Rename this table
     */
    @Override
    public AppConfig rename(Name name) {
        return new AppConfig(name, null);
    }

    /**
     * Rename this table
     */
    @Override
    public AppConfig rename(Table<?> name) {
        return new AppConfig(name.getQualifiedName(), null);
    }

    // -------------------------------------------------------------------------
    // Row2 type methods
    // -------------------------------------------------------------------------

    @Override
    public Row2<String, JSONB> fieldsRow() {
        return (Row2) super.fieldsRow();
    }

    /**
     * Convenience mapping calling {@link SelectField#convertFrom(Function)}.
     */
    public <U> SelectField<U> mapping(Function2<? super String, ? super JSONB, ? extends U> from) {
        return convertFrom(Records.mapping(from));
    }

    /**
     * Convenience mapping calling {@link SelectField#convertFrom(Class,
     * Function)}.
     */
    public <U> SelectField<U> mapping(Class<U> toType, Function2<? super String, ? super JSONB, ? extends U> from) {
        return convertFrom(toType, Records.mapping(from));
    }
}
