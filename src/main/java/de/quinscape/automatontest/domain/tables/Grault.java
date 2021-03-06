/*
 * This file is generated by jOOQ.
*/
package de.quinscape.automatontest.domain.tables;


import de.quinscape.automatontest.domain.Indexes;
import de.quinscape.automatontest.domain.Keys;
import de.quinscape.automatontest.domain.Public;
import de.quinscape.automatontest.domain.tables.records.GraultRecord;

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
public class Grault extends TableImpl<GraultRecord> {

    private static final long serialVersionUID = 1559230543;

    /**
     * The reference instance of <code>public.grault</code>
     */
    public static final Grault GRAULT = new Grault();

    /**
     * The class holding records for this type
     */
    @Override
    public Class<GraultRecord> getRecordType() {
        return GraultRecord.class;
    }

    /**
     * The column <code>public.grault.id</code>.
     */
    public final TableField<GraultRecord, String> ID = createField("id", org.jooq.impl.SQLDataType.VARCHAR(36).nullable(false), this, "");

    /**
     * The column <code>public.grault.name</code>.
     */
    public final TableField<GraultRecord, String> NAME = createField("name", org.jooq.impl.SQLDataType.VARCHAR(100).nullable(false), this, "");

    /**
     * The column <code>public.grault.attachment_id</code>.
     */
    public final TableField<GraultRecord, String> ATTACHMENT_ID = createField("attachment_id", org.jooq.impl.SQLDataType.VARCHAR(36), this, "");

    /**
     * The column <code>public.grault.url</code>.
     */
    public final TableField<GraultRecord, String> URL = createField("url", org.jooq.impl.SQLDataType.CLOB, this, "");

    /**
     * Create a <code>public.grault</code> table reference
     */
    public Grault() {
        this(DSL.name("grault"), null);
    }

    /**
     * Create an aliased <code>public.grault</code> table reference
     */
    public Grault(String alias) {
        this(DSL.name(alias), GRAULT);
    }

    /**
     * Create an aliased <code>public.grault</code> table reference
     */
    public Grault(Name alias) {
        this(alias, GRAULT);
    }

    private Grault(Name alias, Table<GraultRecord> aliased) {
        this(alias, aliased, null);
    }

    private Grault(Name alias, Table<GraultRecord> aliased, Field<?>[] parameters) {
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
        return Arrays.<Index>asList(Indexes.PK_GRAULT);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public UniqueKey<GraultRecord> getPrimaryKey() {
        return Keys.PK_GRAULT;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<UniqueKey<GraultRecord>> getKeys() {
        return Arrays.<UniqueKey<GraultRecord>>asList(Keys.PK_GRAULT);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<ForeignKey<GraultRecord, ?>> getReferences() {
        return Arrays.<ForeignKey<GraultRecord, ?>>asList(Keys.GRAULT__FK_GRAULT_ATTACHMENT_ID);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Grault as(String alias) {
        return new Grault(DSL.name(alias), this);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Grault as(Name alias) {
        return new Grault(alias, this);
    }

    /**
     * Rename this table
     */
    @Override
    public Grault rename(String name) {
        return new Grault(DSL.name(name), null);
    }

    /**
     * Rename this table
     */
    @Override
    public Grault rename(Name name) {
        return new Grault(name, null);
    }
}
