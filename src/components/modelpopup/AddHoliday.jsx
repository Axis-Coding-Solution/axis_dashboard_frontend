import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { HOLIDAY_QUERY_KEY, useAddHoliday, useEditHoliday, useGetAllHoliday, useGetByIdHoliday } from "../../api/hooks/employees/holiday.ts";
import { yupResolver } from "@hookform/resolvers/yup";
import { holidaySchema } from "../../utils/validation-schemas/holiday.ts";
import { useForm } from "react-hook-form";
import { errorToast, successToast } from "../../utils/index.ts";
import { useQueryClient } from "@tanstack/react-query";
import { holidayInitialValue } from "../../utils/constants/holidays.ts";
export const AddHoliday = ({ id, setUs }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: holidayInitialValue,
    resolver: yupResolver(holidaySchema),
  });
  const [selectedDate, setSelectedDate] = useState(null);

  const { mutateAsync: addHoliday } = useAddHoliday();
  const { mutateAsync: editHoliday } = useEditHoliday();
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const { data: holidayData } = useGetByIdHoliday(id?._id, {
    enabled: !!(id && id._id),
  });

  const queryClient = useQueryClient();
  useEffect(() => {
    setValue("holidayDate", selectedDate);
  }, [selectedDate, setValue]);
  useEffect(() => {
    if (id && id._id && holidayData) {
      reset({
        holidayName: holidayData.holidayName || "",
        holidayDate: holidayData.holidayDate
          ? new Date(holidayData.holidayDate)
          : null,
      });
      setSelectedDate(
        holidayData.holidayDate ? new Date(holidayData.holidayDate) : null
      );
    } else {
      reset(holidayInitialValue);
      setSelectedDate(null);
    }
  }, [id, holidayData, reset]);

  const onSubmitHandler = async (data) => {
    let response;
    try {
      data.holidayDate = selectedDate;
      if (id && id._id) {
        response = await editHoliday({ id: id._id, data });
        console.log(response,'4444444444444');
        
      } else {
        response = await addHoliday(data);
      }
      console.log(response,'------------response------------');
      
      if (response?.success) {
        successToast(response.message);
        queryClient.invalidateQueries([HOLIDAY_QUERY_KEY]);
        reset(holidayInitialValue);
        setSelectedDate(null);
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
                    <p className="error">{errors.holidayName.message}</p>
                  )}
                </div>
                <div className="input-block mb-3">
                  <label className="col-form-label">
                    Holiday Date <span className="text-danger">*</span>
                  </label>
                  <div className="cal-icon">
                    <DatePicker
                      selected={selectedDate}
                      onChange={handleDateChange}
                      className="form-control datetimepicker"
                      dateFormat="dd-MM-yyyy"
                    />
                    {errors.holidayDate && (
                      <p className="error">{errors.holidayDate.message}</p>
                    )}
                  </div>
                </div>
                <div className="submit-section">
                  <button
                    type="submit"
                    className="btn btn-primary submit-btn"
                    data-bs-dismiss="modal"
                    aria-label="Close"
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
