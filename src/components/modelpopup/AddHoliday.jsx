import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { HOLIDAY_QUERY_KEY, useAddHoliday, useEditHoliday, useGetAllHoliday, useGetByIdHoliday } from "../../api/hooks/employees/holiday.ts";
import { yupResolver } from "@hookform/resolvers/yup";
import { holidaySchema } from "../../utils/validation-schemas/holiday.ts";
import { Controller, useForm } from "react-hook-form";
import { errorToast, successToast } from "../../utils/index.ts";
import { useQueryClient } from "@tanstack/react-query";
import { holidayInitialValue } from "../../utils/constants/holidays.ts";
import { format } from "date-fns";
export const AddHoliday = ({ id, setUs }) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    defaultValues: holidayInitialValue,
    resolver: yupResolver(holidaySchema),
    mode: "onChange",
  });

  const { mutateAsync: addHoliday } = useAddHoliday();
  const { mutateAsync: editHoliday } = useEditHoliday();
  const queryClient = useQueryClient();
  const { data: holidayData } = useGetByIdHoliday(id?._id, {
    enabled: !!(id && id._id),
  });
  useEffect(() => {
    if (id && id._id && holidayData) {
      setValue("holidayName", holidayData.holidayName || "");
      setValue(
        "holidayDate",
        holidayData.holidayDate ? new Date(holidayData.holidayDate) : null
      );
    } else {
      reset(holidayInitialValue);
    }
  }, [id, holidayData, setValue, reset]);

  const onSubmitHandler = async (data) => {
    let response;
    try {
      // Format the date as needed before sending it
      const formattedData = {
        ...data,
        holidayDate: data.holidayDate
          ? format(data.holidayDate, "yyyy-MM-dd")
          : null,
      };
  
      if (id && id._id) {
        response = await editHoliday({ id: id._id, data: formattedData });
      } else {
        response = await addHoliday(formattedData);
      }
      if (response?.success) {
        successToast(response.message);
        queryClient.invalidateQueries([HOLIDAY_QUERY_KEY]);
        reset(holidayInitialValue);
      } else {
        errorToast(response?.message || "An unexpected error occurred.");
      }
    } catch (error) {
      errorToast("User is not eligible to access this resource");
    }
  };

  const onError = (errors) => {
    console.log("Validation Errors:", errors);
  };

  return (
    <div>
      <div className="modal custom-modal fade" id="add_holiday" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {id && id._id ? "Edit Holiday" : "Add Holiday"}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setUs(null)}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit(onSubmitHandler, onError)}>
                <div className="input-block mb-3">
                  <label className="col-form-label">
                    Holiday Name <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    {...register("holidayName")}
                  />
                  {errors.holidayName && (
                    <p className="text-danger">{errors.holidayName.message}</p>
                  )}
                </div>
                <div className="input-block mb-3">
                  <label className="col-form-label">
                    Holiday Date <span className="text-danger">*</span>
                  </label>
                  <Controller
                    control={control}
                    name="holidayDate"
                    render={({ field }) => (
                      <div className="cal-icon">
                        <DatePicker
                          selected={field.value}
                          onChange={(date) => field.onChange(date)}
                          onBlur={field.onBlur}
                          className="form-control datetimepicker"
                          dateFormat="dd-MM-yyyy"
                        />
                      </div>
                    )}
                  />
                  {errors.holidayDate && (
                    <p className="text-danger">{errors.holidayDate.message}</p>
                  )}
                </div>
                <div className="submit-section">
                  <button
                    type="submit"
                    className="btn btn-primary submit-btn"
                    disabled={!isValid || isSubmitting}
                    aria-label="Close"
                    data-bs-dismiss="modal"
                  >
                    {id && id._id ? "Update" : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};