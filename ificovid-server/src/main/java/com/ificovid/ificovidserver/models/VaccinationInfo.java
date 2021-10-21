package com.ificovid.ificovidserver.models;

import javax.persistence.*;
import java.time.LocalDate;

/**
 * This class stores patient's vaccination info, includes 2 injections info: vaccine name, vaccine no, injection
 * date, injection place
 */

@Entity
@Table(name = "vaccination")
public class VaccinationInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "vaccine_name")
    private String vaccineName;
    @Column(name = "vaccine_no")
    private String vaccineNo;
    @Column(name = "injection_place")
    private String injectionPlace;
    @Column(name = "injection_number")
    private String injectionNumber;
    @Column(name = "injection_date")
    private LocalDate injectionDate;

    /**
     * This method instantiate an instance of VaccinationInfo class
     *
     * @param vaccineName     This is injection's vaccine name (Eg: Astra Zeneca, Pfizer,...)
     * @param vaccineNo       This is injection's vaccine no/number/# (Eg: A1053, etc)
     * @param injectionPlace  This is injection's place
     * @param injectionNumber This is injection's number (#1, #2)
     * @param injectionDate   This is injection's date (yyyy-mm-dd)
     */
    public VaccinationInfo(String vaccineName, String vaccineNo, String injectionPlace, String injectionNumber,
                           LocalDate injectionDate) {
        this.vaccineName = vaccineName;
        this.vaccineNo = vaccineNo;
        this.injectionPlace = injectionPlace;
        this.injectionNumber = injectionNumber;
        this.injectionDate = injectionDate;
    }

    public VaccinationInfo() {
    }

    public String getVaccineName() {
        return this.vaccineName;
    }

    public void setVaccineName(String vaccineName) {
        this.vaccineName = vaccineName;
    }

    public String getVaccineNo() {
        return this.vaccineNo;
    }

    public void setVaccineNo(String vaccineNo) {
        this.vaccineNo = vaccineNo;
    }

    public String getInjectionPlace() {
        return this.injectionPlace;
    }

    public void setInjectionPlace(String injectionPlace) {
        this.injectionPlace = injectionPlace;
    }

    public String getInjectionNumber() {
        return this.injectionNumber;
    }

    public void setInjectionNumber(String injectionNumber) {
        this.injectionNumber = injectionNumber;
    }

    public LocalDate getInjectionDate() {
        return this.injectionDate;
    }

    public void setInjectionDate(LocalDate injectionDate) {
        this.injectionDate = injectionDate;
    }

    @Override
    public String toString() {
        return "{" + " \"vaccineName\":\"" + getVaccineName() + "\"" + ", \"vaccineNo\":\"" + getVaccineNo() + "\""
                + ", \"injectionPlace\":\"" + getInjectionPlace() + "\"" + ", \"injectionNumber\":\""
                + getInjectionNumber() + "\"" + ", \"injectionDate\":\"" + getInjectionDate() + "\"" + "}";
    }

}
