/*
 * This file is generated by jOOQ.
*/
package de.quinscape.automatontest.domain.tables.records;


import de.quinscape.automatontest.domain.tables.Customer;

import javax.annotation.Generated;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.jooq.Field;
import org.jooq.Record1;
import org.jooq.Record6;
import org.jooq.Row6;
import org.jooq.impl.UpdatableRecordImpl;


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
@Table(name = "customer", schema = "public", indexes = {
    @Index(name = "pk_customer", unique = true, columnList = "id ASC")
})
public class CustomerRecord extends UpdatableRecordImpl<CustomerRecord> implements Record6<String, String, String, String, String, String> {

    private static final long serialVersionUID = 983461059;

    /**
     * Setter for <code>public.customer.id</code>.
     */
    public void setId(String value) {
        set(0, value);
    }

    /**
     * Getter for <code>public.customer.id</code>.
     */
    @Id
    @Column(name = "id", unique = true, nullable = false, length = 36)
    @NotNull
    @Size(max = 36)
    public String getId() {
        return (String) get(0);
    }

    /**
     * Setter for <code>public.customer.salutation</code>.
     */
    public void setSalutation(String value) {
        set(1, value);
    }

    /**
     * Getter for <code>public.customer.salutation</code>.
     */
    @Column(name = "salutation", length = 50)
    @Size(max = 50)
    public String getSalutation() {
        return (String) get(1);
    }

    /**
     * Setter for <code>public.customer.number</code>.
     */
    public void setNumber(String value) {
        set(2, value);
    }

    /**
     * Getter for <code>public.customer.number</code>.
     */
    @Column(name = "number", nullable = false, length = 36)
    @NotNull
    @Size(max = 36)
    public String getNumber() {
        return (String) get(2);
    }

    /**
     * Setter for <code>public.customer.name</code>.
     */
    public void setName(String value) {
        set(3, value);
    }

    /**
     * Getter for <code>public.customer.name</code>.
     */
    @Column(name = "name", nullable = false, length = 120)
    @NotNull
    @Size(max = 120)
    public String getName() {
        return (String) get(3);
    }

    /**
     * Setter for <code>public.customer.billing_address_id</code>.
     */
    public void setBillingAddressId(String value) {
        set(4, value);
    }

    /**
     * Getter for <code>public.customer.billing_address_id</code>.
     */
    @Column(name = "billing_address_id", nullable = false, length = 36)
    @NotNull
    @Size(max = 36)
    public String getBillingAddressId() {
        return (String) get(4);
    }

    /**
     * Setter for <code>public.customer.delivery_address_id</code>.
     */
    public void setDeliveryAddressId(String value) {
        set(5, value);
    }

    /**
     * Getter for <code>public.customer.delivery_address_id</code>.
     */
    @Column(name = "delivery_address_id", length = 36)
    @Size(max = 36)
    public String getDeliveryAddressId() {
        return (String) get(5);
    }

    // -------------------------------------------------------------------------
    // Primary key information
    // -------------------------------------------------------------------------

    /**
     * {@inheritDoc}
     */
    @Override
    public Record1<String> key() {
        return (Record1) super.key();
    }

    // -------------------------------------------------------------------------
    // Record6 type implementation
    // -------------------------------------------------------------------------

    /**
     * {@inheritDoc}
     */
    @Override
    public Row6<String, String, String, String, String, String> fieldsRow() {
        return (Row6) super.fieldsRow();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Row6<String, String, String, String, String, String> valuesRow() {
        return (Row6) super.valuesRow();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field1() {
        return Customer.CUSTOMER.ID;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field2() {
        return Customer.CUSTOMER.SALUTATION;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field3() {
        return Customer.CUSTOMER.NUMBER;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field4() {
        return Customer.CUSTOMER.NAME;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field5() {
        return Customer.CUSTOMER.BILLING_ADDRESS_ID;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field6() {
        return Customer.CUSTOMER.DELIVERY_ADDRESS_ID;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String component1() {
        return getId();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String component2() {
        return getSalutation();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String component3() {
        return getNumber();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String component4() {
        return getName();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String component5() {
        return getBillingAddressId();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String component6() {
        return getDeliveryAddressId();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String value1() {
        return getId();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String value2() {
        return getSalutation();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String value3() {
        return getNumber();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String value4() {
        return getName();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String value5() {
        return getBillingAddressId();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String value6() {
        return getDeliveryAddressId();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public CustomerRecord value1(String value) {
        setId(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public CustomerRecord value2(String value) {
        setSalutation(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public CustomerRecord value3(String value) {
        setNumber(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public CustomerRecord value4(String value) {
        setName(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public CustomerRecord value5(String value) {
        setBillingAddressId(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public CustomerRecord value6(String value) {
        setDeliveryAddressId(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public CustomerRecord values(String value1, String value2, String value3, String value4, String value5, String value6) {
        value1(value1);
        value2(value2);
        value3(value3);
        value4(value4);
        value5(value5);
        value6(value6);
        return this;
    }

    // -------------------------------------------------------------------------
    // Constructors
    // -------------------------------------------------------------------------

    /**
     * Create a detached CustomerRecord
     */
    public CustomerRecord() {
        super(Customer.CUSTOMER);
    }

    /**
     * Create a detached, initialised CustomerRecord
     */
    public CustomerRecord(String id, String salutation, String number, String name, String billingAddressId, String deliveryAddressId) {
        super(Customer.CUSTOMER);

        set(0, id);
        set(1, salutation);
        set(2, number);
        set(3, name);
        set(4, billingAddressId);
        set(5, deliveryAddressId);
    }
}
