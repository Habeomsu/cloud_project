package main.music.controller;

import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import main.music.model.Tracks;
import main.music.service.SearchTrackService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@Slf4j
@RestController
@RequestMapping("/api")
public class MusicController {

    private final SearchTrackService searchTrackService;

    public MusicController(SearchTrackService searchTrackService) {
        this.searchTrackService = searchTrackService;
    }

    @GetMapping("/search")
    public ResponseEntity<?> search(@RequestParam String trackName, HttpSession session) {

        String username = (String) session.getAttribute("username");
        if (username == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }
        log.info(username);
        log.info(session.getId());

        List<Tracks> tracks = searchTrackService.searchTracks(trackName);

        if (tracks == null) {
            // 에러 메시지와 상태 코드를 반환
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to retrieve tracks. Please try again.");
        }
        return ResponseEntity.ok(tracks);


    }

//    @GetMapping("/search")
//    public ResponseEntity<?> search(HttpServletRequest request) {
//        HttpSession session = request.getSession(false);
//        if (session != null) {
//            String sessionId = session.getId();
//            System.out.println("Session ID: " + sessionId);
//        } else {
//            System.out.println("No session found.");
//        }
//        // 검색 처리 로직
//        return ResponseEntity.ok("Search results");
//    }
}
