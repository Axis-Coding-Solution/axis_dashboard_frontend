import React, { useEffect, useState } from "react";
import {
  Avatar_05,
  Avatar_09,
  Avatar_10,
  Avatar_16,
} from "../../Routes/ImagePath";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import Select from "react-select";
import DefaultEditor from "react-simple-wysiwyg";
import { useGetAllClient } from "../../api/hooks/client/index.ts";
import { useGetAllEmployee } from "../../api/hooks/employees/allEmployee.ts";
import { useAddProject, useEditProject, useGetByIdProject } from "../../api/hooks/project/project.ts";
import { projectInitialValues } from "../../utils/constants/project.ts";
import { projectSchema } from "../../utils/validation-schemas/project.ts";
import { errorToast, successToast } from "../../utils/index.ts";
import { useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
const ProjectModelPopup = ({ id, setUs }) => {
  const [selectedDate1, setSelectedDate1] = useState(null);
  const [selectedDate2, setSelectedDate2] = useState(null);
  const [html, setHtml] = useState("");
  const [selectedTeamMembers, setSelectedTeamMembers] = useState([]);
  const [selectedProjectLeader, setSelectedProjectLeader] = useState(null);

  const { data: client } = useGetAllClient();
  const { data: employeeResponse } = useGetAllEmployee();
  const { mutateAsync: addProject } = useAddProject();
  const { mutateAsync: updateProject } = useEditProject();
  const queryClient = useQueryClient();

  const { data: projectData } = useGetByIdProject(id?._id, {
    enabled: !!id?._id,
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    defaultValues: projectInitialValues,
    resolver: yupResolver(projectSchema),
    mode: "onChange",
  });

  const clientOptions = (client?.data || []).map((c) => ({
    label: c.firstName,
    value: c._id,
  }));

  const employeeOptions = (employeeResponse?.data || []).map((e) => ({
    label: e.firstName,
    value: e._id,
  }));

  const statusOptions = [
    { value: "high", label: "High" },
    { value: "medium", label: "Medium" },
    { value: "low", label: "Low" },
  ];

  const rateOptions = [
    { value: "hourly", label: "Hourly" },
    { value: "fixed", label: "Fixed" },
  ];

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

  // Populate form fields on edit
  useEffect(() => {
    if (id && id._id && projectData) {
      reset({
        projectName: projectData.projectName || "",
        clientId: projectData.clientId || "",
        rate: projectData.rate || "",
        rateType: projectData.rateType || "",
        priority: projectData.priority || "",
        projectLeader: projectData.projectLeader || "",
        teamMembers: projectData.teamMembers || [],
        startDate: projectData.startDate ? new Date(projectData.startDate) : null,
        endDate: projectData.endDate ? new Date(projectData.endDate) : null,
        description: projectData.description || "",
      });

      setSelectedDate1(projectData.startDate ? new Date(projectData.startDate) : null);
      setSelectedDate2(projectData.endDate ? new Date(projectData.endDate) : null);
      setHtml(projectData.description || "");

      const leader = employeeOptions.find((e) => e.value === projectData.projectLeader);
      setSelectedProjectLeader(leader || null);

      const team = employeeOptions.filter((e) =>
        projectData.teamMembers?.includes(e.value)
      );
      setSelectedTeamMembers(team || []);
    } else {
      reset(projectInitialValues);
      setSelectedDate1(null);
      setSelectedDate2(null);
      setSelectedTeamMembers([]);
      setSelectedProjectLeader(null);
      setHtml("");
    }
  }, [id, projectData]);

  const onSubmitHandler = async (data) => {
    try {
      data.startDate = selectedDate1;
      data.endDate = selectedDate2;
      data.projectLeader = selectedProjectLeader?.value || null;
      data.teamMembers = selectedTeamMembers.map((m) => m.value);

      let response;
      if (id && id._id) {
        response = await updateProject({ id: id._id, data });
      } else {
        response = await addProject(data);
      }

      if (response?.success) {
        successToast(response.message);
        queryClient.invalidateQueries(["PROJECT_QUERY_KEY"]);
        setUs(null);
        reset(projectInitialValues);
      } else {
        errorToast(response?.message || "Something went wrong.");
      }
    } catch (err) {
      errorToast("Unexpected error occurred");
    }
  };

  const onError = (errors) => {
    console.log("Form validation errors:", errors);
  };
  const watchRateType = watch("rateType");
  const watchClientId = watch("clientId");
  const watchPriority = watch("priority");
  return (
    <div id="create_project" className="modal custom-modal fade" role="dialog">
      <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{id?._id ? "Edit Project" : "Add Project"}</h5>
            <button className="btn-close" onClick={() => setUs(null)} data-bs-dismiss="modal">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit(onSubmitHandler, onError)}>
              <div className="row">
                <div className="col-sm-6 mb-3">
                  <label>Project Name</label>
                  <input className="form-control" {...register("projectName")} />
                  {errors.projectName && <small className="text-danger">{errors.projectName.message}</small>}
                </div>
                <div className="col-sm-6 mb-3">
                  <label>Client</label>
                  <Select
                    options={clientOptions}
                    value={clientOptions.find((c) => c.value === watchClientId)}
                    onChange={(option) => setValue("clientId", option?.value)}
                    styles={customStyles}
                    placeholder="Select Client"
                  />
                  <input type="hidden" {...register("clientId")} />
                  {errors.clientId && <small className="text-danger">{errors.clientId.message}</small>}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-6">
                  <label>Start Date</label>
                  <DatePicker
                    selected={selectedDate1}
                    onChange={(date) => {
                      setSelectedDate1(date);
                      setValue("startDate", date);
                    }}
                    className="form-control"
                    dateFormat="dd-MM-yyyy"
                  />
                </div>
                <div className="col-sm-6">
                  <label>End Date</label>
                  <DatePicker
                    selected={selectedDate2}
                    onChange={(date) => {
                      setSelectedDate2(date);
                      setValue("endDate", date);
                    }}
                    className="form-control"
                    dateFormat="dd-MM-yyyy"
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3">
                  <label>Rate</label>
                  <input className="form-control" {...register("rate")} />
                </div>
                <div className="col-sm-3">
                  <label>Rate Type</label>
                  <Select
                    options={rateOptions}
                    value={rateOptions.find((r) => r.value === watchRateType)}
                    onChange={(option) => setValue("rateType", option?.value)}
                    styles={customStyles}
                  />
                  <input type="hidden" {...register("rateType")} />
                </div>
                <div className="col-sm-6">
                  <label>Priority</label>
                  <Select
                    options={statusOptions}
                    value={statusOptions.find((s) => s.value === watchPriority)}
                    onChange={(option) => setValue("priority", option?.value)}
                    styles={customStyles}
                  />
                  <input type="hidden" {...register("priority")} />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-6">
                  <label>Project Leader</label>
                  <Select
                    options={employeeOptions}
                    value={selectedProjectLeader}
                    onChange={(option) => {
                      setSelectedProjectLeader(option);
                      setValue("projectLeader", option?.value);
                    }}
                    styles={customStyles}
                    placeholder="Select Leader"
                  />
                  <input type="hidden" {...register("projectLeader")} />
                </div>
                <div className="col-sm-6">
                  <label>Team Members</label>
                  <Controller
                    control={control}
                    name="teamMembers"
                    render={({ field, fieldState }) => (
                      <>
                        <Select
                          options={employeeOptions}
                          value={employeeOptions.filter((option) =>
                            field.value?.includes(option.value)
                          )}
                          onChange={(selectedOptions) => {
                            const selectedValues = selectedOptions.map((option) => option.value);
                            field.onChange(selectedValues);
                            setSelectedTeamMembers(selectedOptions);
                          }}
                          isMulti
                          styles={customStyles}
                          placeholder="Select Team"
                        />
                        {fieldState.error && (
                          <p className="text-danger mt-1">{fieldState.error.message}</p>
                        )}
                      </>
                    )}
                  />
                </div>
              </div>
              <div className="mb-3">
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
              <div className="submit-section text-end">
                <button className="btn btn-primary" type="submit" aria-label="Close" data-bs-dismiss="modal"disabled={!isValid || isSubmitting}>
                  {id?._id ? "Update Project" : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
{/* <div className="input-block mb-3">
  <label className="col-form-label">Upload Files</label>
  <input className="form-control" type="file" />
  </div> */}
export default ProjectModelPopup;
