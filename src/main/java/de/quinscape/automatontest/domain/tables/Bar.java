/*
 * This file is generated by jOOQ.
*/
package de.quinscape.automatontest.domain.tables;


import de.quinscape.automatontest.domain.Public;
import de.quinscape.automatontest.domain.tables.records.BarRecord;

import java.sql.Timestamp;

import javax.annotation.Generated;

import org.jooq.Field;
import org.jooq.Name;
import org.jooq.Schema;
import org.jooq.Table;
import org.jooq.TableField;
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
public class Bar extends TableImpl<BarRecord> {

    private static final long serialVersionUID = 1978908366;

    /**
     * The reference instance of <code>public.bar</code>
     */
    public static final Bar BAR = new Bar();

    /**
     * The class holding records for this type
     */
    @Override
    public Class<BarRecord> getRecordType() {
        return BarRecord.class;
    }

    /**
     * The column <code>public.bar.id</code>.
     */
    public final TableField<BarRecord, String> ID = createField("id", org.jooq.impl.SQLDataType.VARCHAR(36).nullable(false), this, "");

    /**
     * The column <code>public.bar.name</code>.
     */
    public final TableField<BarRecord, String> NAME = createField("name", org.jooq.impl.SQLDataType.VARCHAR(100).nullable(false), this, "");

    /**
     * The column <code>public.bar.numa</code>.
     */
    public final TableField<BarRecord, Integer> NUMA = createField("numa", org.jooq.impl.SQLDataType.INTEGER.nullable(false), this, "");

    /**
     * The column <code>public.bar.numb</code>.
     */
    public final TableField<BarRecord, Integer> NUMB = createField("numb", org.jooq.impl.SQLDataType.INTEGER.nullable(false), this, "");

    /**
     * The column <code>public.bar.created</code>.
     */
    public final TableField<BarRecord, Timestamp> CREATED = createField("created", org.jooq.impl.SQLDataType.TIMESTAMP.nullable(false).defaultValue(org.jooq.impl.DSL.field("now()", org.jooq.impl.SQLDataType.TIMESTAMP)), this, "");

    /**
     * Create a <code>public.bar</code> table reference
     */
    public Bar() {
        this(DSL.name("bar"), null);
    }

    /**
     * Create an aliased <code>public.bar</code> table reference
     */
    public Bar(String alias) {
        this(DSL.name(alias), BAR);
    }

    /**
     * Create an aliased <code>public.bar</code> table reference
     */
    public Bar(Name alias) {
        this(alias, BAR);
    }

    private Bar(Name alias, Table<BarRecord> aliased) {
        this(alias, aliased, null);
    }

    private Bar(Name alias, Table<BarRecord> aliased, Field<?>[] parameters) {
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
    public Bar as(String alias) {
        return new Bar(DSL.name(alias), this);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Bar as(Name alias) {
        return new Bar(alias, this);
    }

    /**
     * Rename this table
     */
    @Override
    public Bar rename(String name) {
        return new Bar(DSL.name(name), null);
    }

    /**
     * Rename this table
     */
    @Override
    public Bar rename(Name name) {
        return new Bar(name, null);
    }
}
