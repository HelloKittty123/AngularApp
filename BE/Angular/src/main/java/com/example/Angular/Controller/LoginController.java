package com.example.Angular.Controller;

import com.example.Angular.Domain.Login;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("login")
public class LoginController {
    private Logger logger = LoggerFactory.getLogger(LoginController.class);
    @PostMapping()
    public String Login(Login login) {
        logger.info("Login in system");
        return "Login success";
    }
}
