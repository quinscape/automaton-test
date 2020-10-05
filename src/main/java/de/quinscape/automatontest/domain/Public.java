/*
 * This file is generated by jOOQ.
*/
package de.quinscape.automatontest.domain;


import de.quinscape.automatontest.domain.tables.AppAttachment;
import de.quinscape.automatontest.domain.tables.AppAttachmentData;
import de.quinscape.automatontest.domain.tables.AppConfig;
import de.quinscape.automatontest.domain.tables.AppLogin;
import de.quinscape.automatontest.domain.tables.AppTranslation;
import de.quinscape.automatontest.domain.tables.AppUser;
import de.quinscape.automatontest.domain.tables.AppUserConfig;
import de.quinscape.automatontest.domain.tables.AppVersion;
import de.quinscape.automatontest.domain.tables.Bar;
import de.quinscape.automatontest.domain.tables.Baz;
import de.quinscape.automatontest.domain.tables.BazLink;
import de.quinscape.automatontest.domain.tables.BazValue;
import de.quinscape.automatontest.domain.tables.Corge;
import de.quinscape.automatontest.domain.tables.CorgeAssoc;
import de.quinscape.automatontest.domain.tables.CorgeLink;
import de.quinscape.automatontest.domain.tables.CorgeType;
import de.quinscape.automatontest.domain.tables.Foo;
import de.quinscape.automatontest.domain.tables.FooType;
import de.quinscape.automatontest.domain.tables.Garply;
import de.quinscape.automatontest.domain.tables.Grault;
import de.quinscape.automatontest.domain.tables.GridColumns;
import de.quinscape.automatontest.domain.tables.MetaConfig;
import de.quinscape.automatontest.domain.tables.Node;
import de.quinscape.automatontest.domain.tables.QuxA;
import de.quinscape.automatontest.domain.tables.QuxB;
import de.quinscape.automatontest.domain.tables.QuxC;
import de.quinscape.automatontest.domain.tables.QuxD;
import de.quinscape.automatontest.domain.tables.QuxMain;
import de.quinscape.automatontest.domain.tables.SumPerMonth;
import de.quinscape.automatontest.domain.tables.Waldo;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.annotation.Generated;

import org.jooq.Catalog;
import org.jooq.Table;
import org.jooq.impl.SchemaImpl;


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
public class Public extends SchemaImpl {

    private static final long serialVersionUID = 456401860;

    /**
     * The reference instance of <code>public</code>
     */
    public static final Public PUBLIC = new Public();

    /**
     * The table <code>public.app_attachment</code>.
     */
    public final AppAttachment APP_ATTACHMENT = de.quinscape.automatontest.domain.tables.AppAttachment.APP_ATTACHMENT;

    /**
     * The table <code>public.app_attachment_data</code>.
     */
    public final AppAttachmentData APP_ATTACHMENT_DATA = de.quinscape.automatontest.domain.tables.AppAttachmentData.APP_ATTACHMENT_DATA;

    /**
     * The table <code>public.app_config</code>.
     */
    public final AppConfig APP_CONFIG = de.quinscape.automatontest.domain.tables.AppConfig.APP_CONFIG;

    /**
     * The table <code>public.app_login</code>.
     */
    public final AppLogin APP_LOGIN = de.quinscape.automatontest.domain.tables.AppLogin.APP_LOGIN;

    /**
     * The table <code>public.app_translation</code>.
     */
    public final AppTranslation APP_TRANSLATION = de.quinscape.automatontest.domain.tables.AppTranslation.APP_TRANSLATION;

    /**
     * The table <code>public.app_user</code>.
     */
    public final AppUser APP_USER = de.quinscape.automatontest.domain.tables.AppUser.APP_USER;

    /**
     * The table <code>public.app_user_config</code>.
     */
    public final AppUserConfig APP_USER_CONFIG = de.quinscape.automatontest.domain.tables.AppUserConfig.APP_USER_CONFIG;

    /**
     * The table <code>public.app_version</code>.
     */
    public final AppVersion APP_VERSION = de.quinscape.automatontest.domain.tables.AppVersion.APP_VERSION;

    /**
     * The table <code>public.bar</code>.
     */
    public final Bar BAR = de.quinscape.automatontest.domain.tables.Bar.BAR;

    /**
     * The table <code>public.baz</code>.
     */
    public final Baz BAZ = de.quinscape.automatontest.domain.tables.Baz.BAZ;

    /**
     * The table <code>public.baz_link</code>.
     */
    public final BazLink BAZ_LINK = de.quinscape.automatontest.domain.tables.BazLink.BAZ_LINK;

    /**
     * The table <code>public.baz_value</code>.
     */
    public final BazValue BAZ_VALUE = de.quinscape.automatontest.domain.tables.BazValue.BAZ_VALUE;

    /**
     * The table <code>public.corge</code>.
     */
    public final Corge CORGE = de.quinscape.automatontest.domain.tables.Corge.CORGE;

    /**
     * The table <code>public.corge_assoc</code>.
     */
    public final CorgeAssoc CORGE_ASSOC = de.quinscape.automatontest.domain.tables.CorgeAssoc.CORGE_ASSOC;

    /**
     * The table <code>public.corge_link</code>.
     */
    public final CorgeLink CORGE_LINK = de.quinscape.automatontest.domain.tables.CorgeLink.CORGE_LINK;

    /**
     * The table <code>public.corge_type</code>.
     */
    public final CorgeType CORGE_TYPE = de.quinscape.automatontest.domain.tables.CorgeType.CORGE_TYPE;

    /**
     * The table <code>public.foo</code>.
     */
    public final Foo FOO = de.quinscape.automatontest.domain.tables.Foo.FOO;

    /**
     * The table <code>public.foo_type</code>.
     */
    public final FooType FOO_TYPE = de.quinscape.automatontest.domain.tables.FooType.FOO_TYPE;

    /**
     * The table <code>public.garply</code>.
     */
    public final Garply GARPLY = de.quinscape.automatontest.domain.tables.Garply.GARPLY;

    /**
     * The table <code>public.grault</code>.
     */
    public final Grault GRAULT = de.quinscape.automatontest.domain.tables.Grault.GRAULT;

    /**
     * The table <code>public.grid_columns</code>.
     */
    public final GridColumns GRID_COLUMNS = de.quinscape.automatontest.domain.tables.GridColumns.GRID_COLUMNS;

    /**
     * The table <code>public.meta_config</code>.
     */
    public final MetaConfig META_CONFIG = de.quinscape.automatontest.domain.tables.MetaConfig.META_CONFIG;

    /**
     * The table <code>public.node</code>.
     */
    public final Node NODE = de.quinscape.automatontest.domain.tables.Node.NODE;

    /**
     * The table <code>public.qux_a</code>.
     */
    public final QuxA QUX_A = de.quinscape.automatontest.domain.tables.QuxA.QUX_A;

    /**
     * The table <code>public.qux_b</code>.
     */
    public final QuxB QUX_B = de.quinscape.automatontest.domain.tables.QuxB.QUX_B;

    /**
     * The table <code>public.qux_c</code>.
     */
    public final QuxC QUX_C = de.quinscape.automatontest.domain.tables.QuxC.QUX_C;

    /**
     * The table <code>public.qux_d</code>.
     */
    public final QuxD QUX_D = de.quinscape.automatontest.domain.tables.QuxD.QUX_D;

    /**
     * The table <code>public.qux_main</code>.
     */
    public final QuxMain QUX_MAIN = de.quinscape.automatontest.domain.tables.QuxMain.QUX_MAIN;

    /**
     * The table <code>public.sum_per_month</code>.
     */
    public final SumPerMonth SUM_PER_MONTH = de.quinscape.automatontest.domain.tables.SumPerMonth.SUM_PER_MONTH;

    /**
     * The table <code>public.waldo</code>.
     */
    public final Waldo WALDO = de.quinscape.automatontest.domain.tables.Waldo.WALDO;

    /**
     * No further instances allowed
     */
    private Public() {
        super("public", null);
    }


    /**
     * {@inheritDoc}
     */
    @Override
    public Catalog getCatalog() {
        return DefaultCatalog.DEFAULT_CATALOG;
    }

    @Override
    public final List<Table<?>> getTables() {
        List result = new ArrayList();
        result.addAll(getTables0());
        return result;
    }

    private final List<Table<?>> getTables0() {
        return Arrays.<Table<?>>asList(
            AppAttachment.APP_ATTACHMENT,
            AppAttachmentData.APP_ATTACHMENT_DATA,
            AppConfig.APP_CONFIG,
            AppLogin.APP_LOGIN,
            AppTranslation.APP_TRANSLATION,
            AppUser.APP_USER,
            AppUserConfig.APP_USER_CONFIG,
            AppVersion.APP_VERSION,
            Bar.BAR,
            Baz.BAZ,
            BazLink.BAZ_LINK,
            BazValue.BAZ_VALUE,
            Corge.CORGE,
            CorgeAssoc.CORGE_ASSOC,
            CorgeLink.CORGE_LINK,
            CorgeType.CORGE_TYPE,
            Foo.FOO,
            FooType.FOO_TYPE,
            Garply.GARPLY,
            Grault.GRAULT,
            GridColumns.GRID_COLUMNS,
            MetaConfig.META_CONFIG,
            Node.NODE,
            QuxA.QUX_A,
            QuxB.QUX_B,
            QuxC.QUX_C,
            QuxD.QUX_D,
            QuxMain.QUX_MAIN,
            SumPerMonth.SUM_PER_MONTH,
            Waldo.WALDO);
    }
}
