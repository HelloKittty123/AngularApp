package com.example.Angular.Controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("posts")
public class PostController {
    private Logger logger = LoggerFactory.getLogger(PostController.class);

    @GetMapping()
    public String getAllPost() throws Exception {
        try {
            return "get post success";
        }
        catch (Exception e) {
            logger.info(e.getMessage());
            throw new Exception(e.getMessage());
        }

    }
}
