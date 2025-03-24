import React, { useEffect, useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {  useGetProjectByRole } from "../../api/hooks/project/project.ts";
import { useAddTimeSheet, useEditTimeSheet, useGetByIdTimeSheet } from "../../api/hooks/employees/timeSheet.ts";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { timeSheetInitialValue } from "../../utils/constants/timeSheet.ts";
import { timeSheetSchema } from "../../utils/validation-schemas/timeSheet.ts";
import { errorToast, successToast } from "../../utils/index.ts";
import { useQueryClient } from "@tanstack/react-query";

export const AddTimeSheetModelPopup = ({ id, setUs }) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    defaultValues: timeSheetInitialValue,
    resolver: yupResolver(timeSheetSchema),
    mode: "onChange",
  });

  const { data: projects } = useGetProjectByRole();
  const { mutateAsync: addTimeSheet } = useAddTimeSheet();
  const { mutateAsync: editTimeSheet } = useEditTimeSheet();
  const queryClient = useQueryClient();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const { data: timeSheetData } = useGetByIdTimeSheet(id?._id, {
    enabled: !!id?._id,
  });

  const projectOptions =
    projects?.map((proj) => ({
      label: proj.projectName,
      value: proj._id,
    })) || [];

  // UseEffect for setting form fields and project on edit mode
  useEffect(() => {
    if (id?._id && timeSheetData && projects?.length) {
      const selectedProj = projects.find(
        (proj) => proj._id === timeSheetData.projectId._id
      );

      reset({
        projectId: timeSheetData.projectId._id || "",
        hours: timeSheetData.hours || "",
        description: timeSheetData.description || "",
        date: timeSheetData.date ? new Date(timeSheetData.date) : null,
      });

      setSelectedDate(timeSheetData.date ? new Date(timeSheetData.date) : null);
      setSelectedProject(selectedProj || timeSheetData.projectId);
    } else if (!id?._id) {
      reset(timeSheetInitialValue);
      setSelectedDate(null);
      setSelectedProject(null);
    }
  }, [id?._id, timeSheetData, projects]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date)) return "";
    return date.toLocaleDateString("en-GB");
  };

  const onSubmitHandler = async (data) => {
    try {
      data.date = selectedDate;
      let response;
      if (id && id._id) {
        response = await editTimeSheet({ id: id._id, data });
      } else {
        response = await addTimeSheet(data);
      }

      if (response?.success) {
        successToast(response.message);
        queryClient.invalidateQueries(["EMPLOYEE_QUERY_KEY"]);
        reset(timeSheetInitialValue);
        setSelectedDate(null);
        setSelectedProject(null);
        setUs(null);
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

  return (
    <div id="add_todaywork" className="modal custom-modal fade" role="dialog">
      <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {id && id._id ? "Edit TimeSheet" : "Add Today Work Details"}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                reset(timeSheetInitialValue);
                setSelectedDate(null);
                setSelectedProject(null);
                setUs(null);
              }}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit(onSubmitHandler, onError)}>
              <div className="row">
                <div className="input-block mb-3 col-sm-6">
                  <label className="col-form-label">
                    Project <span className="text-danger">*</span>
                  </label>
                  <Controller
                    name="projectId"
                    control={control}
                    render={({ field }) => (
                      <Select
                        options={projectOptions}
                        placeholder="Select Project"
                        styles={customStyles}
                        value={projectOptions.find((option) => option.value === field.value) || null}
                        onChange={(selectedOption) => {
                          field.onChange(selectedOption?.value);
                          const selectedProj = projects?.find(
                            (proj) => proj._id === selectedOption?.value
                          );
                          setSelectedProject(selectedProj || null);
                        }}
                      />
                    )}
                  />
                  {errors.projectId && (
                    <p className="text-danger">{errors.projectId.message}</p>
                  )}
                </div>
              </div>

              <div className="row">
                <div className="input-block mb-3 col-sm-4">
                  <label className="col-form-label">Deadline</label>
                  <input
                    className="form-control"
                    value={formatDate(selectedProject?.endDate)}
                    readOnly
                  />
                </div>

                <div className="input-block mb-3 col-sm-4">
                  <label className="col-form-label">Total Hours</label>
                  <input
                    className="form-control"
                    type="text"
                    value={selectedProject?.totalHours || ""}
                    readOnly
                  />
                </div>

                <div className="input-block mb-3 col-sm-4">
                  <label className="col-form-label">Remaining Hours</label>
                  <input
                    className="form-control"
                    type="text"
                    value={selectedProject?.remainingHours || ""}
                    readOnly
                  />
                </div>
              </div>

              <div className="row">
                <div className="input-block mb-3 col-sm-6">
                  <label className="col-form-label">
                    Date <span className="text-danger">*</span>
                  </label>
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => {
                      setSelectedDate(date);
                      setValue("date", date, { shouldValidate: true });
                    }}
                    className="form-control"
                    dateFormat="dd-MM-yyyy"
                    placeholderText="Select Date"
                  />
                  {errors.date && <p className="text-danger">{errors.date.message}</p>}
                </div>

                <div className="input-block mb-3 col-sm-6">
                  <label className="col-form-label">
                    Hours <span className="text-danger">*</span>
                  </label>
                  <input className="form-control" type="text" {...register("hours")} />
                  {errors.hours && <p className="text-danger">{errors.hours.message}</p>}
                </div>
              </div>

              <div className="input-block mb-3">
                <label className="col-form-label">
                  Description <span className="text-danger">*</span>
                </label>
                <textarea rows={4} className="form-control" {...register("description")} />
                {errors.description && (
                  <small className="text-danger">{errors.description.message}</small>
                )}
              </div>

              <div className="submit-section">
                <button
                  className="btn btn-primary submit-btn"
                  type="submit"
                  data-bs-dismiss="modal"
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
  );
};