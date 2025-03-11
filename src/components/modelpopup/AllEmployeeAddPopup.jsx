import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { useGetAllDepartment } from "../../api/hooks/employees/department.ts";
import { useGetAllCompanyData } from "../../api/hooks/companies/index.ts";
import { useGetAllDesignation } from "../../api/hooks/employees/designations.ts";
import { EMPLOYEE_QUERY_KEY, useEditEmployee, useEmployeetMutation, useGetByIdEmployee } from "../../api/hooks/employees/allEmployee.ts";
import { allEmployeeInitialValues } from "../../utils/constants/allEmployee.ts";
import { employeeSchema } from "../../utils/validation-schemas/allEmployee.ts";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { errorToast, successToast } from "../../utils/index.ts";
import { useQueryClient } from "@tanstack/react-query";

const AllEmployeeAddPopup = ({ id, setUs }) => {
  console.log(id, '111111111111111111 ');

  const queryClient = useQueryClient();
  const { mutateAsync: addEmployee } = useEmployeetMutation();
  const { data: department } = useGetAllDepartment();
  const { data: companie } = useGetAllCompanyData();
  const { data: designation } = useGetAllDesignation();
  const [selectedDate, setSelectedDate] = useState(null);
  const { mutateAsync: editEmployee } = useEditEmployee();
  const { data: employeeData } = useGetByIdEmployee(id?._id, {
    enabled: !!id?._id, 
  });
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: allEmployeeInitialValues,
    resolver: yupResolver(employeeSchema)
  });
  useEffect(() => {
    setValue("joiningDate", selectedDate);
  }, [selectedDate, setValue]);
  useEffect(() => {
    if (id?._id && employeeData) {
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
        password: employeeData.password || "",
        confirmPassword:employeeData.confirmPassword || "",
      });
      setSelectedDate(
        employeeData.joiningDate ? new Date(employeeData.joiningDate) : null
      );
    } else {
      reset(allEmployeeInitialValues);
      setSelectedDate(null);
    }
  }, [id, employeeData, reset]);
  
  
  const DepartmentOptions = department?.map((data) => ({
    value: data._id,
    label: data.departmentName,
  })) || [];

  const CompanyOptions = companie?.map((data) => ({
    value: data._id,
    label: data.companyName,
  })) || [];

  const DesignationOptions = designation?.map((data) => ({
    value: data._id,
    label: data.designationName,
  })) || [];

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
      let response
      if (id && id._id) {
        response = await editEmployee({id: id?._id , data})
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
  }

  return (
    <div id="add_employee" className="modal custom-modal fade" role="dialog">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{id && id._id ? `Edit Employee` : `Add Employee`}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setUs(null)}>
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
                    <input className="form-control" type="text" {...register("firstName")} />
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="input-block mb-3">
                    <label className="col-form-label">Last Name</label>
                    <input className="form-control" type="text" {...register("lastName")} />
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="input-block mb-3">
                    <label className="col-form-label">
                      User Name <span className="text-danger">*</span>
                    </label>
                    <input className="form-control" type="text" {...register("userName")} />
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="input-block mb-3">
                    <label className="col-form-label">
                      Email <span className="text-danger">*</span>
                    </label>
                    <input className="form-control" type="email" {...register("email")} />
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="input-block mb-3">
                    <label className="col-form-label">Password</label>
                    <input className="form-control" type="password" {...register("password")} />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="input-block mb-3">
                    <label className="col-form-label">Confirm Password</label>
                    <input className="form-control" type="password" {...register("confirmPassword")} />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="input-block mb-3">
                    <label className="col-form-label">
                      Employee ID <span className="text-danger">*</span>
                    </label>
                    <input className="form-control" type="text" {...register("employeeId")} />
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
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="input-block mb-3">
                    <label className="col-form-label">Phone</label>
                    <input className="form-control" type="text" {...register("phone")} />
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="input-block mb-3">
                    <label className="col-form-label">Company</label>
                    <Select
                      options={CompanyOptions}
                      value={CompanyOptions.value}
                      placeholder="Select"
                      styles={customStyles}
                      onChange={(e) => setValue("companyId", e.value)}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="input-block mb-3">
                    <label className="col-form-label">
                      Department <span className="text-danger">*</span>
                    </label>
                    <Select
                      options={DepartmentOptions}
                      value={DepartmentOptions.value}
                      placeholder="Select"
                      styles={customStyles}
                      onChange={(e) => setValue("departmentId", e.value)}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="input-block mb-3">
                    <label className="col-form-label">
                      Designation <span className="text-danger">*</span>
                    </label>
                    <Select
                      options={DesignationOptions}
                      value={DesignationOptions.value}
                      placeholder="Select"
                      styles={customStyles}
                      onChange={(e) => setValue("designationId", e.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="submit-section">
                <button className="btn btn-primary submit-btn" type="submit" aria-label="Close" data-bs-dismiss="modal">
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

export default AllEmployeeAddPopup;
