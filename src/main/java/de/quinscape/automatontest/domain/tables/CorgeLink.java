/*
 * This file is generated by jOOQ.
*/
package de.quinscape.automatontest.domain.tables;


import de.quinscape.automatontest.domain.Indexes;
import de.quinscape.automatontest.domain.Keys;
import de.quinscape.automatontest.domain.Public;
import de.quinscape.automatontest.domain.tables.records.CorgeLinkRecord;

import java.util.Arrays;
import java.util.List;

import javax.annotation.Generated;

import org.jooq.Field;
import org.jooq.ForeignKey;
import org.jooq.Index;
import org.jooq.Name;
import org.jooq.Schema;
import org.jooq.Table;
import org.jooq.TableField;
import org.jooq.UniqueKey;
import org.jooq.impl.DSL;
import org.jooq.impl.TableImpl;


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
public class CorgeLink extends TableImpl<CorgeLinkRecord> {

    private static final long serialVersionUID = 1637413344;

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
    public final TableField<CorgeLinkRecord, String> ID = createField("id", org.jooq.impl.SQLDataType.VARCHAR(36).nullable(false), this, "");

    /**
     * The column <code>public.corge_link.version</code>.
     */
    public final TableField<CorgeLinkRecord, String> VERSION = createField("version", org.jooq.impl.SQLDataType.VARCHAR(36).nullable(false), this, "");

    /**
     * The column <code>public.corge_link.corge_id</code>.
     */
    public final TableField<CorgeLinkRecord, String> CORGE_ID = createField("corge_id", org.jooq.impl.SQLDataType.VARCHAR(36).nullable(false), this, "");

    /**
     * The column <code>public.corge_link.assoc_id</code>.
     */
    public final TableField<CorgeLinkRecord, String> ASSOC_ID = createField("assoc_id", org.jooq.impl.SQLDataType.VARCHAR(36).nullable(false), this, "");

    /**
     * Create a <code>public.corge_link</code> table reference
     */
    public CorgeLink() {
        this(DSL.name("corge_link"), null);
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

    private CorgeLink(Name alias, Table<CorgeLinkRecord> aliased) {
        this(alias, aliased, null);
    }

    private CorgeLink(Name alias, Table<CorgeLinkRecord> aliased, Field<?>[] parameters) {
        super(alias, null, aliased, parameters, "");
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Schema getSchema() {
        return Public.PUBLIC;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<Index> getIndexes() {
        return Arrays.<Index>asList(Indexes.PK_CORGE_LINK);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public UniqueKey<CorgeLinkRecord> getPrimaryKey() {
        return Keys.PK_CORGE_LINK;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<UniqueKey<CorgeLinkRecord>> getKeys() {
        return Arrays.<UniqueKey<CorgeLinkRecord>>asList(Keys.PK_CORGE_LINK);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<ForeignKey<CorgeLinkRecord, ?>> getReferences() {
        return Arrays.<ForeignKey<CorgeLinkRecord, ?>>asList(Keys.CORGE_LINK__FK_CORGE_LINK_CORGE, Keys.CORGE_LINK__FK_CORGE_LINK_ASSOC);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public CorgeLink as(String alias) {
        return new CorgeLink(DSL.name(alias), this);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public CorgeLink as(Name alias) {
        return new CorgeLink(alias, this);
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
}
