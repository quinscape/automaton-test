/*
 * This file is generated by jOOQ.
*/
package de.quinscape.automatontest.domain.tables;


import de.quinscape.automatontest.domain.Indexes;
import de.quinscape.automatontest.domain.Keys;
import de.quinscape.automatontest.domain.Public;
import de.quinscape.automatontest.domain.tables.records.QuxARecord;

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
public class QuxA extends TableImpl<QuxARecord> {

    private static final long serialVersionUID = 2144451315;

    /**
     * The reference instance of <code>public.qux_a</code>
     */
    public static final QuxA QUX_A = new QuxA();

    /**
     * The class holding records for this type
     */
    @Override
    public Class<QuxARecord> getRecordType() {
        return QuxARecord.class;
    }

    /**
     * The column <code>public.qux_a.id</code>.
     */
    public final TableField<QuxARecord, String> ID = createField("id", org.jooq.impl.SQLDataType.VARCHAR(36).nullable(false), this, "");

    /**
     * The column <code>public.qux_a.name</code>.
     */
    public final TableField<QuxARecord, String> NAME = createField("name", org.jooq.impl.SQLDataType.VARCHAR(100).nullable(false), this, "");

    /**
     * The column <code>public.qux_a.value</code>.
     */
    public final TableField<QuxARecord, Integer> VALUE = createField("value", org.jooq.impl.SQLDataType.INTEGER.nullable(false), this, "");

    /**
     * The column <code>public.qux_a.description</code>.
     */
    public final TableField<QuxARecord, String> DESCRIPTION = createField("description", org.jooq.impl.SQLDataType.CLOB, this, "");

    /**
     * Create a <code>public.qux_a</code> table reference
     */
    public QuxA() {
        this(DSL.name("qux_a"), null);
    }

    /**
     * Create an aliased <code>public.qux_a</code> table reference
     */
    public QuxA(String alias) {
        this(DSL.name(alias), QUX_A);
    }

    /**
     * Create an aliased <code>public.qux_a</code> table reference
     */
    public QuxA(Name alias) {
        this(alias, QUX_A);
    }

    private QuxA(Name alias, Table<QuxARecord> aliased) {
        this(alias, aliased, null);
    }

    private QuxA(Name alias, Table<QuxARecord> aliased, Field<?>[] parameters) {
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
        return Arrays.<Index>asList(Indexes.PK_QUX_A, Indexes.QUX_A_NAME_KEY);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public UniqueKey<QuxARecord> getPrimaryKey() {
        return Keys.PK_QUX_A;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<UniqueKey<QuxARecord>> getKeys() {
        return Arrays.<UniqueKey<QuxARecord>>asList(Keys.PK_QUX_A, Keys.QUX_A_NAME_KEY);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public QuxA as(String alias) {
        return new QuxA(DSL.name(alias), this);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public QuxA as(Name alias) {
        return new QuxA(alias, this);
    }

    /**
     * Rename this table
     */
    @Override
    public QuxA rename(String name) {
        return new QuxA(DSL.name(name), null);
    }

    /**
     * Rename this table
     */
    @Override
    public QuxA rename(Name name) {
        return new QuxA(name, null);
    }
}
