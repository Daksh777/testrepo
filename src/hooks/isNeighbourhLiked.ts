import {
  useAddFavourite,
  useIsFavouriteCheck,
  useRemoveFavourite,
} from "@/services/favouritesServices";
import { useLikedStore } from "@/stores/likedStore";
import { useEffect } from "react";

const useNeighbourhLiked = ({
  neighbour_id,
}: {
  neighbour_id: string | number;
}) => {
  const isLiked = useLikedStore((state) => state.likedLocations[neighbour_id]);
  const addLikedLocationToStore = useLikedStore.getState().addLikedLocation;
  const removeLikedLocationFromStore =
    useLikedStore.getState().removeLikedLocation;
  const { data, error } = useIsFavouriteCheck(neighbour_id);
  const { mutate: addFavourite } = useAddFavourite();
  const { mutate: removeFavourite } = useRemoveFavourite(
    neighbour_id as string
  );
  useEffect(() => {
    if (error) {
      removeLikedLocationFromStore(neighbour_id);
    }
    if (data) {
      addLikedLocationToStore(neighbour_id);
    }
  }, [data, error, neighbour_id]);
  const addLikedLocation = (body: any) => {
    addLikedLocationToStore(neighbour_id);
    addFavourite(body);
  };
  const removeLikedLocation = () => {
    removeLikedLocationFromStore(neighbour_id);
    removeFavourite({});
  };
  return { isLiked, addLikedLocation, removeLikedLocation };
};

export default useNeighbourhLiked;
