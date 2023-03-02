/*
 * This file is generated by jOOQ.
 */
package de.quinscape.automatontest.domain.tables;


import de.quinscape.automatontest.domain.Indexes;
import de.quinscape.automatontest.domain.Keys;
import de.quinscape.automatontest.domain.Public;
import de.quinscape.automatontest.domain.tables.records.BazRecord;

import java.util.Arrays;
import java.util.List;
import java.util.function.Function;

import javax.annotation.processing.Generated;

import org.jooq.Field;
import org.jooq.ForeignKey;
import org.jooq.Function3;
import org.jooq.Index;
import org.jooq.Name;
import org.jooq.Record;
import org.jooq.Records;
import org.jooq.Row3;
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
public class Baz extends TableImpl<BazRecord> {

    private static final long serialVersionUID = 1L;

    /**
     * The reference instance of <code>public.baz</code>
     */
    public static final Baz BAZ = new Baz();

    /**
     * The class holding records for this type
     */
    @Override
    public Class<BazRecord> getRecordType() {
        return BazRecord.class;
    }

    /**
     * The column <code>public.baz.id</code>.
     */
    public final TableField<BazRecord, String> ID = createField(DSL.name("id"), SQLDataType.VARCHAR(36).nullable(false), this, "");

    /**
     * The column <code>public.baz.name</code>.
     */
    public final TableField<BazRecord, String> NAME = createField(DSL.name("name"), SQLDataType.VARCHAR(100).nullable(false), this, "");

    /**
     * The column <code>public.baz.owner_id</code>.
     */
    public final TableField<BazRecord, String> OWNER_ID = createField(DSL.name("owner_id"), SQLDataType.VARCHAR(36).nullable(false), this, "");

    private Baz(Name alias, Table<BazRecord> aliased) {
        this(alias, aliased, null);
    }

    private Baz(Name alias, Table<BazRecord> aliased, Field<?>[] parameters) {
        super(alias, null, aliased, parameters, DSL.comment(""), TableOptions.table());
    }

    /**
     * Create an aliased <code>public.baz</code> table reference
     */
    public Baz(String alias) {
        this(DSL.name(alias), BAZ);
    }

    /**
     * Create an aliased <code>public.baz</code> table reference
     */
    public Baz(Name alias) {
        this(alias, BAZ);
    }

    /**
     * Create a <code>public.baz</code> table reference
     */
    public Baz() {
        this(DSL.name("baz"), null);
    }

    public <O extends Record> Baz(Table<O> child, ForeignKey<O, BazRecord> key) {
        super(child, key, BAZ);
    }

    @Override
    public Schema getSchema() {
        return aliased() ? null : Public.PUBLIC;
    }

    @Override
    public List<Index> getIndexes() {
        return Arrays.asList(Indexes.FKI_BAZ_OWNER_ID);
    }

    @Override
    public UniqueKey<BazRecord> getPrimaryKey() {
        return Keys.PK_BAZ;
    }

    @Override
    public List<ForeignKey<BazRecord, ?>> getReferences() {
        return Arrays.asList(Keys.BAZ__FK_BAZ_OWNER_ID);
    }

    private transient AppUser _appUser;

    /**
     * Get the implicit join path to the <code>public.app_user</code> table.
     */
    public AppUser appUser() {
        if (_appUser == null)
            _appUser = new AppUser(this, Keys.BAZ__FK_BAZ_OWNER_ID);

        return _appUser;
    }

    @Override
    public Baz as(String alias) {
        return new Baz(DSL.name(alias), this);
    }

    @Override
    public Baz as(Name alias) {
        return new Baz(alias, this);
    }

    @Override
    public Baz as(Table<?> alias) {
        return new Baz(alias.getQualifiedName(), this);
    }

    /**
     * Rename this table
     */
    @Override
    public Baz rename(String name) {
        return new Baz(DSL.name(name), null);
    }

    /**
     * Rename this table
     */
    @Override
    public Baz rename(Name name) {
        return new Baz(name, null);
    }

    /**
     * Rename this table
     */
    @Override
    public Baz rename(Table<?> name) {
        return new Baz(name.getQualifiedName(), null);
    }

    // -------------------------------------------------------------------------
    // Row3 type methods
    // -------------------------------------------------------------------------

    @Override
    public Row3<String, String, String> fieldsRow() {
        return (Row3) super.fieldsRow();
    }

    /**
     * Convenience mapping calling {@link SelectField#convertFrom(Function)}.
     */
    public <U> SelectField<U> mapping(Function3<? super String, ? super String, ? super String, ? extends U> from) {
        return convertFrom(Records.mapping(from));
    }

    /**
     * Convenience mapping calling {@link SelectField#convertFrom(Class,
     * Function)}.
     */
    public <U> SelectField<U> mapping(Class<U> toType, Function3<? super String, ? super String, ? super String, ? extends U> from) {
        return convertFrom(toType, Records.mapping(from));
    }
}
