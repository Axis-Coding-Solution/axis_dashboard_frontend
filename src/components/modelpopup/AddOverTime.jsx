import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { useGetAllEmployee } from "../../api/hooks/employees/allEmployee.ts";
import { useForm } from "react-hook-form";
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
    watch,
    formState: { errors, isSubmitting }
  } = useForm({
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
  
  const handleDateChange1 = (date) => {
    setSelectedDate1(date);
  };
  
  const queryClient = useQueryClient();
  
  useEffect(() => {
    setValue("overtimeDate", selectedDate1);
  }, [selectedDate1, setValue]);
  const employee = employeeData || [];
  const EmployeeOptions = employee.map((data) => ({
    value: data._id,
    label: data.firstName,
  })) || [];
  useEffect(() => {
    if (id && id._id && overTimeData) {
      reset({
        ...overTimeData,
        employeeId: overTimeData.employeeId._id,
      });
      if (overTimeData.overtimeDate) {
        setSelectedDate1(new Date(overTimeData.overtimeDate));
      }
    } else {
      reset(overtimeInitialValue);
      setSelectedDate1(null);
    }
  }, [id, overTimeData, reset]);
  const employeeIdValue = watch("employeeId");
  const selectedEmployeeOption =
    EmployeeOptions.find((option) => option.value === employeeIdValue) || null;
  
    const onSubmitHandler = async (data) => {
      let response;
      try {
        data.overtimeDate = selectedDate1 ? selectedDate1.toISOString() : null;
    
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
                <div className="input-block mb-3">
                  <label className="col-form-label">
                    Select Employee <span className="text-danger">*</span>
                  </label>
                  <Select
                    options={EmployeeOptions}
                    value={selectedEmployeeOption}
                    placeholder="Select"
                    onChange={(option) =>
                      setValue("employeeId", option.value)
                    }
                    styles={customStyles}
                  />
                </div>
                <div className="input-block mb-3">
                  <label className="col-form-label">
                    Overtime Date <span className="text-danger">*</span>
                  </label>
                  <div className="cal-icon">
                    <DatePicker
                      selected={selectedDate1}
                      onChange={(date) => {
                        setSelectedDate1(date);
                        setValue("overtimeDate", date);
                      }}
                      className="form-control"
                      dateFormat="dd-MM-yyyy"
                    />
                  </div>
                </div>
                <div className="input-block mb-3">
                  <label className="col-form-label">
                    Overtime Hours <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    {...register("overtimeHours")}
                  />
                </div>
                <div className="input-block mb-3">
                  <label className="col-form-label">
                    Description <span className="text-danger">*</span>
                  </label>
                  <textarea
                    rows={4}
                    className="form-control"
                    defaultValue={""}
                    {...register("description")}
                  />
                </div>
                <div className="submit-section">
                  <button
                    className="btn btn-primary submit-btn"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    type="submit"
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
