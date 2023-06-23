package com.example.Angular.Controller;

import com.example.Angular.Domain.Login;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("login")
public class LoginController {
    private Logger logger = LoggerFactory.getLogger(LoginController.class);
    @PostMapping()
    public String Login(@RequestBody Login login) {
        logger.info("Login in system");
        return "Login success";
    }
}
