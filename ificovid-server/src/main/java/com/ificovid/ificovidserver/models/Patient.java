package com.ificovid.ificovidserver.models;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "patient")
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "name")
    private String name;

    @Column(name = "dob")
    private LocalDate dateOfBirth;

    @Column(name = "gender")
    private String gender;

    @Column(name = "phone")
    private String phoneNumber;

    @Column(name = "id_card")
    private String identityCard;

    @Column(name = "health_insurance")
    private String healthInsuranceNumber;

    @Column(name = "image")
    private String imagePath;


    @Column(name = "created_at")
    private LocalDateTime createdAt;


    @OneToMany(targetEntity = Status.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "patientID")
    private List<Status> status;

    @OneToOne(targetEntity = Address.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "addressID")
    private Address address;

    @OneToMany(targetEntity = VaccinationInfo.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "patientID")
    private List<VaccinationInfo> vaccinationInfo;

    @OneToMany(targetEntity = Violation.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "patientID")
    private List<Violation> violation;



    public Patient() {
        this.createdAt = LocalDateTime.now();
    }

    public Patient(long id, String name, LocalDate dateOfBirth, String gender, String phoneNumber, String identityCard, String healthInsuranceNumber, String imagePath, List<Status> status, Address address, List<VaccinationInfo> vaccinationInfo, List<Violation> violation) {
        this.id = id;
        this.name = name;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.phoneNumber = phoneNumber;
        this.identityCard = identityCard;
        this.healthInsuranceNumber = healthInsuranceNumber;
        this.imagePath = imagePath;
        this.createdAt = LocalDateTime.now();
        this.status = status;
        this.address = address;
        this.vaccinationInfo = vaccinationInfo;
        this.violation = violation;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getIdentityCard() {
        return identityCard;
    }

    public void setIdentityCard(String identityCard) {
        this.identityCard = identityCard;
    }

    public String getHealthInsuranceNumber() {
        return healthInsuranceNumber;
    }

    public void setHealthInsuranceNumber(String healthInsuranceNumber) {
        this.healthInsuranceNumber = healthInsuranceNumber;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }


    public List<Status> getStatus() {
        return status;
    }

    public void setStatus(List<Status> status) {
        this.status = status;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public List<VaccinationInfo> getVaccinationInfo() {
        return vaccinationInfo;
    }

    public void setVaccinationInfo(List<VaccinationInfo> vaccinationInfo) {
        this.vaccinationInfo = vaccinationInfo;
    }

    public List<Violation> getViolation() {
        return violation;
    }

    public void setViolation(List<Violation> violation) {
        this.violation = violation;
    }

    @Override
    public String toString() {
        return "Patient {" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", dateOfBirth=" + dateOfBirth +
                ", gender='" + gender + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", identityCard='" + identityCard + '\'' +
                ", healthInsuranceNumber='" + healthInsuranceNumber + '\'' +
                ", createdAt=" + createdAt +
                '}';
    }
}
