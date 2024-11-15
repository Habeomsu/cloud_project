package main.music.service;

import com.neovisionaries.i18n.CountryCode;
import com.wrapper.spotify.SpotifyApi;
import com.wrapper.spotify.exceptions.SpotifyWebApiException;
import com.wrapper.spotify.model_objects.specification.Paging;
import com.wrapper.spotify.model_objects.specification.Track;
import com.wrapper.spotify.requests.data.search.simplified.SearchTracksRequest;

import main.music.model.Tracks;
import org.apache.hc.core5.http.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class SearchTrackService {

    private final CreateTokenService createTokenService;

    @Autowired
    public SearchTrackService(CreateTokenService createTokenService) {
        this.createTokenService = createTokenService;
    }

    public List<Tracks> searchTracks(String q) {
        String accessToken = createTokenService.accesstoken();
        if (accessToken == null) {
            System.out.println("Failed to get access token.");
            return null;
        }

        SpotifyApi spotifyApi = new SpotifyApi.Builder()
                .setAccessToken(accessToken)
                .build();

        SearchTracksRequest searchTracksRequest = spotifyApi.searchTracks(q)
                .market(CountryCode.US)
                .limit(10)
                .build();

        List<Tracks> validTracks = new ArrayList<>();

        try {
            final Paging<Track> trackPaging = searchTracksRequest.execute();
            for (Track track : trackPaging.getItems()) {
                Tracks musicTrack = new Tracks();
                if (track.getPreviewUrl() != null) {
                    musicTrack.setTrackId(track.getId());
                    musicTrack.setTrack_name(track.getName());
                    musicTrack.setArtist(track.getArtists()[0].getName());
                    musicTrack.setAlbum(track.getAlbum().getName());
                    musicTrack.setAlbumImage_url(track.getAlbum().getImages()[0].getUrl());
                    musicTrack.setPreview_url(track.getPreviewUrl());
                    validTracks.add(musicTrack);
                }
            }
        } catch (IOException | SpotifyWebApiException | ParseException e) {
            System.out.println("Error: " + e.getMessage());
            return null;
        }

        return validTracks;
    }

}
