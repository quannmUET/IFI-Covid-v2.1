package com.ificovid.ificovidserver.models;

import javax.persistence.*;
import java.time.LocalDate;

/**
 * This class stores patient's status, includes status and time (start and end date)
 */

@Entity
@Table(name = "status")
public class Status {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "status")
    private String status;
    @Column(name = "start_date")
    private LocalDate startDate;
    @Column(name = "end_date")
    private LocalDate endDate;



    public Status() {
    }

    /**
     * This method instantiates an instance of Status class.
     *
     * @param status This is patient's status (F0, F1, F2, Recovered, Dead)
     * @param startDate This is patient's status start date
     * @param endDate This is patient's status end date.
     */
    public Status(String status, LocalDate startDate, LocalDate endDate) {
        this.status = status;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDate getStartDate() {
        return this.startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return this.endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    @Override
    public String toString() {
        return "{" + " \"status\":\"" + getStatus() + "\"" + ", \"startDate\":\"" + getStartDate() + "\""
                + ", \"endDate\":\"" + getEndDate() + "\"" + "}";
    }

}
