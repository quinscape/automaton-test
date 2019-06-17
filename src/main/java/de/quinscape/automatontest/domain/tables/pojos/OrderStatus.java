/*
 * This file is generated by jOOQ.
*/
package de.quinscape.automatontest.domain.tables.pojos;


import de.quinscape.domainql.jooq.GeneratedDomainObject;

import java.io.Serializable;

import javax.annotation.Generated;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;


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
@Entity
@Table(name = "order_status", schema = "public", indexes = {
    @Index(name = "order_status_name_key", unique = true, columnList = "name ASC"),
    @Index(name = "pk_order_status", unique = true, columnList = "ordinal ASC")
})
public class OrderStatus extends GeneratedDomainObject implements Serializable {

    private static final long serialVersionUID = -1989050280;

    private Integer ordinal;
    private String  name;

    public OrderStatus() {}

    public OrderStatus(OrderStatus value) {
        this.ordinal = value.ordinal;
        this.name = value.name;
    }

    public OrderStatus(
        Integer ordinal,
        String  name
    ) {
        this.ordinal = ordinal;
        this.name = name;
    }

    @Id
    @Column(name = "ordinal", unique = true, nullable = false, precision = 32)
    @NotNull
    public Integer getOrdinal() {
        return this.ordinal;
    }

    public void setOrdinal(Integer ordinal) {
        this.ordinal = ordinal;
    }

    @Column(name = "name", unique = true, nullable = false, length = 36)
    @NotNull
    @Size(max = 36)
    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder("OrderStatus (");

        sb.append(ordinal);
        sb.append(", ").append(name);

        sb.append(")");
        return sb.toString();
    }
}
