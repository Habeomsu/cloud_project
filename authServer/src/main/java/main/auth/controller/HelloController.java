package main.auth.controller;

import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
@Slf4j
@RestController
public class HelloController {

    @GetMapping("/hello")
    public String hello(HttpSession session) {
        session.setAttribute("hello", "eric");
        log.info(session.getId());
        return "hello eric!";
    }
}
