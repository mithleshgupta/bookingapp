package com.example.spotme.springbootmysql;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.boot.SpringApplication;

@EnableJpaRepositories(basePackages = "com.example.spotme.springbootmysql.Users" )
@SpringBootApplication
public class SpringbootmysqlApplication implements CommandLineRunner{
	public static final Logger log = LoggerFactory.getLogger(SpringApplication.class);

	@Autowired
    JdbcTemplate jdbcTemplate;


	public static void main(String[] args) {
		SpringApplication.run(SpringbootmysqlApplication.class, args);
	}

	@Override
    public void run(String... args) {
        log.info("StartApplication...");
    }
}