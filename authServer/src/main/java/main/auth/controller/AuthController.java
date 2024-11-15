package main.auth.controller;



import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;

import main.auth.dto.UserDTO;
import main.auth.model.Users;
import main.auth.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UserService userService;

    @Autowired
    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody UserDTO userDTO) {
        Users user = userService.register(userDTO.getUsername(), userDTO.getPassword());
        return ResponseEntity.ok("User registered successfully!");
    }

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<String> login(HttpServletRequest request, @RequestBody UserDTO userDTO) {
        // 사용자 인증 시도
        Optional<Users> foundUserOpt = userService.login(userDTO.getUsername(), userDTO.getPassword());

        if (!foundUserOpt.isPresent()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }

        Users foundUser = foundUserOpt.get();
        // 세션 객체 얻기
        HttpSession session = request.getSession(false);
        session.setAttribute("username", foundUser.getUsername());    // 세션에 사용자 정보 저장
        log.info(session.getId());
        return ResponseEntity.ok("User logged in successfully!");
    }

}

