package com.ificovid.ificovidserver.dao;

import com.ificovid.ificovidserver.config.Constants;
import com.ificovid.ificovidserver.models.Patient;
import com.ificovid.ificovidserver.utils.HibernateUtils;
import com.ificovid.ificovidserver.utils.Utils;
import org.apache.poi.openxml4j.opc.OPCPackage;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.awt.*;
import java.io.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Repository(value = "patientDAO")
public class PatientDAO {
    @Autowired
    private PatientRepository patientRepository;
    private final Logger logger = LoggerFactory.getLogger(PatientDAO.class);

    public PatientDAO() {
    }

    public void save(Patient patient) {
        Transaction transaction = null;
        try (Session session = HibernateUtils.getSessionFactory().openSession()) {
            transaction = session.beginTransaction();
            session.saveOrUpdate(patient);
            transaction.commit();
            logger.info("---- Add 1 patient: " + patient.getName());
        } catch (Exception exception) {
            exception.printStackTrace();
            logger.debug(exception.getMessage());
            transaction.rollback();
        }
    }

    public void update(Patient patient) {
        Transaction transaction = null;
        try (Session session = HibernateUtils.getSessionFactory().openSession()) {
            transaction = session.beginTransaction();
            session.merge(patient);
            transaction.commit();
            logger.info("---- Update 1 patient: " + patient.getName());
        } catch (Exception exception) {
            exception.printStackTrace();
            logger.debug(exception.getMessage());
            transaction.rollback();
        }
    }

    public void delete(long id) {
        Transaction transaction = null;
        try (Session session = HibernateUtils.getSessionFactory().openSession()) {
            Patient selectedPatient = session.get(Patient.class, id);
            if (selectedPatient != null) {
                transaction = session.beginTransaction();
                session.delete(selectedPatient);
                transaction.commit();
            }
        } catch (Exception e) {
            e.printStackTrace();
            logger.debug(e.getMessage());
            transaction.rollback();
        }
    }

    public List<Patient> findAll() {
        List<Patient> patientList = null;
        try {
            Session session = HibernateUtils.getSessionFactory().openSession();
            patientList = session.createQuery("SELECT p FROM Patient p", Patient.class).getResultList();
        } catch (Exception exception) {
            exception.printStackTrace();
            logger.debug(exception.getMessage());
        }
        return patientList;
    }

    public Patient findById(long id) {
        Transaction transaction = null;
        try (Session session = HibernateUtils.getSessionFactory().openSession()) {
            transaction = session.beginTransaction();
            Patient patient = session.get(Patient.class, id);
            transaction.commit();
            logger.info("Get patient with id " + id + ": " + patient.getName());
            return patient;
        } catch (Exception e) {
            logger.debug(e.getMessage());
            e.printStackTrace();
            transaction.rollback();
        }
        return null;
    }

    public void exportNewPatientToExcel() {
        String[] tableColumns = {"Patient ID", "Full name", "Date of birth", "Gender", "Address", "Phone number",
                "ID Card", "Health insurance number", "Created at"};
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Patient");
        Row headerRow = sheet.createRow(0);
        for (int i = 0; i < tableColumns.length; i++) {
            Cell cell = headerRow.createCell(i);
            cell.setCellValue(tableColumns[i]);
        }

        int rowNum = 1;
        try (Session session = HibernateUtils.getSessionFactory().openSession()) {
            Query query = session.createQuery("FROM Patient p ORDER BY p.createdAt DESC");
            query.setMaxResults(10);
            List<Patient> listPatients = query.list();
            for (Patient p : listPatients) {
                Row row = sheet.createRow(rowNum);
                row.createCell(0).setCellValue(p.getId());
                row.createCell(1).setCellValue(p.getName());
                row.createCell(2).setCellValue(p.getDateOfBirth().toString());
                row.createCell(3).setCellValue(p.getGender());
                row.createCell(4).setCellValue(p.getAddress().toString());
                row.createCell(5).setCellValue(p.getPhoneNumber());
                row.createCell(6).setCellValue(p.getIdentityCard());
                row.createCell(7).setCellValue(p.getHealthInsuranceNumber());
                row.createCell(8).setCellValue(p.getCreatedAt().format(DateTimeFormatter.ofPattern(Constants.DATETIME_FORMAT_PATTERN)));
                rowNum++;
            }

            try {
                FileOutputStream fileOut =
                        new FileOutputStream(Constants.EXCEL_FILE_PATH + LocalDateTime.now().format(DateTimeFormatter.ofPattern(Constants.EXCEL_FILE_NAME)) + ".xlsx");
                workbook.write(fileOut);
                fileOut.close();
            } catch (FileNotFoundException fileNotFoundException) {
                logger.debug(fileNotFoundException.getMessage());
                fileNotFoundException.printStackTrace();
            } catch (IOException ioException) {
                logger.debug(ioException.getMessage());
                ioException.printStackTrace();
            }
            logger.info("Exported 1 .xlsx file");
        } catch (Exception e) {
            e.printStackTrace();
            logger.debug(e.getMessage());
        }
    }


    public void exportPatientDetailsToWord(Patient patient) {
        FileInputStream fileInputStream;
        XWPFDocument document = null;
        try {
            fileInputStream = new FileInputStream("src/main/webapp/docx/template.docx");
            document = new XWPFDocument(OPCPackage.open(fileInputStream));
            Utils.replaceTextInWord(document, "##", Long.toString(patient.getId()));
            Utils.replaceTextInWord(document, "PATIENTNAME", patient.getName());
            Utils.replaceTextInWord(document, "FULLNAME", patient.getName());
            Utils.replaceTextInWord(document, "GENDER", patient.getGender());
            Utils.replaceTextInWord(document, "DOB", patient.getDateOfBirth().toString());
            Utils.replaceTextInWord(document, "IDCARD", patient.getIdentityCard());
            Utils.replaceTextInWord(document, "H.I.N", patient.getHealthInsuranceNumber());
            Utils.replaceTextInWord(document, "PHONE", patient.getPhoneNumber());
            Utils.replaceTextInWord(document, "ADDRESS", patient.getAddress().toString());

//            insert vaccination info: injection #1
            Utils.replaceTextInWord(document, "NO1VACCINENAME",
                    (patient.getVaccinationInfo() == null || patient.getVaccinationInfo().isEmpty()) ? "" :
                            patient.getVaccinationInfo().get(0).getVaccineName());
            Utils.replaceTextInWord(document, "NO1VACCINENO",
                    (patient.getVaccinationInfo() == null || patient.getVaccinationInfo().isEmpty()) ? "" :
                            patient.getVaccinationInfo().get(0).getVaccineNo());
            Utils.replaceTextInWord(document, "NO1DATE",
                    (patient.getVaccinationInfo() == null || patient.getVaccinationInfo().isEmpty()) ? "" :
                            patient.getVaccinationInfo().get(0).getInjectionDate().toString());
            Utils.replaceTextInWord(document, "NO1PLACE",
                    (patient.getVaccinationInfo() == null || patient.getVaccinationInfo().isEmpty()) ? "" :
                            patient.getVaccinationInfo().get(0).getInjectionPlace());

//            insert injection #2 info
            Utils.replaceTextInWord(document, "NO2VACCINENAME",
                    (patient.getVaccinationInfo() == null || patient.getVaccinationInfo().size() == 1 || patient.getVaccinationInfo().isEmpty()) ? "" :
                            patient.getVaccinationInfo().get(1).getVaccineName());
            Utils.replaceTextInWord(document, "NO2VACCINENO",
                    (patient.getVaccinationInfo() == null || patient.getVaccinationInfo().size() == 1 || patient.getVaccinationInfo().isEmpty()) ? "" :
                            patient.getVaccinationInfo().get(1).getVaccineNo());
            Utils.replaceTextInWord(document, "NO2DATE",
                    (patient.getVaccinationInfo() == null || patient.getVaccinationInfo().size() == 1 || patient.getVaccinationInfo().isEmpty()) ? "" :
                            patient.getVaccinationInfo().get(1).getInjectionDate().toString());
            Utils.replaceTextInWord(document, "NO2PLACE",
                    (patient.getVaccinationInfo() == null || patient.getVaccinationInfo().size() == 1 || patient.getVaccinationInfo().isEmpty()) ? "" :
                            patient.getVaccinationInfo().get(1).getInjectionPlace());
        } catch (Exception exception) {
            logger.debug(exception.getMessage());
            exception.printStackTrace();
        }

        FileOutputStream fileOutputStream = null;
        String patientIdAndName = "BN" + patient.getId() + "-" + patient.getName();
        try {
            fileOutputStream = new FileOutputStream("/docx/" + patientIdAndName + ".docx");
            document.write(fileOutputStream);
            Desktop desktop = Desktop.getDesktop();
            desktop.open(new File("/docx/" + patientIdAndName + ".docx"));
            fileOutputStream.close();
            document.close();
        } catch (Exception exception) {
            exception.printStackTrace();
            logger.debug(exception.getMessage());
        }
        logger.info("Exported " + patientIdAndName + " info to .docx file");
    }

}
