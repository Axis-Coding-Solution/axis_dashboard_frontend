import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { useGetAllDepartment } from "../../api/hooks/employees/department.ts";
import { useGetAllCompanyData } from "../../api/hooks/companies/index.ts";
import { useGetAllDesignation } from "../../api/hooks/employees/designations.ts";
import { EMPLOYEE_QUERY_KEY, useEditEmployee, useEmployeetMutation, useGetByIdEmployee } from "../../api/hooks/employees/allEmployee.ts";
import { allEmployeeInitialValues } from "../../utils/constants/allEmployee.ts";
import { editemployeeSchema, employeeSchema } from "../../utils/validation-schemas/allEmployee.ts";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { errorToast, successToast } from "../../utils/index.ts";
import { useQueryClient } from "@tanstack/react-query";

const AllEmployeeAddPopup = ({ id, setUs }) => {
  const isEdit = Boolean(id && id._id);
  const queryClient = useQueryClient();
  const { mutateAsync: addEmployee } = useEmployeetMutation();
  const { mutateAsync: editEmployee } = useEditEmployee();
  const { data: employeeData } = useGetByIdEmployee(id?._id, {
    enabled: !!id?._id,
  });

  const { data: department } = useGetAllDepartment();
  const departmentData = department?.data || [];
  const departmentOptions = departmentData.map((dept) => ({
    label: dept.departmentName,
    value: dept._id,
  }));

  const { data: companie } = useGetAllCompanyData();

  const companieOptions = (companie || []).map((company) => ({
    label: company.companyName,
    value: company._id,
  }));
  const { data: designation } = useGetAllDesignation();
  const designationData = designation?.data || [];
  const designationOptions = designationData.map((desig) => ({
    label: desig.designationName,
    value: desig._id,
  }));

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    defaultValues: allEmployeeInitialValues,
    resolver: yupResolver(isEdit ? editemployeeSchema : employeeSchema),
    mode: "onChange",
  });

  const [selectedDate, setSelectedDate] = useState(null);
  useEffect(() => {
    setValue("joiningDate", selectedDate);
  }, [selectedDate, setValue]);
  useEffect(() => {
    if (isEdit && employeeData) {
      reset({
        firstName: employeeData.firstName || "",
        lastName: employeeData.lastName || "",
        userName: employeeData.userName || "",
        email: employeeData.email || "",
        employeeId: employeeData.employeeId || "",
        joiningDate: employeeData.joiningDate || null,
        phone: employeeData.phone || "",
        companyId: employeeData.companyId || "",
        departmentId: employeeData.departmentId || "",
        designationId: employeeData.designationId || "",
        password: "",
        confirmPassword: "",
      });
      setSelectedDate(
        employeeData.joiningDate ? new Date(employeeData.joiningDate) : null
      );
    } else {
      reset(allEmployeeInitialValues);
      setSelectedDate(null);
    }
  }, [id, employeeData, reset, isEdit]);

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

  const onSubmitHandler = async (data) => {
    try {
      data.joiningDate = selectedDate;
      if (isEdit && !data.password) {
        delete data.password;
        delete data.confirmPassword;
      }
      let response;
      if (isEdit) {
        response = await editEmployee({ id: id._id, data });
      } else {
        response = await addEmployee(data);
      }
      if (response?.success) {
        successToast(response.message);
        queryClient.invalidateQueries(["EMPLOYEE_QUERY_KEY"]);
        reset();
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
    <div id="add_employee" className="modal custom-modal fade" role="dialog">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {isEdit ? "Edit Employee" : "Add Employee"}
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
              <div className="row">
                <div className="col-sm-6">
                  <div className="input-block mb-3">
                    <label className="col-form-label">
                      First Name <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      {...register("firstName")}
                    />
                    {errors.firstName && (
                      <p className="text-danger">{errors.firstName.message}</p>
                    )}
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="input-block mb-3">
                    <label className="col-form-label">
                      Last Name <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      {...register("lastName")}
                    />
                    {errors.lastName && (
                      <p className="text-danger">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="input-block mb-3">
                    <label className="col-form-label">
                      User Name <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      {...register("userName")}
                    />
                    {errors.userName && (
                      <p className="text-danger">{errors.userName.message}</p>
                    )}
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="input-block mb-3">
                    <label className="col-form-label">
                      Email <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      type="email"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-danger">{errors.email.message}</p>
                    )}
                  </div>
                </div>
                {!isEdit && (
                <>
                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Password <span className="text-danger">*</span></label>
                      <input
                        type="password"
                        className="form-control"
                        {...register('password')}
                      />
                      {errors.password && <p className="text-danger">{errors.password.message}</p>}
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Confirm Password <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="password"
                        {...register("confirmPassword")}
                      />
                      {errors.confirmPassword && (
                        <p className="text-danger">
                          {errors.confirmPassword.message}
                        </p>
                      )}
                    </div>
                  </div>
                </>
                )} 

                <div className="col-sm-6">
                  <div className="input-block mb-3">
                    <label className="col-form-label">
                      Employee ID <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      {...register("employeeId")}
                    />
                    {errors.employeeId && (
                      <p className="text-danger">{errors.employeeId.message}</p>
                    )}
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="input-block mb-3">
                    <label className="col-form-label">
                      Joining Date <span className="text-danger">*</span>
                    </label>
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => {
                        setSelectedDate(date);
                        setValue("joiningDate", date);
                      }}
                      className="form-control"
                      dateFormat="dd-MM-yyyy"
                    />
                    {errors.joiningDate && (
                      <p className="text-danger">
                        {errors.joiningDate.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="input-block mb-3">
                    <label className="col-form-label">Phone <span className="text-danger">*</span></label>
                    <input
                      className="form-control"
                      type="text"
                      {...register("phone")}
                    />
                    {errors.phone && (
                      <p className="text-danger">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="input-block mb-3">
                    <label className="col-form-label">Company <span className="text-danger">*</span></label>
                    <Controller
                      name="companyId"
                      control={control}
                      render={({ field }) => (
                        <Select
                          options={companieOptions}
                          placeholder="Select"
                          styles={customStyles}
                          value={companieOptions.find((option) => option.value === field.value) || null}
                          onChange={(selectedOption) => field.onChange(selectedOption.value)}
                        />
                      )}
                    />

                    {errors.companyId && (
                      <p className="text-danger">{errors.companyId.message}</p>
                    )}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="input-block mb-3">
                    <label className="col-form-label">
                      Department <span className="text-danger">*</span>
                    </label>
                    <Controller
                      name="departmentId"
                      control={control}
                      render={({ field }) => (
                        <Select
                          options={departmentOptions}
                          placeholder="Select"
                          styles={customStyles}
                          value={departmentOptions.find((option) => option.value === field.value) || null}
                          onChange={(selectedOption) => field.onChange(selectedOption.value)}

                        />
                      )}
                    />
                    {errors.departmentId && (
                      <p className="text-danger">
                        {errors.departmentId.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="input-block mb-3">
                    <label className="col-form-label">
                      Designation <span className="text-danger">*</span>
                    </label>
                    <Controller
                      name="designationId"
                      control={control}
                      render={({ field }) => (
                        <Select
                          options={designationOptions}
                          placeholder="Select"
                          styles={customStyles}
                          value={designationOptions.find((option) => option.value === field.value) || null}
                          onChange={(selectedOption) => field.onChange(selectedOption.value)}

                        />
                      )}
                    />
                    {errors.designationId && (
                      <p className="text-danger">
                        {errors.designationId.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="submit-section">
              <button className="btn btn-primary submit-btn" type="submit" aria-label="Close" data-bs-dismiss="modal" disabled={!isValid || isSubmitting}>
              {id && id._id ? `Update` : `Submit`} </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllEmployeeAddPopup;
