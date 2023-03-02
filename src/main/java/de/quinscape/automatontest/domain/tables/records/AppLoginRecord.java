/*
 * This file is generated by jOOQ.
 */
package de.quinscape.automatontest.domain.tables.records;


import de.quinscape.automatontest.domain.tables.AppLogin;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.sql.Timestamp;

import javax.annotation.processing.Generated;

import org.jooq.Field;
import org.jooq.Record1;
import org.jooq.Record4;
import org.jooq.Row4;
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
    name = "app_login",
    schema = "public"
)
public class AppLoginRecord extends UpdatableRecordImpl<AppLoginRecord> implements Record4<String, String, String, Timestamp> {

    private static final long serialVersionUID = 1L;

    /**
     * Setter for <code>public.app_login.username</code>.
     */
    public void setUsername(String value) {
        set(0, value);
    }

    /**
     * Getter for <code>public.app_login.username</code>.
     */
    @Column(name = "username", nullable = false, length = 64)
    @NotNull
    @Size(max = 64)
    public String getUsername() {
        return (String) get(0);
    }

    /**
     * Setter for <code>public.app_login.series</code>.
     */
    public void setSeries(String value) {
        set(1, value);
    }

    /**
     * Getter for <code>public.app_login.series</code>.
     */
    @Id
    @Column(name = "series", nullable = false, length = 64)
    @NotNull
    @Size(max = 64)
    public String getSeries() {
        return (String) get(1);
    }

    /**
     * Setter for <code>public.app_login.token</code>.
     */
    public void setToken(String value) {
        set(2, value);
    }

    /**
     * Getter for <code>public.app_login.token</code>.
     */
    @Column(name = "token", nullable = false, length = 64)
    @NotNull
    @Size(max = 64)
    public String getToken() {
        return (String) get(2);
    }

    /**
     * Setter for <code>public.app_login.last_used</code>.
     */
    public void setLastUsed(Timestamp value) {
        set(3, value);
    }

    /**
     * Getter for <code>public.app_login.last_used</code>.
     */
    @Column(name = "last_used", nullable = false, precision = 6)
    @NotNull
    public Timestamp getLastUsed() {
        return (Timestamp) get(3);
    }

    // -------------------------------------------------------------------------
    // Primary key information
    // -------------------------------------------------------------------------

    @Override
    public Record1<String> key() {
        return (Record1) super.key();
    }

    // -------------------------------------------------------------------------
    // Record4 type implementation
    // -------------------------------------------------------------------------

    @Override
    public Row4<String, String, String, Timestamp> fieldsRow() {
        return (Row4) super.fieldsRow();
    }

    @Override
    public Row4<String, String, String, Timestamp> valuesRow() {
        return (Row4) super.valuesRow();
    }

    @Override
    public Field<String> field1() {
        return AppLogin.APP_LOGIN.USERNAME;
    }

    @Override
    public Field<String> field2() {
        return AppLogin.APP_LOGIN.SERIES;
    }

    @Override
    public Field<String> field3() {
        return AppLogin.APP_LOGIN.TOKEN;
    }

    @Override
    public Field<Timestamp> field4() {
        return AppLogin.APP_LOGIN.LAST_USED;
    }

    @Override
    public String component1() {
        return getUsername();
    }

    @Override
    public String component2() {
        return getSeries();
    }

    @Override
    public String component3() {
        return getToken();
    }

    @Override
    public Timestamp component4() {
        return getLastUsed();
    }

    @Override
    public String value1() {
        return getUsername();
    }

    @Override
    public String value2() {
        return getSeries();
    }

    @Override
    public String value3() {
        return getToken();
    }

    @Override
    public Timestamp value4() {
        return getLastUsed();
    }

    @Override
    public AppLoginRecord value1(String value) {
        setUsername(value);
        return this;
    }

    @Override
    public AppLoginRecord value2(String value) {
        setSeries(value);
        return this;
    }

    @Override
    public AppLoginRecord value3(String value) {
        setToken(value);
        return this;
    }

    @Override
    public AppLoginRecord value4(Timestamp value) {
        setLastUsed(value);
        return this;
    }

    @Override
    public AppLoginRecord values(String value1, String value2, String value3, Timestamp value4) {
        value1(value1);
        value2(value2);
        value3(value3);
        value4(value4);
        return this;
    }

    // -------------------------------------------------------------------------
    // Constructors
    // -------------------------------------------------------------------------

    /**
     * Create a detached AppLoginRecord
     */
    public AppLoginRecord() {
        super(AppLogin.APP_LOGIN);
    }

    /**
     * Create a detached, initialised AppLoginRecord
     */
    public AppLoginRecord(String username, String series, String token, Timestamp lastUsed) {
        super(AppLogin.APP_LOGIN);

        setUsername(username);
        setSeries(series);
        setToken(token);
        setLastUsed(lastUsed);
    }

    /**
     * Create a detached, initialised AppLoginRecord
     */
    public AppLoginRecord(de.quinscape.automatontest.domain.tables.pojos.AppLogin value) {
        super(AppLogin.APP_LOGIN);

        if (value != null) {
            setUsername(value.getUsername());
            setSeries(value.getSeries());
            setToken(value.getToken());
            setLastUsed(value.getLastUsed());
        }
    }
}
