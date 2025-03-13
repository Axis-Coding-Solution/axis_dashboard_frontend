import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { useGetAllEmployee } from "../../api/hooks/employees/allEmployee.ts";
import { Controller, useForm } from "react-hook-form";
import { overtimeInitialValue } from "../../utils/constants/overTime.ts";
import { employeeSchema } from "../../utils/validation-schemas/allEmployee.ts";
import { yupResolver } from "@hookform/resolvers/yup";
import { errorToast, successToast } from "../../utils/index.ts";
import { useAddOvertime, useEditOvertime, useGetByIdOvertime } from "../../api/hooks/employees/overTime.ts";
import { useQueryClient } from "@tanstack/react-query";
import { overTimeSchema } from "../../utils/validation-schemas/overTime.ts";

const AddOverTime = ({ id, setUs }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    watch,
    formState: { errors, isSubmitting, isValid }
  } = useForm({
    mode: "onChange", // validate on each change
    defaultValues: overtimeInitialValue,
    resolver: yupResolver(overTimeSchema)
  });

  const [selectedDate1, setSelectedDate1] = useState(null);

  const { data: employeeData } = useGetAllEmployee();
  const { mutateAsync: addOverTime } = useAddOvertime();
  const { mutateAsync: editOverTime } = useEditOvertime();
  const { data: overTimeData } = useGetByIdOvertime(id?._id, {
    enabled: !!id?._id,
  });

  const queryClient = useQueryClient();

  // Reset or populate form based on edit mode
  useEffect(() => {
    if (id && id._id && overTimeData) {
      reset({
        ...overTimeData,
        employeeId: overTimeData.employeeId._id,
        overtimeDate: overTimeData.overtimeDate ? new Date(overTimeData.overtimeDate) : null
      });
      setSelectedDate1(overTimeData.overtimeDate ? new Date(overTimeData.overtimeDate) : null);
    } else {
      reset(overtimeInitialValue);
      setSelectedDate1(null);
    }
  }, [id, overTimeData, reset]);
  const employees = employeeData?.data || [];
  const EmployeeOptions = employees.map((data) => ({
    value: data._id,
    label: data.firstName,
  }));


  const onSubmitHandler = async (data) => {
    let response;
    try {
      // Ensure overtimeDate is in the proper format
      data.overtimeDate = data.overtimeDate ? data.overtimeDate.toISOString() : null;

      if (id && id._id) {
        response = await editOverTime({ id: id._id, data });
      } else {
        response = await addOverTime(data);
      }
      if (response?.success) {
        successToast(response.message);
        queryClient.invalidateQueries(["OVERTIME_QUERY_KEY"]);
        reset();
      } else {
        errorToast(response?.message || "An unexpected error occurred.");
      }
    } catch (error) {
      errorToast("User is not eligible to access this resource");
    }
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#ff9b44" : "#fff",
      color: state.isFocused ? "#fff" : "#000",
      "&:hover": {
        backgroundColor: "#ff9b44",
      },
    }),
  };

  const onError = (errors) => {
    console.log("Validation Errors:", errors);
  };

  return (
    <div>
      <div id="add_overtime" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {id && id._id ? `Edit Overtime` : `Add Overtime`}
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
                {/* Employee Select Field */}
                <div className="input-block mb-3">
                  <label className="col-form-label">
                    Select Employee <span className="text-danger">*</span>
                  </label>
                  <Controller
                    name="employeeId"
                    control={control}
                    render={({ field }) => (
                      <>
                        <Select
                          {...field}
                          options={EmployeeOptions}
                          value={
                            EmployeeOptions.find(option => option.value === field.value) ||
                            null
                          }
                          onChange={(option) => field.onChange(option.value)}
                          placeholder="Select"
                          styles={customStyles}
                        />
                        {errors.employeeId && (
                          <small className="text-danger">
                            {errors.employeeId.message || "Please select an employee"}
                          </small>
                        )}
                      </>
                    )}
                  />
                </div>

                {/* Overtime Date Field */}
                <div className="input-block mb-3">
                  <label className="col-form-label">
                    Overtime Date <span className="text-danger">*</span>
                  </label>
                  <div className="cal-icon">
                    <Controller
                      name="overtimeDate"
                      control={control}
                      render={({ field }) => (
                        <>
                          <DatePicker
                            selected={field.value}
                            onChange={(date) => field.onChange(date)}
                            className="form-control"
                            dateFormat="dd-MM-yyyy"
                          />
                          {errors.overtimeDate && (
                            <small className="text-danger">
                              {errors.overtimeDate.message || "Please select an overtime date"}
                            </small>
                          )}
                        </>
                      )}
                    />
                  </div>
                </div>

                {/* Overtime Hours Field */}
                <div className="input-block mb-3">
                  <label className="col-form-label">
                    Overtime Hours <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    {...register("overtimeHours")}
                  />
                  {errors.overtimeHours && (
                    <small className="text-danger">
                      {errors.overtimeHours.message || "Please enter overtime hours"}
                    </small>
                  )}
                </div>

                {/* Description Field */}
                <div className="input-block mb-3">
                  <label className="col-form-label">
                    Description <span className="text-danger">*</span>
                  </label>
                  <textarea
                    rows={4}
                    className="form-control"
                    {...register("description")}
                  />
                  {errors.description && (
                    <small className="text-danger">
                      {errors.description.message || "Please enter a description"}
                    </small>
                  )}
                </div>

                {/* Submit Button */}
                <div className="submit-section">
                  <button
                    className="btn btn-primary submit-btn"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    type="submit"
                    disabled={!isValid || isSubmitting}
                  >
                    {id && id._id ? `Update` : `Submit`}
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


export default AddOverTime;
