/*
 * This file is generated by jOOQ.
 */
package de.quinscape.automatontest.domain.tables;


import de.quinscape.automatontest.domain.Keys;
import de.quinscape.automatontest.domain.Public;
import de.quinscape.automatontest.domain.tables.records.CorgeLinkRecord;

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
public class CorgeLink extends TableImpl<CorgeLinkRecord> {

    private static final long serialVersionUID = 1L;

    /**
     * The reference instance of <code>public.corge_link</code>
     */
    public static final CorgeLink CORGE_LINK = new CorgeLink();

    /**
     * The class holding records for this type
     */
    @Override
    public Class<CorgeLinkRecord> getRecordType() {
        return CorgeLinkRecord.class;
    }

    /**
     * The column <code>public.corge_link.id</code>.
     */
    public final TableField<CorgeLinkRecord, String> ID = createField(DSL.name("id"), SQLDataType.VARCHAR(36).nullable(false), this, "");

    /**
     * The column <code>public.corge_link.version</code>.
     */
    public final TableField<CorgeLinkRecord, String> VERSION = createField(DSL.name("version"), SQLDataType.VARCHAR(36).nullable(false), this, "");

    /**
     * The column <code>public.corge_link.corge_id</code>.
     */
    public final TableField<CorgeLinkRecord, String> CORGE_ID = createField(DSL.name("corge_id"), SQLDataType.VARCHAR(36).nullable(false), this, "");

    /**
     * The column <code>public.corge_link.assoc_id</code>.
     */
    public final TableField<CorgeLinkRecord, String> ASSOC_ID = createField(DSL.name("assoc_id"), SQLDataType.VARCHAR(36).nullable(false), this, "");

    private CorgeLink(Name alias, Table<CorgeLinkRecord> aliased) {
        this(alias, aliased, null);
    }

    private CorgeLink(Name alias, Table<CorgeLinkRecord> aliased, Field<?>[] parameters) {
        super(alias, null, aliased, parameters, DSL.comment(""), TableOptions.table());
    }

    /**
     * Create an aliased <code>public.corge_link</code> table reference
     */
    public CorgeLink(String alias) {
        this(DSL.name(alias), CORGE_LINK);
    }

    /**
     * Create an aliased <code>public.corge_link</code> table reference
     */
    public CorgeLink(Name alias) {
        this(alias, CORGE_LINK);
    }

    /**
     * Create a <code>public.corge_link</code> table reference
     */
    public CorgeLink() {
        this(DSL.name("corge_link"), null);
    }

    public <O extends Record> CorgeLink(Table<O> child, ForeignKey<O, CorgeLinkRecord> key) {
        super(child, key, CORGE_LINK);
    }

    @Override
    public Schema getSchema() {
        return aliased() ? null : Public.PUBLIC;
    }

    @Override
    public UniqueKey<CorgeLinkRecord> getPrimaryKey() {
        return Keys.PK_CORGE_LINK;
    }

    @Override
    public List<ForeignKey<CorgeLinkRecord, ?>> getReferences() {
        return Arrays.asList(Keys.CORGE_LINK__FK_CORGE_LINK_CORGE, Keys.CORGE_LINK__FK_CORGE_LINK_ASSOC);
    }

    private transient Corge _corge;
    private transient CorgeAssoc _corgeAssoc;

    /**
     * Get the implicit join path to the <code>public.corge</code> table.
     */
    public Corge corge() {
        if (_corge == null)
            _corge = new Corge(this, Keys.CORGE_LINK__FK_CORGE_LINK_CORGE);

        return _corge;
    }

    /**
     * Get the implicit join path to the <code>public.corge_assoc</code> table.
     */
    public CorgeAssoc corgeAssoc() {
        if (_corgeAssoc == null)
            _corgeAssoc = new CorgeAssoc(this, Keys.CORGE_LINK__FK_CORGE_LINK_ASSOC);

        return _corgeAssoc;
    }

    @Override
    public CorgeLink as(String alias) {
        return new CorgeLink(DSL.name(alias), this);
    }

    @Override
    public CorgeLink as(Name alias) {
        return new CorgeLink(alias, this);
    }

    @Override
    public CorgeLink as(Table<?> alias) {
        return new CorgeLink(alias.getQualifiedName(), this);
    }

    /**
     * Rename this table
     */
    @Override
    public CorgeLink rename(String name) {
        return new CorgeLink(DSL.name(name), null);
    }

    /**
     * Rename this table
     */
    @Override
    public CorgeLink rename(Name name) {
        return new CorgeLink(name, null);
    }

    /**
     * Rename this table
     */
    @Override
    public CorgeLink rename(Table<?> name) {
        return new CorgeLink(name.getQualifiedName(), null);
    }

    // -------------------------------------------------------------------------
    // Row4 type methods
    // -------------------------------------------------------------------------

    @Override
    public Row4<String, String, String, String> fieldsRow() {
        return (Row4) super.fieldsRow();
    }

    /**
     * Convenience mapping calling {@link SelectField#convertFrom(Function)}.
     */
    public <U> SelectField<U> mapping(Function4<? super String, ? super String, ? super String, ? super String, ? extends U> from) {
        return convertFrom(Records.mapping(from));
    }

    /**
     * Convenience mapping calling {@link SelectField#convertFrom(Class,
     * Function)}.
     */
    public <U> SelectField<U> mapping(Class<U> toType, Function4<? super String, ? super String, ? super String, ? super String, ? extends U> from) {
        return convertFrom(toType, Records.mapping(from));
    }
}
