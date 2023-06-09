package com.example.Angular.Entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@Getter
@Setter
@Table(name = "user")
public class User {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "username", nullable = false, length = 50)
    private String username;

    @Column(name = "email", nullable = false, length = 100)
    private String email;

    @Column(name = "street", nullable = false)
    private String street;

    @Column(name = "suite", nullable = false, length = 50)
    private String suite;

    @Column(name = "zipcode", nullable = false, length = 50)
    private String zipcode;

    @Column(name = "lat", nullable = false, length = 50)
    private String lat;

    @Column(name = "lng", nullable = false, length = 50)
    private String lng;

    @Column(name = "phone", nullable = false, length = 11)
    private String phone;

    @Column(name = "website", nullable = false)
    private String website;

    @Column(name = "companyName", nullable = false, length = 50)
    private String companyName;

    @Column(name = "catchPhrase", nullable = false)
    private String catchPhrase;

    @Column(name = "bs", nullable = false)
    private String bs;

    @Column(name = "role", nullable = false)
    private String role;
}
