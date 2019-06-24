package de.quinscape.automatontest.model;

import de.quinscape.domainql.jooq.GeneratedDomainObject;

import javax.persistence.Column;
import javax.persistence.Table;

@Table(name = "sum_per_month")
public class SumPerMonth
    extends GeneratedDomainObject
{
    private int month;
    private int year;
    private int sum;


    @Column(name = "month")
    public int getMonth()
    {
        return month;
    }


    public void setMonth(int month)
    {
        this.month = month;
    }


    @Column(name = "year")
    public int getYear()
    {
        return year;
    }


    public void setYear(int year)
    {
        this.year = year;
    }


    @Column(name = "sum")
    public int getSum()
    {
        return sum;
    }


    public void setSum(int sum)
    {
        this.sum = sum;
    }
}
