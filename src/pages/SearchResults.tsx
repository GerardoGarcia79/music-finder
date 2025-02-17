import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ResultsGrid from "../components/ResultsGrid";
import useAlbums from "../hooks/useAlbums";
import useArtists from "../hooks/useArtists";
import useTracks from "../hooks/useTracks";
import { updateColumns } from "../utils";

const SearchResults = () => {
  const {
    data: albums,
    error: errorAlbums,
    isLoading: isLoadingAlbums,
  } = useAlbums();
  const {
    data: tracks,
    error: errorTracks,
    isLoading: isLoadingTracks,
  } = useTracks();
  const {
    data: artists,
    error: errorArtists,
    isLoading: isLoadingArtists,
  } = useArtists();
  const [columns, setColumns] = useState(8);
  const [skeletons, setSkeletons] = useState<number[]>([]);

  const calculateColumns = () => updateColumns(setColumns, setSkeletons);

  useEffect(() => {
    calculateColumns(); // Initial setup
    window.addEventListener("resize", calculateColumns); // Listen for resize
    return () => window.removeEventListener("resize", calculateColumns); // Cleanup on unmount
  }, []);

  return (
    <>
      <Box mb={10}>
        <ResultsGrid
          columns={columns}
          data={albums}
          error={errorAlbums}
          isLoading={isLoadingAlbums}
          item="albums"
          moreLink="/more-albums"
          skeletons={skeletons}
        />
      </Box>
      <Box mb={10}>
        <ResultsGrid
          columns={columns}
          data={artists}
          error={errorArtists}
          isLoading={isLoadingArtists}
          item="artists"
          moreLink="/more-artists"
          skeletons={skeletons}
        />
      </Box>
      <Box mb={10}>
        <ResultsGrid
          columns={columns}
          data={tracks}
          error={errorTracks}
          isLoading={isLoadingTracks}
          item="tracks"
          moreLink="/more-tracks"
          skeletons={skeletons}
        />
      </Box>
    </>
  );
};

export default SearchResults;
