import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const dataAdapter = createEntityAdapter({});

const initialState = dataAdapter.getInitialState({});

export const dataApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getData: builder.query({
      query: () => "/data",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      keepUnusedDataFor: 5,
      transformResponse: (responseData) => {
        const loadedData = responseData.map((data) => {
          data.id = data._id;
          return data;
        });
        return dataAdapter.setAll(initialState, loadedData);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Data", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Data", id })),
          ];
        } else return [{ type: "Data", id: "LIST" }];
      },
    }),
  }),
});

export const { useGetDataQuery } = dataApiSlice;

export const selectDataResult = dataApiSlice.endpoints.getData.select();

const selectData = createSelector(
  selectDataResult,
  (datasResult) => datasResult.data // normalized state object with ids & entities
);

export const {
  selectAll: selectAllData,
  selectById: selectDataById,
  selectIds: selectDataIds,
} = dataAdapter.getSelectors((state) => selectData(state) ?? initialState);
