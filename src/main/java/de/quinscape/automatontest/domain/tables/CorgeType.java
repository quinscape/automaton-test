/*
 * This file is generated by jOOQ.
*/
package de.quinscape.automatontest.domain.tables;


import de.quinscape.automatontest.domain.Indexes;
import de.quinscape.automatontest.domain.Keys;
import de.quinscape.automatontest.domain.Public;
import de.quinscape.automatontest.domain.tables.records.CorgeTypeRecord;

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
public class CorgeType extends TableImpl<CorgeTypeRecord> {

    private static final long serialVersionUID = -1324844806;

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
    public final TableField<CorgeTypeRecord, String> ID = createField("id", org.jooq.impl.SQLDataType.VARCHAR(36).nullable(false), this, "");

    /**
     * The column <code>public.corge_type.name</code>.
     */
    public final TableField<CorgeTypeRecord, String> NAME = createField("name", org.jooq.impl.SQLDataType.VARCHAR(100).nullable(false), this, "");

    /**
     * Create a <code>public.corge_type</code> table reference
     */
    public CorgeType() {
        this(DSL.name("corge_type"), null);
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

    private CorgeType(Name alias, Table<CorgeTypeRecord> aliased) {
        this(alias, aliased, null);
    }

    private CorgeType(Name alias, Table<CorgeTypeRecord> aliased, Field<?>[] parameters) {
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
        return Arrays.<Index>asList(Indexes.PK_CORGE_TYPE);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public UniqueKey<CorgeTypeRecord> getPrimaryKey() {
        return Keys.PK_CORGE_TYPE;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<UniqueKey<CorgeTypeRecord>> getKeys() {
        return Arrays.<UniqueKey<CorgeTypeRecord>>asList(Keys.PK_CORGE_TYPE);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public CorgeType as(String alias) {
        return new CorgeType(DSL.name(alias), this);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public CorgeType as(Name alias) {
        return new CorgeType(alias, this);
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
}
