package main.music.model;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Tracks {
    private String trackId;
    private String track_name;
    private String artist;
    private String album;
    private String albumImage_url;
    private String preview_url;

}
