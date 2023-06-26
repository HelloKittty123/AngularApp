package com.example.Angular.Service;

import com.example.Angular.Ultity.Constant.Common;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Collections;
import java.util.Date;

public class TokenAuthenticationService {
    static final long EXPIRATIONTIME = 864_000_000; // 10 days
    static final String SECRET = "ThisIsASecret";
    static final String TOKEN_PREFIX = "Bearer";
    static final String HEADER_STRING = "Authorization";

    public static String addAuthentication(HttpServletResponse res, String username) {
        String JWT = Jwts.builder()
                .setSubject(username)
                .claim(Common.Claims.USER_NAME, username)
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATIONTIME))
                .signWith(SignatureAlgorithm.HS512, SECRET)
                .compact();
        Cookie cookie = new Cookie("access_token", JWT);
        cookie.setMaxAge(60*60);
        res.addCookie(cookie);
        return JWT;
    }

    private static String getAccessToken(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if(cookies != null) {
            for (Cookie cookie : cookies) {
                if(cookie.getName().equals(Common.ACCESS_TOKEN)) {
                    return cookie.getValue();
                }
            }
        }

        return null;
    }

    public static Authentication getAuthentication(HttpServletRequest request) {
        String token = getAccessToken(request);
        if (token != null) {
            Claims claims = Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token).getBody();
            String username = (String) claims.get(Common.Claims.USER_NAME);
            return username != null ?
                    new UsernamePasswordAuthenticationToken(username, null, Collections.emptyList()) :
                    null;
        }
        return null;
    }
}
