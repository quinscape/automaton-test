/*
 * This file is generated by jOOQ.
 */
package de.quinscape.automatontest.domain.tables.records;


import de.quinscape.automatontest.domain.tables.AppUserConfig;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import javax.annotation.processing.Generated;

import org.jooq.Field;
import org.jooq.Record1;
import org.jooq.Record3;
import org.jooq.Row3;
import org.jooq.impl.UpdatableRecordImpl;


/**
 * This class is generated by jOOQ.
 */
@Generated(
    value = {
        "https://www.jooq.org",
        "jOOQ version:3.17.7"
    },
    comments = "This class is generated by jOOQ"
)
@SuppressWarnings({ "all", "unchecked", "rawtypes" })
@Entity
@Table(
    name = "app_user_config",
    schema = "public"
)
public class AppUserConfigRecord extends UpdatableRecordImpl<AppUserConfigRecord> implements Record3<String, String, String> {

    private static final long serialVersionUID = 1L;

    /**
     * Setter for <code>public.app_user_config.login</code>.
     */
    public void setLogin(String value) {
        set(0, value);
    }

    /**
     * Getter for <code>public.app_user_config.login</code>.
     */
    @Id
    @Column(name = "login", nullable = false, length = 64)
    @NotNull
    @Size(max = 64)
    public String getLogin() {
        return (String) get(0);
    }

    /**
     * Setter for <code>public.app_user_config.user_id</code>.
     */
    public void setUserId(String value) {
        set(1, value);
    }

    /**
     * Getter for <code>public.app_user_config.user_id</code>.
     */
    @Column(name = "user_id", nullable = false, length = 36)
    @NotNull
    @Size(max = 36)
    public String getUserId() {
        return (String) get(1);
    }

    /**
     * Setter for <code>public.app_user_config.attachment_id</code>.
     */
    public void setAttachmentId(String value) {
        set(2, value);
    }

    /**
     * Getter for <code>public.app_user_config.attachment_id</code>.
     */
    @Column(name = "attachment_id", nullable = false, length = 36)
    @NotNull
    @Size(max = 36)
    public String getAttachmentId() {
        return (String) get(2);
    }

    // -------------------------------------------------------------------------
    // Primary key information
    // -------------------------------------------------------------------------

    @Override
    public Record1<String> key() {
        return (Record1) super.key();
    }

    // -------------------------------------------------------------------------
    // Record3 type implementation
    // -------------------------------------------------------------------------

    @Override
    public Row3<String, String, String> fieldsRow() {
        return (Row3) super.fieldsRow();
    }

    @Override
    public Row3<String, String, String> valuesRow() {
        return (Row3) super.valuesRow();
    }

    @Override
    public Field<String> field1() {
        return AppUserConfig.APP_USER_CONFIG.LOGIN;
    }

    @Override
    public Field<String> field2() {
        return AppUserConfig.APP_USER_CONFIG.USER_ID;
    }

    @Override
    public Field<String> field3() {
        return AppUserConfig.APP_USER_CONFIG.ATTACHMENT_ID;
    }

    @Override
    public String component1() {
        return getLogin();
    }

    @Override
    public String component2() {
        return getUserId();
    }

    @Override
    public String component3() {
        return getAttachmentId();
    }

    @Override
    public String value1() {
        return getLogin();
    }

    @Override
    public String value2() {
        return getUserId();
    }

    @Override
    public String value3() {
        return getAttachmentId();
    }

    @Override
    public AppUserConfigRecord value1(String value) {
        setLogin(value);
        return this;
    }

    @Override
    public AppUserConfigRecord value2(String value) {
        setUserId(value);
        return this;
    }

    @Override
    public AppUserConfigRecord value3(String value) {
        setAttachmentId(value);
        return this;
    }

    @Override
    public AppUserConfigRecord values(String value1, String value2, String value3) {
        value1(value1);
        value2(value2);
        value3(value3);
        return this;
    }

    // -------------------------------------------------------------------------
    // Constructors
    // -------------------------------------------------------------------------

    /**
     * Create a detached AppUserConfigRecord
     */
    public AppUserConfigRecord() {
        super(AppUserConfig.APP_USER_CONFIG);
    }

    /**
     * Create a detached, initialised AppUserConfigRecord
     */
    public AppUserConfigRecord(String login, String userId, String attachmentId) {
        super(AppUserConfig.APP_USER_CONFIG);

        setLogin(login);
        setUserId(userId);
        setAttachmentId(attachmentId);
    }

    /**
     * Create a detached, initialised AppUserConfigRecord
     */
    public AppUserConfigRecord(de.quinscape.automatontest.domain.tables.pojos.AppUserConfig value) {
        super(AppUserConfig.APP_USER_CONFIG);

        if (value != null) {
            setLogin(value.getLogin());
            setUserId(value.getUserId());
            setAttachmentId(value.getAttachmentId());
        }
    }
}
