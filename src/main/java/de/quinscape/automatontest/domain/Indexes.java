/*
 * This file is generated by jOOQ.
*/
package de.quinscape.automatontest.domain;


import de.quinscape.automatontest.domain.tables.Address;
import de.quinscape.automatontest.domain.tables.AppAttachment;
import de.quinscape.automatontest.domain.tables.AppConfig;
import de.quinscape.automatontest.domain.tables.AppLogin;
import de.quinscape.automatontest.domain.tables.AppTranslation;
import de.quinscape.automatontest.domain.tables.AppUser;
import de.quinscape.automatontest.domain.tables.AppUserConfig;
import de.quinscape.automatontest.domain.tables.Customer;
import de.quinscape.automatontest.domain.tables.Foo;
import de.quinscape.automatontest.domain.tables.FooType;
import de.quinscape.automatontest.domain.tables.Node;
import de.quinscape.automatontest.domain.tables.Order;
import de.quinscape.automatontest.domain.tables.OrderItem;
import de.quinscape.automatontest.domain.tables.OrderStatus;
import de.quinscape.automatontest.domain.tables.Product;
import de.quinscape.automatontest.domain.tables.ShippingType;

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

    public static final Index PK_ADDRESS = Indexes0.PK_ADDRESS;
    public static final Index PK_APP_ATTACHMENT = Indexes0.PK_APP_ATTACHMENT;
    public static final Index PK_APP_CONFIG = Indexes0.PK_APP_CONFIG;
    public static final Index PK_APP_LOGIN = Indexes0.PK_APP_LOGIN;
    public static final Index PK_APP_TRANSLATION = Indexes0.PK_APP_TRANSLATION;
    public static final Index UC_APP_TRANSLATION = Indexes0.UC_APP_TRANSLATION;
    public static final Index PK_APP_USER = Indexes0.PK_APP_USER;
    public static final Index UC_APP_USER_LOGIN = Indexes0.UC_APP_USER_LOGIN;
    public static final Index PK_APP_USER_CONFIG = Indexes0.PK_APP_USER_CONFIG;
    public static final Index PK_CUSTOMER = Indexes0.PK_CUSTOMER;
    public static final Index PK_FOO = Indexes0.PK_FOO;
    public static final Index FOO_TYPE_NAME_KEY = Indexes0.FOO_TYPE_NAME_KEY;
    public static final Index PK_FOO_TYPE = Indexes0.PK_FOO_TYPE;
    public static final Index PK_NODE = Indexes0.PK_NODE;
    public static final Index UC_NODE_NAME = Indexes0.UC_NODE_NAME;
    public static final Index FKI_ORDER_ORDER_SHIPPING_TYPE = Indexes0.FKI_ORDER_ORDER_SHIPPING_TYPE;
    public static final Index FKI_ORDER_ORDER_STATUS = Indexes0.FKI_ORDER_ORDER_STATUS;
    public static final Index PK_ORDER = Indexes0.PK_ORDER;
    public static final Index PK_ORDER_ITEM = Indexes0.PK_ORDER_ITEM;
    public static final Index ORDER_STATUS_NAME_KEY = Indexes0.ORDER_STATUS_NAME_KEY;
    public static final Index PK_ORDER_STATUS = Indexes0.PK_ORDER_STATUS;
    public static final Index PK_PRODUCT = Indexes0.PK_PRODUCT;
    public static final Index PK_SHIPPING_TYPE = Indexes0.PK_SHIPPING_TYPE;

    // -------------------------------------------------------------------------
    // [#1459] distribute members to avoid static initialisers > 64kb
    // -------------------------------------------------------------------------

    private static class Indexes0 {
        public static Index PK_ADDRESS = Internal.createIndex("pk_address", Address.ADDRESS, new OrderField[] { Address.ADDRESS.ID }, true);
        public static Index PK_APP_ATTACHMENT = Internal.createIndex("pk_app_attachment", AppAttachment.APP_ATTACHMENT, new OrderField[] { AppAttachment.APP_ATTACHMENT.ID }, true);
        public static Index PK_APP_CONFIG = Internal.createIndex("pk_app_config", AppConfig.APP_CONFIG, new OrderField[] { AppConfig.APP_CONFIG.NAME }, true);
        public static Index PK_APP_LOGIN = Internal.createIndex("pk_app_login", AppLogin.APP_LOGIN, new OrderField[] { AppLogin.APP_LOGIN.SERIES }, true);
        public static Index PK_APP_TRANSLATION = Internal.createIndex("pk_app_translation", AppTranslation.APP_TRANSLATION, new OrderField[] { AppTranslation.APP_TRANSLATION.ID }, true);
        public static Index UC_APP_TRANSLATION = Internal.createIndex("uc_app_translation", AppTranslation.APP_TRANSLATION, new OrderField[] { AppTranslation.APP_TRANSLATION.LOCALE, AppTranslation.APP_TRANSLATION.TAG, AppTranslation.APP_TRANSLATION.PROCESS_NAME }, true);
        public static Index PK_APP_USER = Internal.createIndex("pk_app_user", AppUser.APP_USER, new OrderField[] { AppUser.APP_USER.ID }, true);
        public static Index UC_APP_USER_LOGIN = Internal.createIndex("uc_app_user_login", AppUser.APP_USER, new OrderField[] { AppUser.APP_USER.LOGIN }, true);
        public static Index PK_APP_USER_CONFIG = Internal.createIndex("pk_app_user_config", AppUserConfig.APP_USER_CONFIG, new OrderField[] { AppUserConfig.APP_USER_CONFIG.LOGIN }, true);
        public static Index PK_CUSTOMER = Internal.createIndex("pk_customer", Customer.CUSTOMER, new OrderField[] { Customer.CUSTOMER.ID }, true);
        public static Index PK_FOO = Internal.createIndex("pk_foo", Foo.FOO, new OrderField[] { Foo.FOO.ID }, true);
        public static Index FOO_TYPE_NAME_KEY = Internal.createIndex("foo_type_name_key", FooType.FOO_TYPE, new OrderField[] { FooType.FOO_TYPE.NAME }, true);
        public static Index PK_FOO_TYPE = Internal.createIndex("pk_foo_type", FooType.FOO_TYPE, new OrderField[] { FooType.FOO_TYPE.ORDINAL }, true);
        public static Index PK_NODE = Internal.createIndex("pk_node", Node.NODE, new OrderField[] { Node.NODE.ID }, true);
        public static Index UC_NODE_NAME = Internal.createIndex("uc_node_name", Node.NODE, new OrderField[] { Node.NODE.NAME }, true);
        public static Index FKI_ORDER_ORDER_SHIPPING_TYPE = Internal.createIndex("fki_order_order_shipping_type", Order.ORDER, new OrderField[] { Order.ORDER.SHIPPING_TYPE }, false);
        public static Index FKI_ORDER_ORDER_STATUS = Internal.createIndex("fki_order_order_status", Order.ORDER, new OrderField[] { Order.ORDER.STATUS }, false);
        public static Index PK_ORDER = Internal.createIndex("pk_order", Order.ORDER, new OrderField[] { Order.ORDER.ID }, true);
        public static Index PK_ORDER_ITEM = Internal.createIndex("pk_order_item", OrderItem.ORDER_ITEM, new OrderField[] { OrderItem.ORDER_ITEM.ID }, true);
        public static Index ORDER_STATUS_NAME_KEY = Internal.createIndex("order_status_name_key", OrderStatus.ORDER_STATUS, new OrderField[] { OrderStatus.ORDER_STATUS.NAME }, true);
        public static Index PK_ORDER_STATUS = Internal.createIndex("pk_order_status", OrderStatus.ORDER_STATUS, new OrderField[] { OrderStatus.ORDER_STATUS.ORDINAL }, true);
        public static Index PK_PRODUCT = Internal.createIndex("pk_product", Product.PRODUCT, new OrderField[] { Product.PRODUCT.ID }, true);
        public static Index PK_SHIPPING_TYPE = Internal.createIndex("pk_shipping_type", ShippingType.SHIPPING_TYPE, new OrderField[] { ShippingType.SHIPPING_TYPE.ORDINAL }, true);
    }
}
