package com.ificovid.ificovidserver.dao;

import com.ificovid.ificovidserver.models.Patient;
import org.springframework.data.repository.CrudRepository;

public interface PatientRepository extends CrudRepository<Patient, Long> {
}
