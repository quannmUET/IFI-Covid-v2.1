package com.ificovid.ificovidserver.repository;

import com.ificovid.ificovidserver.models.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository<Patient, Long> {
}
