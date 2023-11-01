import { createAsyncThunk } from "@reduxjs/toolkit";

interface GetDirectionAttributes {
  origin: string;
  destination: string;
  mode: google.maps.TravelMode;
}

const getDirection = createAsyncThunk<
  google.maps.DirectionsResult,
  GetDirectionAttributes,
  { rejectValue: string }
>("trip/getDirection", async (params) => {
  try {
    const service = new google.maps.DirectionsService();
    const res = await service.route({
      origin: params.origin,
      destination: params.destination,
      travelMode: params.mode,
    });
    return res;
  } catch (err) {
    console.log(err, "err");
    throw err;
  }
});

export default getDirection;
