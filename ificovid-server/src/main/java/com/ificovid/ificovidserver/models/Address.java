package com.ificovid.ificovidserver.models;

import javax.persistence.*;

@Entity
@Table(name = "address")
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "street")
    private String street;
    @Column(name = "ward")
    private String ward;
    @Column(name = "district")
    private String district;
    @Column(name = "city")
    private String city;


    public Address() {
    }

    /**
     * @param street   This is street part in patient's address
     * @param ward     This is ward/commune part in patient's address
     * @param district This is district part in patient's address
     * @param city     This is city/province part in patient's address
     */
    public Address(String street, String ward, String district, String city) {
        this.street = street;
        this.ward = ward;
        this.district = district;
        this.city = city;
    }

    public String getStreet() {
        return this.street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getWard() {
        return this.ward;
    }

    public void setWard(String ward) {
        this.ward = ward;
    }

    public String getDistrict() {
        return this.district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getCity() {
        return this.city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String toJson() {
        return "{" + " \"street\":\"" + getStreet() + "\"" + ", \"ward\":\"" + getWard() + "\"" + ", \"district\":\""
                + getDistrict() + "\"" + ", \"city\":\"" + getCity() + "\"" + "}";
    }

    /**
     * This method creates short string of address, pattern: street, ward, district, city
     *
     * @return String This return a string of shortened address of patient
     */
    @Override
    public String toString() {
        return getStreet() + ", " + getWard() + ", " + getDistrict() + ", " + getCity();
    }

}
