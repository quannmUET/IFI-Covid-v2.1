package com.ificovid.ificovidserver.config;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

public class Constants {
    private final String CONFIG_FILE_PATH = "src/main/resources/config.properties";
    private Logger logger = LogManager.getLogger(Constants.class);
    public static String JSON_FILE_PATH;
    public static String EXCEL_FILE_PATH;
    public static String EXCEL_FILE_NAME;
    public static long EXPORT_EXCEL_PERIOD;
    public static String WORD_FILE_PATH;
    public static String WORD_FILE_TEMPLATE;
    public static String IMAGE_FOLDER_PATH;
    public static String DATE_FORMAT_PATTERN;
    public static String DATETIME_FORMAT_PATTERN;


    public Constants() {
        Properties properties = new Properties();
        FileInputStream configFileInput = null;
        try {
            configFileInput = new FileInputStream(CONFIG_FILE_PATH);
            properties.load(configFileInput);

            this.JSON_FILE_PATH = properties.getProperty("json.file.path");
            this.EXCEL_FILE_PATH = properties.getProperty("export.excel.file.path");
            this.EXCEL_FILE_NAME = properties.getProperty("export.excel.file.name");
            this.EXPORT_EXCEL_PERIOD = Long.parseLong(properties.getProperty("export.excel.period"));
            this.WORD_FILE_PATH = properties.getProperty("export.word.file.path");
            this.IMAGE_FOLDER_PATH = properties.getProperty("image.folder.path");
            this.DATE_FORMAT_PATTERN = properties.getProperty("date.format.pattern");
            this.DATETIME_FORMAT_PATTERN = properties.getProperty("datetime.format.pattern");
            this.WORD_FILE_TEMPLATE = properties.getProperty("export.word.file.template");

            System.out.println(EXCEL_FILE_PATH + "/" + EXCEL_FILE_NAME + "/" + WORD_FILE_PATH);

        } catch (IOException ioException) {
            ioException.printStackTrace();
            logger.debug(ioException.getMessage());
        } finally {
            try {
                configFileInput.close();
            } catch (IOException ioException) {
                ioException.printStackTrace();
                logger.debug(ioException.getMessage());
            }
        }
    }

}
