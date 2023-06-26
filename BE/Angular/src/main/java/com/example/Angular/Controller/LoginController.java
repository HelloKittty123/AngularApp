package com.example.Angular.Controller;

import com.example.Angular.Domain.Login;
import com.example.Angular.Service.TokenAuthenticationService;
import com.example.Angular.Ultity.CustomAnnotation.ApiVersion;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

@RestController
@ApiVersion("1")
@RequestMapping("login")
public class LoginController {
    @Autowired
    AuthenticationManager authenticationManager;

    private Logger logger = LoggerFactory.getLogger(LoginController.class);
    @PostMapping()
    public ResponseEntity<Object> Login(Login login, HttpServletResponse httpServletResponse) throws Exception {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(login.getEmail(), login.getPassword());
        try {
            Authentication authentication = authenticationManager.authenticate(authenticationToken);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String JWT = TokenAuthenticationService.addAuthentication(httpServletResponse, login.getEmail());
            return ResponseEntity.ok(JWT);
        }
        catch (Exception e) {
            throw new Exception(e);
        }
    }
}
