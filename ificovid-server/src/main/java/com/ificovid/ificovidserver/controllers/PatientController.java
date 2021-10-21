package com.ificovid.ificovidserver.controllers;

import com.ificovid.ificovidserver.dao.PatientDAO;
import com.ificovid.ificovidserver.models.Patient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/patient")
public class PatientController {
    private PatientDAO patientDAO = new PatientDAO();

    @GetMapping("/all")
    public Iterable<Patient> getPatientList() {
        return patientDAO.findAll();
    }

}
