package com.ificovid.ificovidserver.utils;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.hibernate.SessionFactory;
import org.hibernate.boot.Metadata;
import org.hibernate.boot.MetadataSources;
import org.hibernate.boot.registry.StandardServiceRegistry;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;

public class HibernateUtils {
    private static StandardServiceRegistry registry;
    private static SessionFactory sessionFactory;
    private static Logger logger = LogManager.getLogger(HibernateUtils.class);

    public static SessionFactory getSessionFactory() {
        if (sessionFactory == null) {
            try {
                //create registry
                registry = new StandardServiceRegistryBuilder().configure().build();
                // create MetadataSources
                MetadataSources sources = new MetadataSources(registry);

                // create Metadata
                Metadata metadata = sources.getMetadataBuilder().build();

                // create SessionFactory
                sessionFactory = metadata.getSessionFactoryBuilder().build();
            } catch (Exception e) {
                e.printStackTrace();
                logger.debug(e.getMessage());
                if (registry != null) {
                    StandardServiceRegistryBuilder.destroy(registry);
                }
            }
        }
        return sessionFactory;
    }

    public static void shutdown() {
        if (registry != null) {
            StandardServiceRegistryBuilder.destroy(registry);
        }
    }
}
