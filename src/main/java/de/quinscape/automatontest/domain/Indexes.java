/*
 * This file is generated by jOOQ.
*/
package de.quinscape.automatontest.domain;


import de.quinscape.automatontest.domain.tables.AppAttachment;
import de.quinscape.automatontest.domain.tables.AppConfig;
import de.quinscape.automatontest.domain.tables.AppLogin;
import de.quinscape.automatontest.domain.tables.AppTranslation;
import de.quinscape.automatontest.domain.tables.AppUser;
import de.quinscape.automatontest.domain.tables.AppUserConfig;
import de.quinscape.automatontest.domain.tables.AppVersion;
import de.quinscape.automatontest.domain.tables.Baz;
import de.quinscape.automatontest.domain.tables.BazLink;
import de.quinscape.automatontest.domain.tables.BazValue;
import de.quinscape.automatontest.domain.tables.Corge;
import de.quinscape.automatontest.domain.tables.CorgeAssoc;
import de.quinscape.automatontest.domain.tables.CorgeLink;
import de.quinscape.automatontest.domain.tables.CorgeType;
import de.quinscape.automatontest.domain.tables.Foo;
import de.quinscape.automatontest.domain.tables.FooType;
import de.quinscape.automatontest.domain.tables.GridColumns;
import de.quinscape.automatontest.domain.tables.Node;
import de.quinscape.automatontest.domain.tables.QuxA;
import de.quinscape.automatontest.domain.tables.QuxB;
import de.quinscape.automatontest.domain.tables.QuxC;
import de.quinscape.automatontest.domain.tables.QuxD;
import de.quinscape.automatontest.domain.tables.QuxMain;

import javax.annotation.Generated;

import org.jooq.Index;
import org.jooq.OrderField;
import org.jooq.impl.Internal;


/**
 * A class modelling indexes of tables of the <code>public</code> schema.
 */
@Generated(
    value = {
        "http://www.jooq.org",
        "jOOQ version:3.10.6"
    },
    comments = "This class is generated by jOOQ"
)
@SuppressWarnings({ "all", "unchecked", "rawtypes" })
public class Indexes {

    // -------------------------------------------------------------------------
    // INDEX definitions
    // -------------------------------------------------------------------------

    public static final Index PK_APP_ATTACHMENT = Indexes0.PK_APP_ATTACHMENT;
    public static final Index PK_APP_CONFIG = Indexes0.PK_APP_CONFIG;
    public static final Index PK_APP_LOGIN = Indexes0.PK_APP_LOGIN;
    public static final Index PK_APP_TRANSLATION = Indexes0.PK_APP_TRANSLATION;
    public static final Index UC_APP_TRANSLATION = Indexes0.UC_APP_TRANSLATION;
    public static final Index PK_APP_USER = Indexes0.PK_APP_USER;
    public static final Index UC_APP_USER_LOGIN = Indexes0.UC_APP_USER_LOGIN;
    public static final Index PK_APP_USER_CONFIG = Indexes0.PK_APP_USER_CONFIG;
    public static final Index PK_APP_VERSION = Indexes0.PK_APP_VERSION;
    public static final Index FKI_BAZ_OWNER_ID = Indexes0.FKI_BAZ_OWNER_ID;
    public static final Index PK_BAZ = Indexes0.PK_BAZ;
    public static final Index BAZ_LINK_BAZ_ID_VALUE_ID_KEY = Indexes0.BAZ_LINK_BAZ_ID_VALUE_ID_KEY;
    public static final Index PK_BAZ_LINK = Indexes0.PK_BAZ_LINK;
    public static final Index PK_BAZ_VALUE = Indexes0.PK_BAZ_VALUE;
    public static final Index PK_CORGE = Indexes0.PK_CORGE;
    public static final Index PK_CORGE_ASSOC = Indexes0.PK_CORGE_ASSOC;
    public static final Index PK_CORGE_LINK = Indexes0.PK_CORGE_LINK;
    public static final Index PK_CORGE_TYPE = Indexes0.PK_CORGE_TYPE;
    public static final Index PK_FOO = Indexes0.PK_FOO;
    public static final Index FOO_TYPE_NAME_KEY = Indexes0.FOO_TYPE_NAME_KEY;
    public static final Index PK_FOO_TYPE = Indexes0.PK_FOO_TYPE;
    public static final Index GRID_COLUMNS_NAME_OWNER_ID_KEY = Indexes0.GRID_COLUMNS_NAME_OWNER_ID_KEY;
    public static final Index PK_GRID_COLUMNS = Indexes0.PK_GRID_COLUMNS;
    public static final Index PK_NODE = Indexes0.PK_NODE;
    public static final Index UC_NODE_NAME = Indexes0.UC_NODE_NAME;
    public static final Index PK_QUX_A = Indexes0.PK_QUX_A;
    public static final Index QUX_A_NAME_KEY = Indexes0.QUX_A_NAME_KEY;
    public static final Index PK_QUX_B = Indexes0.PK_QUX_B;
    public static final Index QUX_B_NAME_KEY = Indexes0.QUX_B_NAME_KEY;
    public static final Index PK_QUX_C = Indexes0.PK_QUX_C;
    public static final Index QUX_C_NAME_KEY = Indexes0.QUX_C_NAME_KEY;
    public static final Index PK_QUX_D = Indexes0.PK_QUX_D;
    public static final Index QUX_D_NAME_KEY = Indexes0.QUX_D_NAME_KEY;
    public static final Index PK_QUX_MAIN = Indexes0.PK_QUX_MAIN;

    // -------------------------------------------------------------------------
    // [#1459] distribute members to avoid static initialisers > 64kb
    // -------------------------------------------------------------------------

    private static class Indexes0 {
        public static Index PK_APP_ATTACHMENT = Internal.createIndex("pk_app_attachment", AppAttachment.APP_ATTACHMENT, new OrderField[] { AppAttachment.APP_ATTACHMENT.ID }, true);
        public static Index PK_APP_CONFIG = Internal.createIndex("pk_app_config", AppConfig.APP_CONFIG, new OrderField[] { AppConfig.APP_CONFIG.NAME }, true);
        public static Index PK_APP_LOGIN = Internal.createIndex("pk_app_login", AppLogin.APP_LOGIN, new OrderField[] { AppLogin.APP_LOGIN.SERIES }, true);
        public static Index PK_APP_TRANSLATION = Internal.createIndex("pk_app_translation", AppTranslation.APP_TRANSLATION, new OrderField[] { AppTranslation.APP_TRANSLATION.ID }, true);
        public static Index UC_APP_TRANSLATION = Internal.createIndex("uc_app_translation", AppTranslation.APP_TRANSLATION, new OrderField[] { AppTranslation.APP_TRANSLATION.LOCALE, AppTranslation.APP_TRANSLATION.TAG, AppTranslation.APP_TRANSLATION.PROCESS_NAME }, true);
        public static Index PK_APP_USER = Internal.createIndex("pk_app_user", AppUser.APP_USER, new OrderField[] { AppUser.APP_USER.ID }, true);
        public static Index UC_APP_USER_LOGIN = Internal.createIndex("uc_app_user_login", AppUser.APP_USER, new OrderField[] { AppUser.APP_USER.LOGIN }, true);
        public static Index PK_APP_USER_CONFIG = Internal.createIndex("pk_app_user_config", AppUserConfig.APP_USER_CONFIG, new OrderField[] { AppUserConfig.APP_USER_CONFIG.LOGIN }, true);
        public static Index PK_APP_VERSION = Internal.createIndex("pk_app_version", AppVersion.APP_VERSION, new OrderField[] { AppVersion.APP_VERSION.ID }, true);
        public static Index FKI_BAZ_OWNER_ID = Internal.createIndex("fki_baz_owner_id", Baz.BAZ, new OrderField[] { Baz.BAZ.OWNER_ID }, false);
        public static Index PK_BAZ = Internal.createIndex("pk_baz", Baz.BAZ, new OrderField[] { Baz.BAZ.ID }, true);
        public static Index BAZ_LINK_BAZ_ID_VALUE_ID_KEY = Internal.createIndex("baz_link_baz_id_value_id_key", BazLink.BAZ_LINK, new OrderField[] { BazLink.BAZ_LINK.BAZ_ID, BazLink.BAZ_LINK.VALUE_ID }, true);
        public static Index PK_BAZ_LINK = Internal.createIndex("pk_baz_link", BazLink.BAZ_LINK, new OrderField[] { BazLink.BAZ_LINK.ID }, true);
        public static Index PK_BAZ_VALUE = Internal.createIndex("pk_baz_value", BazValue.BAZ_VALUE, new OrderField[] { BazValue.BAZ_VALUE.ID }, true);
        public static Index PK_CORGE = Internal.createIndex("pk_corge", Corge.CORGE, new OrderField[] { Corge.CORGE.ID }, true);
        public static Index PK_CORGE_ASSOC = Internal.createIndex("pk_corge_assoc", CorgeAssoc.CORGE_ASSOC, new OrderField[] { CorgeAssoc.CORGE_ASSOC.ID }, true);
        public static Index PK_CORGE_LINK = Internal.createIndex("pk_corge_link", CorgeLink.CORGE_LINK, new OrderField[] { CorgeLink.CORGE_LINK.ID }, true);
        public static Index PK_CORGE_TYPE = Internal.createIndex("pk_corge_type", CorgeType.CORGE_TYPE, new OrderField[] { CorgeType.CORGE_TYPE.ID }, true);
        public static Index PK_FOO = Internal.createIndex("pk_foo", Foo.FOO, new OrderField[] { Foo.FOO.ID }, true);
        public static Index FOO_TYPE_NAME_KEY = Internal.createIndex("foo_type_name_key", FooType.FOO_TYPE, new OrderField[] { FooType.FOO_TYPE.NAME }, true);
        public static Index PK_FOO_TYPE = Internal.createIndex("pk_foo_type", FooType.FOO_TYPE, new OrderField[] { FooType.FOO_TYPE.ORDINAL }, true);
        public static Index GRID_COLUMNS_NAME_OWNER_ID_KEY = Internal.createIndex("grid_columns_name_owner_id_key", GridColumns.GRID_COLUMNS, new OrderField[] { GridColumns.GRID_COLUMNS.NAME, GridColumns.GRID_COLUMNS.OWNER_ID }, true);
        public static Index PK_GRID_COLUMNS = Internal.createIndex("pk_grid_columns", GridColumns.GRID_COLUMNS, new OrderField[] { GridColumns.GRID_COLUMNS.ID }, true);
        public static Index PK_NODE = Internal.createIndex("pk_node", Node.NODE, new OrderField[] { Node.NODE.ID }, true);
        public static Index UC_NODE_NAME = Internal.createIndex("uc_node_name", Node.NODE, new OrderField[] { Node.NODE.NAME }, true);
        public static Index PK_QUX_A = Internal.createIndex("pk_qux_a", QuxA.QUX_A, new OrderField[] { QuxA.QUX_A.ID }, true);
        public static Index QUX_A_NAME_KEY = Internal.createIndex("qux_a_name_key", QuxA.QUX_A, new OrderField[] { QuxA.QUX_A.NAME }, true);
        public static Index PK_QUX_B = Internal.createIndex("pk_qux_b", QuxB.QUX_B, new OrderField[] { QuxB.QUX_B.ID }, true);
        public static Index QUX_B_NAME_KEY = Internal.createIndex("qux_b_name_key", QuxB.QUX_B, new OrderField[] { QuxB.QUX_B.NAME }, true);
        public static Index PK_QUX_C = Internal.createIndex("pk_qux_c", QuxC.QUX_C, new OrderField[] { QuxC.QUX_C.ID }, true);
        public static Index QUX_C_NAME_KEY = Internal.createIndex("qux_c_name_key", QuxC.QUX_C, new OrderField[] { QuxC.QUX_C.NAME }, true);
        public static Index PK_QUX_D = Internal.createIndex("pk_qux_d", QuxD.QUX_D, new OrderField[] { QuxD.QUX_D.ID }, true);
        public static Index QUX_D_NAME_KEY = Internal.createIndex("qux_d_name_key", QuxD.QUX_D, new OrderField[] { QuxD.QUX_D.NAME }, true);
        public static Index PK_QUX_MAIN = Internal.createIndex("pk_qux_main", QuxMain.QUX_MAIN, new OrderField[] { QuxMain.QUX_MAIN.ID }, true);
    }
}
