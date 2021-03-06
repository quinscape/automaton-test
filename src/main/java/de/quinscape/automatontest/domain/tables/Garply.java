/*
 * This file is generated by jOOQ.
*/
package de.quinscape.automatontest.domain.tables;


import de.quinscape.automatontest.domain.Indexes;
import de.quinscape.automatontest.domain.Keys;
import de.quinscape.automatontest.domain.Public;
import de.quinscape.automatontest.domain.tables.records.GarplyRecord;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

import javax.annotation.Generated;

import org.jooq.Field;
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
public class Garply extends TableImpl<GarplyRecord> {

    private static final long serialVersionUID = -1072566293;

    /**
     * The reference instance of <code>public.garply</code>
     */
    public static final Garply GARPLY = new Garply();

    /**
     * The class holding records for this type
     */
    @Override
    public Class<GarplyRecord> getRecordType() {
        return GarplyRecord.class;
    }

    /**
     * The column <code>public.garply.id</code>.
     */
    public final TableField<GarplyRecord, String> ID = createField("id", org.jooq.impl.SQLDataType.VARCHAR(36).nullable(false), this, "");

    /**
     * The column <code>public.garply.name</code>.
     */
    public final TableField<GarplyRecord, String> NAME = createField("name", org.jooq.impl.SQLDataType.VARCHAR(100).nullable(false), this, "");

    /**
     * The column <code>public.garply.value</code>.
     */
    public final TableField<GarplyRecord, BigDecimal> VALUE = createField("value", org.jooq.impl.SQLDataType.NUMERIC(19, 2).nullable(false), this, "");

    /**
     * The column <code>public.garply.opt</code>.
     */
    public final TableField<GarplyRecord, BigDecimal> OPT = createField("opt", org.jooq.impl.SQLDataType.NUMERIC(19, 2), this, "");

    /**
     * Create a <code>public.garply</code> table reference
     */
    public Garply() {
        this(DSL.name("garply"), null);
    }

    /**
     * Create an aliased <code>public.garply</code> table reference
     */
    public Garply(String alias) {
        this(DSL.name(alias), GARPLY);
    }

    /**
     * Create an aliased <code>public.garply</code> table reference
     */
    public Garply(Name alias) {
        this(alias, GARPLY);
    }

    private Garply(Name alias, Table<GarplyRecord> aliased) {
        this(alias, aliased, null);
    }

    private Garply(Name alias, Table<GarplyRecord> aliased, Field<?>[] parameters) {
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
        return Arrays.<Index>asList(Indexes.PK_GARPLY);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public UniqueKey<GarplyRecord> getPrimaryKey() {
        return Keys.PK_GARPLY;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<UniqueKey<GarplyRecord>> getKeys() {
        return Arrays.<UniqueKey<GarplyRecord>>asList(Keys.PK_GARPLY);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Garply as(String alias) {
        return new Garply(DSL.name(alias), this);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Garply as(Name alias) {
        return new Garply(alias, this);
    }

    /**
     * Rename this table
     */
    @Override
    public Garply rename(String name) {
        return new Garply(DSL.name(name), null);
    }

    /**
     * Rename this table
     */
    @Override
    public Garply rename(Name name) {
        return new Garply(name, null);
    }
}
