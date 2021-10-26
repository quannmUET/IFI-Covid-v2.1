package com.ificovid.ificovidserver.controllers;

import com.ificovid.ificovidserver.models.Patient;
import com.ificovid.ificovidserver.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.ResourceAccessException;

import java.util.List;

@RestController
@RequestMapping(value = "/patient")
public class PatientController {
    @Autowired
    private PatientRepository patientRepository;

    @GetMapping("/all")
    public List<Patient> getPatientList() {
        return patientRepository.findAll();
    }

    @PostMapping("/new")
    public ResponseEntity<Patient> createNewPatient(@RequestBody Patient patient) {
        return ResponseEntity.ok(patientRepository.save(patient));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Patient> updatePatient(@PathVariable Long id, @RequestBody Patient newPatient) {
        Patient patientToUpdate = patientRepository.findById(id).orElseThrow(() -> new ResourceAccessException("Patient "+id+" does not exist"));
        patientToUpdate.setName(newPatient.getName());
        patientToUpdate.setGender(newPatient.getGender());
        patientToUpdate.setDateOfBirth(newPatient.getDateOfBirth());
        patientToUpdate.setIdentityCard(newPatient.getIdentityCard());
        patientToUpdate.setHealthInsuranceNumber(newPatient.getHealthInsuranceNumber());
        patientToUpdate.setPhoneNumber(newPatient.getPhoneNumber());
        patientToUpdate.setImagePath(newPatient.getImagePath());
        patientToUpdate.setAddress(newPatient.getAddress());
        patientToUpdate.setVaccinationInfo(newPatient.getVaccinationInfo());
        return ResponseEntity.ok(patientRepository.save(patientToUpdate));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deletePatient(@PathVariable Long id) {
        Patient patientToDelete = patientRepository.findById(id).orElseThrow(() -> new ResourceAccessException("Patient "+id+" does not exist"));
        patientRepository.delete(patientToDelete);
        return ResponseEntity.ok(true);
    }



}
