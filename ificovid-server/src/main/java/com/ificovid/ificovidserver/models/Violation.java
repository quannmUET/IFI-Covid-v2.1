package com.ificovid.ificovidserver.models;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "violation")
public class Violation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "activity")
    private String illegalActivity;
    @Column(name = "description")
    private String illegalActivityDescription;
    @Column(name = "date")
    private LocalDate illegalActivityDate;
    @Column(name = "fine")
    private String fine;

    /**
     * This method instantiates an instance of Violation class
     * @param illegalActivity
     * @param illegalActivityDescription
     * @param illegalActivityDate
     * @param fine
     */

    public Violation(String illegalActivity, String illegalActivityDescription, LocalDate illegalActivityDate, String fine) {
        this.illegalActivity = illegalActivity;
        this.illegalActivityDescription = illegalActivityDescription;
        this.illegalActivityDate = illegalActivityDate;
        this.fine = fine;
    }

    public Violation() {
    }

    public String getIllegalActivity() {
        return this.illegalActivity;
    }

    public void setIllegalActivity(String illegalActivity) {
        this.illegalActivity = illegalActivity;
    }

    public String getIllegalActivityDescription() {
        return this.illegalActivityDescription;
    }

    public void setIllegalActivityDescription(String illegalActivityDescription) {
        this.illegalActivityDescription = illegalActivityDescription;
    }

    public LocalDate getIllegalActivityDate() {
        return this.illegalActivityDate;
    }

    public void setIllegalActivityDate(LocalDate illegalActivityDate) {
        this.illegalActivityDate = illegalActivityDate;
    }

    public String getFine() {
        return this.fine;
    }

    public void setFine(String fine) {
        this.fine = fine;
    }

    @Override
    public String toString() {
        return "{" + " \"illegalActivity\":\"" + getIllegalActivity() + "\"" + ", \"illegalActivityDescription\":\""
                + getIllegalActivityDescription() + "\"" + ", \"illegalActivityDate\":\"" + getIllegalActivityDate()
                + "\"" + ", \"fine\":\"" + getFine() + "\"" + "}";
    }
}
