/*
 * This file is generated by jOOQ.
 */
package de.quinscape.automatontest.domain.tables.records;


import de.quinscape.automatontest.domain.tables.MetaConfig;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.sql.Date;
import java.sql.Timestamp;

import javax.annotation.processing.Generated;

import org.jooq.Field;
import org.jooq.Record1;
import org.jooq.Record12;
import org.jooq.Row12;
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
    name = "meta_config",
    schema = "public"
)
public class MetaConfigRecord extends UpdatableRecordImpl<MetaConfigRecord> implements Record12<String, String, String, Integer, BigDecimal, Boolean, Timestamp, Date, String, String, String, String> {

    private static final long serialVersionUID = 1L;

    /**
     * Setter for <code>public.meta_config.id</code>.
     */
    public void setId(String value) {
        set(0, value);
    }

    /**
     * Getter for <code>public.meta_config.id</code>.
     */
    @Id
    @Column(name = "id", nullable = false, length = 36)
    @NotNull
    @Size(max = 36)
    public String getId() {
        return (String) get(0);
    }

    /**
     * Setter for <code>public.meta_config.name</code>.
     */
    public void setName(String value) {
        set(1, value);
    }

    /**
     * Getter for <code>public.meta_config.name</code>.
     */
    @Column(name = "name", nullable = false, length = 100)
    @NotNull
    @Size(max = 100)
    public String getName() {
        return (String) get(1);
    }

    /**
     * Setter for <code>public.meta_config.text</code>.
     */
    public void setText(String value) {
        set(2, value);
    }

    /**
     * Getter for <code>public.meta_config.text</code>.
     */
    @Column(name = "text")
    public String getText() {
        return (String) get(2);
    }

    /**
     * Setter for <code>public.meta_config.num</code>.
     */
    public void setNum(Integer value) {
        set(3, value);
    }

    /**
     * Getter for <code>public.meta_config.num</code>.
     */
    @Column(name = "num")
    public Integer getNum() {
        return (Integer) get(3);
    }

    /**
     * Setter for <code>public.meta_config.big_num</code>.
     */
    public void setBigNum(BigDecimal value) {
        set(4, value);
    }

    /**
     * Getter for <code>public.meta_config.big_num</code>.
     */
    @Column(name = "big_num", precision = 13, scale = 10)
    public BigDecimal getBigNum() {
        return (BigDecimal) get(4);
    }

    /**
     * Setter for <code>public.meta_config.flag</code>.
     */
    public void setFlag(Boolean value) {
        set(5, value);
    }

    /**
     * Getter for <code>public.meta_config.flag</code>.
     */
    @Column(name = "flag")
    public Boolean getFlag() {
        return (Boolean) get(5);
    }

    /**
     * Setter for <code>public.meta_config.timestamp</code>.
     */
    public void setTimestamp(Timestamp value) {
        set(6, value);
    }

    /**
     * Getter for <code>public.meta_config.timestamp</code>.
     */
    @Column(name = "timestamp", precision = 6)
    public Timestamp getTimestamp() {
        return (Timestamp) get(6);
    }

    /**
     * Setter for <code>public.meta_config.date</code>.
     */
    public void setDate(Date value) {
        set(7, value);
    }

    /**
     * Getter for <code>public.meta_config.date</code>.
     */
    @Column(name = "date")
    public Date getDate() {
        return (Date) get(7);
    }

    /**
     * Setter for <code>public.meta_config.type</code>.
     */
    public void setType(String value) {
        set(8, value);
    }

    /**
     * Getter for <code>public.meta_config.type</code>.
     */
    @Column(name = "type", length = 100)
    @Size(max = 100)
    public String getType() {
        return (String) get(8);
    }

    /**
     * Setter for <code>public.meta_config.url</code>.
     */
    public void setUrl(String value) {
        set(9, value);
    }

    /**
     * Getter for <code>public.meta_config.url</code>.
     */
    @Column(name = "url")
    public String getUrl() {
        return (String) get(9);
    }

    /**
     * Setter for <code>public.meta_config.attachment_id</code>.
     */
    public void setAttachmentId(String value) {
        set(10, value);
    }

    /**
     * Getter for <code>public.meta_config.attachment_id</code>.
     */
    @Column(name = "attachment_id", length = 36)
    @Size(max = 36)
    public String getAttachmentId() {
        return (String) get(10);
    }

    /**
     * Setter for <code>public.meta_config.corge_type_id</code>.
     */
    public void setCorgeTypeId(String value) {
        set(11, value);
    }

    /**
     * Getter for <code>public.meta_config.corge_type_id</code>.
     */
    @Column(name = "corge_type_id", length = 36)
    @Size(max = 36)
    public String getCorgeTypeId() {
        return (String) get(11);
    }

    // -------------------------------------------------------------------------
    // Primary key information
    // -------------------------------------------------------------------------

    @Override
    public Record1<String> key() {
        return (Record1) super.key();
    }

    // -------------------------------------------------------------------------
    // Record12 type implementation
    // -------------------------------------------------------------------------

    @Override
    public Row12<String, String, String, Integer, BigDecimal, Boolean, Timestamp, Date, String, String, String, String> fieldsRow() {
        return (Row12) super.fieldsRow();
    }

    @Override
    public Row12<String, String, String, Integer, BigDecimal, Boolean, Timestamp, Date, String, String, String, String> valuesRow() {
        return (Row12) super.valuesRow();
    }

    @Override
    public Field<String> field1() {
        return MetaConfig.META_CONFIG.ID;
    }

    @Override
    public Field<String> field2() {
        return MetaConfig.META_CONFIG.NAME;
    }

    @Override
    public Field<String> field3() {
        return MetaConfig.META_CONFIG.TEXT;
    }

    @Override
    public Field<Integer> field4() {
        return MetaConfig.META_CONFIG.NUM;
    }

    @Override
    public Field<BigDecimal> field5() {
        return MetaConfig.META_CONFIG.BIG_NUM;
    }

    @Override
    public Field<Boolean> field6() {
        return MetaConfig.META_CONFIG.FLAG;
    }

    @Override
    public Field<Timestamp> field7() {
        return MetaConfig.META_CONFIG.TIMESTAMP;
    }

    @Override
    public Field<Date> field8() {
        return MetaConfig.META_CONFIG.DATE;
    }

    @Override
    public Field<String> field9() {
        return MetaConfig.META_CONFIG.TYPE;
    }

    @Override
    public Field<String> field10() {
        return MetaConfig.META_CONFIG.URL;
    }

    @Override
    public Field<String> field11() {
        return MetaConfig.META_CONFIG.ATTACHMENT_ID;
    }

    @Override
    public Field<String> field12() {
        return MetaConfig.META_CONFIG.CORGE_TYPE_ID;
    }

    @Override
    public String component1() {
        return getId();
    }

    @Override
    public String component2() {
        return getName();
    }

    @Override
    public String component3() {
        return getText();
    }

    @Override
    public Integer component4() {
        return getNum();
    }

    @Override
    public BigDecimal component5() {
        return getBigNum();
    }

    @Override
    public Boolean component6() {
        return getFlag();
    }

    @Override
    public Timestamp component7() {
        return getTimestamp();
    }

    @Override
    public Date component8() {
        return getDate();
    }

    @Override
    public String component9() {
        return getType();
    }

    @Override
    public String component10() {
        return getUrl();
    }

    @Override
    public String component11() {
        return getAttachmentId();
    }

    @Override
    public String component12() {
        return getCorgeTypeId();
    }

    @Override
    public String value1() {
        return getId();
    }

    @Override
    public String value2() {
        return getName();
    }

    @Override
    public String value3() {
        return getText();
    }

    @Override
    public Integer value4() {
        return getNum();
    }

    @Override
    public BigDecimal value5() {
        return getBigNum();
    }

    @Override
    public Boolean value6() {
        return getFlag();
    }

    @Override
    public Timestamp value7() {
        return getTimestamp();
    }

    @Override
    public Date value8() {
        return getDate();
    }

    @Override
    public String value9() {
        return getType();
    }

    @Override
    public String value10() {
        return getUrl();
    }

    @Override
    public String value11() {
        return getAttachmentId();
    }

    @Override
    public String value12() {
        return getCorgeTypeId();
    }

    @Override
    public MetaConfigRecord value1(String value) {
        setId(value);
        return this;
    }

    @Override
    public MetaConfigRecord value2(String value) {
        setName(value);
        return this;
    }

    @Override
    public MetaConfigRecord value3(String value) {
        setText(value);
        return this;
    }

    @Override
    public MetaConfigRecord value4(Integer value) {
        setNum(value);
        return this;
    }

    @Override
    public MetaConfigRecord value5(BigDecimal value) {
        setBigNum(value);
        return this;
    }

    @Override
    public MetaConfigRecord value6(Boolean value) {
        setFlag(value);
        return this;
    }

    @Override
    public MetaConfigRecord value7(Timestamp value) {
        setTimestamp(value);
        return this;
    }

    @Override
    public MetaConfigRecord value8(Date value) {
        setDate(value);
        return this;
    }

    @Override
    public MetaConfigRecord value9(String value) {
        setType(value);
        return this;
    }

    @Override
    public MetaConfigRecord value10(String value) {
        setUrl(value);
        return this;
    }

    @Override
    public MetaConfigRecord value11(String value) {
        setAttachmentId(value);
        return this;
    }

    @Override
    public MetaConfigRecord value12(String value) {
        setCorgeTypeId(value);
        return this;
    }

    @Override
    public MetaConfigRecord values(String value1, String value2, String value3, Integer value4, BigDecimal value5, Boolean value6, Timestamp value7, Date value8, String value9, String value10, String value11, String value12) {
        value1(value1);
        value2(value2);
        value3(value3);
        value4(value4);
        value5(value5);
        value6(value6);
        value7(value7);
        value8(value8);
        value9(value9);
        value10(value10);
        value11(value11);
        value12(value12);
        return this;
    }

    // -------------------------------------------------------------------------
    // Constructors
    // -------------------------------------------------------------------------

    /**
     * Create a detached MetaConfigRecord
     */
    public MetaConfigRecord() {
        super(MetaConfig.META_CONFIG);
    }

    /**
     * Create a detached, initialised MetaConfigRecord
     */
    public MetaConfigRecord(String id, String name, String text, Integer num, BigDecimal bigNum, Boolean flag, Timestamp timestamp, Date date, String type, String url, String attachmentId, String corgeTypeId) {
        super(MetaConfig.META_CONFIG);

        setId(id);
        setName(name);
        setText(text);
        setNum(num);
        setBigNum(bigNum);
        setFlag(flag);
        setTimestamp(timestamp);
        setDate(date);
        setType(type);
        setUrl(url);
        setAttachmentId(attachmentId);
        setCorgeTypeId(corgeTypeId);
    }

    /**
     * Create a detached, initialised MetaConfigRecord
     */
    public MetaConfigRecord(de.quinscape.automatontest.domain.tables.pojos.MetaConfig value) {
        super(MetaConfig.META_CONFIG);

        if (value != null) {
            setId(value.getId());
            setName(value.getName());
            setText(value.getText());
            setNum(value.getNum());
            setBigNum(value.getBigNum());
            setFlag(value.getFlag());
            setTimestamp(value.getTimestamp());
            setDate(value.getDate());
            setType(value.getType());
            setUrl(value.getUrl());
            setAttachmentId(value.getAttachmentId());
            setCorgeTypeId(value.getCorgeTypeId());
        }
    }
}
