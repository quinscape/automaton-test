/*
 * This file is generated by jOOQ.
 */
package de.quinscape.automatontest.domain;


import de.quinscape.automatontest.domain.tables.Baz;

import javax.annotation.processing.Generated;

import org.jooq.Index;
import org.jooq.OrderField;
import org.jooq.impl.DSL;
import org.jooq.impl.Internal;


/**
 * A class modelling indexes of tables in public.
 */
@Generated(
    value = {
        "https://www.jooq.org",
        "jOOQ version:3.17.7"
    },
    comments = "This class is generated by jOOQ"
)
@SuppressWarnings({ "all", "unchecked", "rawtypes" })
public class Indexes {

    // -------------------------------------------------------------------------
    // INDEX definitions
    // -------------------------------------------------------------------------

    public static final Index FKI_BAZ_OWNER_ID = Internal.createIndex(DSL.name("fki_baz_owner_id"), Baz.BAZ, new OrderField[] { Baz.BAZ.OWNER_ID }, false);
}
