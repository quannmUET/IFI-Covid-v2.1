package com.ificovid.ificovidserver.utils;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.ificovid.ificovidserver.config.Constants;
import com.ificovid.ificovidserver.models.Patient;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.poi.xwpf.usermodel.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class Utils {

    private static Logger logger = LogManager.getLogger(Utils.class);
    private static Gson gson = new GsonBuilder().registerTypeAdapter(LocalDate.class, new LocalDateAdapter()).create();

    public Utils() {
    }

    public static LocalDate dateToLocalDate(Date date) {
        return date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
    }

    public static Date localDateToDate(LocalDate localDate) {
        return Date.from(localDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
    }

    public static void replaceTextInWord(XWPFDocument document, String textToFind, String textToReplace) {
        for (XWPFTable table : document.getTables()) {
            for (XWPFTableRow row : table.getRows()) {
                for (XWPFTableCell cell : row.getTableCells()) {
                    for (XWPFParagraph paragraph : cell.getParagraphs()) {
                        for (XWPFRun run : paragraph.getRuns()) {
                            String text = run.getText(0);
                            if (text != null && text.contains(textToFind)) {
                                text = text.replace(textToFind, textToReplace);
                                run.setText(text, 0);
                            }
                        }
                    }
                }
            }
        }
    }

    public static String formatLocalDateTime(LocalDateTime dateTime) {
        return dateTime.format(DateTimeFormatter.ofPattern(Constants.DATETIME_FORMAT_PATTERN));
    }

    public static String formatLocalDate(LocalDate date) {
        return date.format(DateTimeFormatter.ofPattern(Constants.DATE_FORMAT_PATTERN));
    }


    /**
     * This method converts json string to List of Patient
     *
     * @param json This is json string that is converted to List of Patient
     * @return List This return a List of Patient that is converted from json
     */
    public static List<Patient> jsonToPatientList(String json) {
        List<Patient> patientList = gson.fromJson(json, new TypeToken<ArrayList<Patient>>() {
        }.getType());
        return patientList;
    }

    /**
     * This method converts Patient entity to json string
     *
     * @param patient Patient entity to convert
     * @return
     */
    public static String patientToJson(Patient patient) {
        String json = gson.toJson(patient);
        return json;
    }

//    public static String stringToHash(String string) throws NoSuchAlgorithmException {
//        MessageDigest messageDigest = MessageDigest.getInstance("MD5");
//        messageDigest.update(string.getBytes());
//        byte[] digest = messageDigest.digest();
//        String hash = DatatypeConverter.printHexBinary(digest);
//        return hash;
//    }

//    public static boolean verifyStringAndHash(String string, String hash) throws NoSuchAlgorithmException {
//        String hashFromString = stringToHash(string);
//        return hashFromString.equals(hash);
//    }
}
