/*
 * This file is generated by jOOQ.
 */
package de.quinscape.automatontest.domain.tables.pojos;


import de.quinscape.domainql.jooq.GeneratedDomainObject;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.io.Serializable;
import java.math.BigDecimal;
import java.sql.Date;
import java.sql.Timestamp;

import javax.annotation.processing.Generated;


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
public class MetaConfig extends GeneratedDomainObject implements Serializable {

    private static final long serialVersionUID = 1L;

    private String id;
    private String name;
    private String text;
    private Integer num;
    private BigDecimal bigNum;
    private Boolean flag;
    private Timestamp timestamp;
    private Date date;
    private String type;
    private String url;
    private String attachmentId;
    private String corgeTypeId;

    public MetaConfig() {}

    public MetaConfig(MetaConfig value) {
        this.id = value.id;
        this.name = value.name;
        this.text = value.text;
        this.num = value.num;
        this.bigNum = value.bigNum;
        this.flag = value.flag;
        this.timestamp = value.timestamp;
        this.date = value.date;
        this.type = value.type;
        this.url = value.url;
        this.attachmentId = value.attachmentId;
        this.corgeTypeId = value.corgeTypeId;
    }

    public MetaConfig(
        String id,
        String name,
        String text,
        Integer num,
        BigDecimal bigNum,
        Boolean flag,
        Timestamp timestamp,
        Date date,
        String type,
        String url,
        String attachmentId,
        String corgeTypeId
    ) {
        this.id = id;
        this.name = name;
        this.text = text;
        this.num = num;
        this.bigNum = bigNum;
        this.flag = flag;
        this.timestamp = timestamp;
        this.date = date;
        this.type = type;
        this.url = url;
        this.attachmentId = attachmentId;
        this.corgeTypeId = corgeTypeId;
    }

    /**
     * Getter for <code>public.meta_config.id</code>.
     */
    @Id
    @Column(name = "id", nullable = false, length = 36)
    @NotNull
    @Size(max = 36)
    public String getId() {
        return this.id;
    }

    /**
     * Setter for <code>public.meta_config.id</code>.
     */
    public void setId(String id) {
        this.id = id;
    }

    /**
     * Getter for <code>public.meta_config.name</code>.
     */
    @Column(name = "name", nullable = false, length = 100)
    @NotNull
    @Size(max = 100)
    public String getName() {
        return this.name;
    }

    /**
     * Setter for <code>public.meta_config.name</code>.
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Getter for <code>public.meta_config.text</code>.
     */
    @Column(name = "text")
    public String getText() {
        return this.text;
    }

    /**
     * Setter for <code>public.meta_config.text</code>.
     */
    public void setText(String text) {
        this.text = text;
    }

    /**
     * Getter for <code>public.meta_config.num</code>.
     */
    @Column(name = "num")
    public Integer getNum() {
        return this.num;
    }

    /**
     * Setter for <code>public.meta_config.num</code>.
     */
    public void setNum(Integer num) {
        this.num = num;
    }

    /**
     * Getter for <code>public.meta_config.big_num</code>.
     */
    @Column(name = "big_num", precision = 13, scale = 10)
    public BigDecimal getBigNum() {
        return this.bigNum;
    }

    /**
     * Setter for <code>public.meta_config.big_num</code>.
     */
    public void setBigNum(BigDecimal bigNum) {
        this.bigNum = bigNum;
    }

    /**
     * Getter for <code>public.meta_config.flag</code>.
     */
    @Column(name = "flag")
    public Boolean getFlag() {
        return this.flag;
    }

    /**
     * Setter for <code>public.meta_config.flag</code>.
     */
    public void setFlag(Boolean flag) {
        this.flag = flag;
    }

    /**
     * Getter for <code>public.meta_config.timestamp</code>.
     */
    @Column(name = "timestamp", precision = 6)
    public Timestamp getTimestamp() {
        return this.timestamp;
    }

    /**
     * Setter for <code>public.meta_config.timestamp</code>.
     */
    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }

    /**
     * Getter for <code>public.meta_config.date</code>.
     */
    @Column(name = "date")
    public Date getDate() {
        return this.date;
    }

    /**
     * Setter for <code>public.meta_config.date</code>.
     */
    public void setDate(Date date) {
        this.date = date;
    }

    /**
     * Getter for <code>public.meta_config.type</code>.
     */
    @Column(name = "type", length = 100)
    @Size(max = 100)
    public String getType() {
        return this.type;
    }

    /**
     * Setter for <code>public.meta_config.type</code>.
     */
    public void setType(String type) {
        this.type = type;
    }

    /**
     * Getter for <code>public.meta_config.url</code>.
     */
    @Column(name = "url")
    public String getUrl() {
        return this.url;
    }

    /**
     * Setter for <code>public.meta_config.url</code>.
     */
    public void setUrl(String url) {
        this.url = url;
    }

    /**
     * Getter for <code>public.meta_config.attachment_id</code>.
     */
    @Column(name = "attachment_id", length = 36)
    @Size(max = 36)
    public String getAttachmentId() {
        return this.attachmentId;
    }

    /**
     * Setter for <code>public.meta_config.attachment_id</code>.
     */
    public void setAttachmentId(String attachmentId) {
        this.attachmentId = attachmentId;
    }

    /**
     * Getter for <code>public.meta_config.corge_type_id</code>.
     */
    @Column(name = "corge_type_id", length = 36)
    @Size(max = 36)
    public String getCorgeTypeId() {
        return this.corgeTypeId;
    }

    /**
     * Setter for <code>public.meta_config.corge_type_id</code>.
     */
    public void setCorgeTypeId(String corgeTypeId) {
        this.corgeTypeId = corgeTypeId;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        final MetaConfig other = (MetaConfig) obj;
        if (this.id == null) {
            if (other.id != null)
                return false;
        }
        else if (!this.id.equals(other.id))
            return false;
        if (this.name == null) {
            if (other.name != null)
                return false;
        }
        else if (!this.name.equals(other.name))
            return false;
        if (this.text == null) {
            if (other.text != null)
                return false;
        }
        else if (!this.text.equals(other.text))
            return false;
        if (this.num == null) {
            if (other.num != null)
                return false;
        }
        else if (!this.num.equals(other.num))
            return false;
        if (this.bigNum == null) {
            if (other.bigNum != null)
                return false;
        }
        else if (!this.bigNum.equals(other.bigNum))
            return false;
        if (this.flag == null) {
            if (other.flag != null)
                return false;
        }
        else if (!this.flag.equals(other.flag))
            return false;
        if (this.timestamp == null) {
            if (other.timestamp != null)
                return false;
        }
        else if (!this.timestamp.equals(other.timestamp))
            return false;
        if (this.date == null) {
            if (other.date != null)
                return false;
        }
        else if (!this.date.equals(other.date))
            return false;
        if (this.type == null) {
            if (other.type != null)
                return false;
        }
        else if (!this.type.equals(other.type))
            return false;
        if (this.url == null) {
            if (other.url != null)
                return false;
        }
        else if (!this.url.equals(other.url))
            return false;
        if (this.attachmentId == null) {
            if (other.attachmentId != null)
                return false;
        }
        else if (!this.attachmentId.equals(other.attachmentId))
            return false;
        if (this.corgeTypeId == null) {
            if (other.corgeTypeId != null)
                return false;
        }
        else if (!this.corgeTypeId.equals(other.corgeTypeId))
            return false;
        return true;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((this.id == null) ? 0 : this.id.hashCode());
        result = prime * result + ((this.name == null) ? 0 : this.name.hashCode());
        result = prime * result + ((this.text == null) ? 0 : this.text.hashCode());
        result = prime * result + ((this.num == null) ? 0 : this.num.hashCode());
        result = prime * result + ((this.bigNum == null) ? 0 : this.bigNum.hashCode());
        result = prime * result + ((this.flag == null) ? 0 : this.flag.hashCode());
        result = prime * result + ((this.timestamp == null) ? 0 : this.timestamp.hashCode());
        result = prime * result + ((this.date == null) ? 0 : this.date.hashCode());
        result = prime * result + ((this.type == null) ? 0 : this.type.hashCode());
        result = prime * result + ((this.url == null) ? 0 : this.url.hashCode());
        result = prime * result + ((this.attachmentId == null) ? 0 : this.attachmentId.hashCode());
        result = prime * result + ((this.corgeTypeId == null) ? 0 : this.corgeTypeId.hashCode());
        return result;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder("MetaConfig (");

        sb.append(id);
        sb.append(", ").append(name);
        sb.append(", ").append(text);
        sb.append(", ").append(num);
        sb.append(", ").append(bigNum);
        sb.append(", ").append(flag);
        sb.append(", ").append(timestamp);
        sb.append(", ").append(date);
        sb.append(", ").append(type);
        sb.append(", ").append(url);
        sb.append(", ").append(attachmentId);
        sb.append(", ").append(corgeTypeId);

        sb.append(")");
        return sb.toString();
    }
}
