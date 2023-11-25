import { useAppDispatch } from "@/store/hooks";
import { createTrip } from "@/store/tripThunk";
import dayjs from "dayjs";

const useTrip = (userId: number = 1) => {
  const dispatch = useAppDispatch();

  const addTrip = () => {
    const newTrip = {
      name: "Trip to Toronto",
      city: "toronto",
      startDate: new Date().toISOString(),
      endDate: dayjs().add(5, "day").toISOString(),
      userId,
    };
    dispatch(createTrip(newTrip));
  };
  return { addTrip };
};

export default useTrip;
