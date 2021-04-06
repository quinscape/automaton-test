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
@Table(name = "qux_main", schema = "public", indexes = {
    @Index(name = "pk_qux_main", unique = true, columnList = "id ASC")
})
public class QuxMain extends GeneratedDomainObject implements Serializable {

    private static final long serialVersionUID = -1511097233;

    private String id;
    private String name;
    private String quxAId;
    private String quxBName;
    private String quxCId1;
    private String quxCId2;
    private String quxDId;
    private String quxD2Id;
    private String quxD3Id;
    private String quxD4Id;

    public QuxMain() {}

    public QuxMain(QuxMain value) {
        this.id = value.id;
        this.name = value.name;
        this.quxAId = value.quxAId;
        this.quxBName = value.quxBName;
        this.quxCId1 = value.quxCId1;
        this.quxCId2 = value.quxCId2;
        this.quxDId = value.quxDId;
        this.quxD2Id = value.quxD2Id;
        this.quxD3Id = value.quxD3Id;
        this.quxD4Id = value.quxD4Id;
    }

    public QuxMain(
        String id,
        String name,
        String quxAId,
        String quxBName,
        String quxCId1,
        String quxCId2,
        String quxDId,
        String quxD2Id,
        String quxD3Id,
        String quxD4Id
    ) {
        this.id = id;
        this.name = name;
        this.quxAId = quxAId;
        this.quxBName = quxBName;
        this.quxCId1 = quxCId1;
        this.quxCId2 = quxCId2;
        this.quxDId = quxDId;
        this.quxD2Id = quxD2Id;
        this.quxD3Id = quxD3Id;
        this.quxD4Id = quxD4Id;
    }

    @Id
    @Column(name = "id", unique = true, nullable = false, length = 36)
    @NotNull
    @Size(max = 36)
    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Column(name = "name", nullable = false, length = 100)
    @NotNull
    @Size(max = 100)
    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Column(name = "qux_a_id", nullable = false, length = 36)
    @NotNull
    @Size(max = 36)
    public String getQuxAId() {
        return this.quxAId;
    }

    public void setQuxAId(String quxAId) {
        this.quxAId = quxAId;
    }

    @Column(name = "qux_b_name", length = 100)
    @Size(max = 100)
    public String getQuxBName() {
        return this.quxBName;
    }

    public void setQuxBName(String quxBName) {
        this.quxBName = quxBName;
    }

    @Column(name = "qux_c_id1", nullable = false, length = 36)
    @NotNull
    @Size(max = 36)
    public String getQuxCId1() {
        return this.quxCId1;
    }

    public void setQuxCId1(String quxCId1) {
        this.quxCId1 = quxCId1;
    }

    @Column(name = "qux_c_id2", length = 36)
    @Size(max = 36)
    public String getQuxCId2() {
        return this.quxCId2;
    }

    public void setQuxCId2(String quxCId2) {
        this.quxCId2 = quxCId2;
    }

    @Column(name = "qux_d_id", length = 36)
    @Size(max = 36)
    public String getQuxDId() {
        return this.quxDId;
    }

    public void setQuxDId(String quxDId) {
        this.quxDId = quxDId;
    }

    @Column(name = "qux_d2_id", length = 36)
    @Size(max = 36)
    public String getQuxD2Id() {
        return this.quxD2Id;
    }

    public void setQuxD2Id(String quxD2Id) {
        this.quxD2Id = quxD2Id;
    }

    @Column(name = "qux_d3_id", length = 36)
    @Size(max = 36)
    public String getQuxD3Id() {
        return this.quxD3Id;
    }

    public void setQuxD3Id(String quxD3Id) {
        this.quxD3Id = quxD3Id;
    }

    @Column(name = "qux_d4_id", length = 36)
    @Size(max = 36)
    public String getQuxD4Id() {
        return this.quxD4Id;
    }

    public void setQuxD4Id(String quxD4Id) {
        this.quxD4Id = quxD4Id;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder("QuxMain (");

        sb.append(id);
        sb.append(", ").append(name);
        sb.append(", ").append(quxAId);
        sb.append(", ").append(quxBName);
        sb.append(", ").append(quxCId1);
        sb.append(", ").append(quxCId2);
        sb.append(", ").append(quxDId);
        sb.append(", ").append(quxD2Id);
        sb.append(", ").append(quxD3Id);
        sb.append(", ").append(quxD4Id);

        sb.append(")");
        return sb.toString();
    }
}
