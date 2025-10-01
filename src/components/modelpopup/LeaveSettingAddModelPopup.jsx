import React, { useEffect, useState } from "react";
import { useGetAllEmployee } from "../../api/hooks/employees/allEmployee.ts";
import { leaveStaticInitialValues } from "../../utils/constants/leaveSettings.ts";
import { leaveStaticSchema } from "../../utils/validation-schemas/leaveSettings.ts";
import {
  useAddLeaveSettings,
  useEditLeaveSettings,
  useGetByIdLeaveSettings
} from "../../api/hooks/employees/leaveSettings.ts";
import { errorToast, successToast } from "../../utils/index.ts";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const LeaveSettingAddModelPopup = ({ id, setUs }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isValid, isSubmitting }
  } = useForm({
    mode: "onChange",
    defaultValues: leaveStaticInitialValues,
    resolver: yupResolver(leaveStaticSchema)
  });

  const queryClient = useQueryClient();
  const { data: employeeData } = useGetAllEmployee();
  const { mutateAsync: addStaticLeave } = useAddLeaveSettings();
  const { mutateAsync: editStaticLeave } = useEditLeaveSettings();
  const { data: staticLeaveData } = useGetByIdLeaveSettings(id?._id, {
    enabled: !!(id && id._id),
  });

  const [optionsFrom, setOptionsFrom] = useState([]);
  const [optionsTo, setOptionsTo] = useState([]);
  const [selectedFrom, setSelectedFrom] = useState([]);
  const [selectedTo, setSelectedTo] = useState([]);

  useEffect(() => {
    if (Array.isArray(employeeData?.data)) {
      const formatted = employeeData.data.map((emp) => ({
        label: `${emp.firstName} ${emp.lastName}`,
        value: emp._id,
      }));
      setOptionsFrom(formatted);
    }
  }, [employeeData]);

  useEffect(() => {
    if (id && id._id && staticLeaveData?.data) {
      setValue("policyName", staticLeaveData.data.policyName || "");
      setValue("noOfDays", staticLeaveData.data.noOfDays || "");

      if (Array.isArray(employeeData?.data)) {
        const selected = employeeData.data
          .filter((emp) => staticLeaveData.data.employeeIds.includes(emp._id))
          .map((emp) => ({
            label: `${emp.firstName} ${emp.lastName}`,
            value: emp._id,
          }));

        const remaining = employeeData.data
          .filter((emp) => !staticLeaveData.data.employeeIds.includes(emp._id))
          .map((emp) => ({
            label: `${emp.firstName} ${emp.lastName}`,
            value: emp._id,
          }));

        setOptionsTo(selected);
        setOptionsFrom(remaining);
      }
    } else {
      reset(leaveStaticInitialValues);
      setOptionsTo([]);
      setOptionsFrom(employeeData?.data?.map(emp => ({
        label: `${emp.firstName} ${emp.lastName}`,
        value: emp._id,
      })) || []);
    }
  }, [id, staticLeaveData, employeeData, setValue, reset]);

  const moveRightAll = () => {
    setOptionsTo([...optionsTo, ...optionsFrom]);
    setOptionsFrom([]);
  };

  const moveRightSelected = () => {
    const toMove = optionsFrom.filter((opt) => selectedFrom.includes(opt.value));
    const remaining = optionsFrom.filter((opt) => !selectedFrom.includes(opt.value));
    setOptionsTo([...optionsTo, ...toMove]);
    setOptionsFrom(remaining);
    setSelectedFrom([]);
  };

  const moveLeftSelected = () => {
    const toMove = optionsTo.filter((opt) => selectedTo.includes(opt.value));
    const remaining = optionsTo.filter((opt) => !selectedTo.includes(opt.value));
    setOptionsFrom([...optionsFrom, ...toMove]);
    setOptionsTo(remaining);
    setSelectedTo([]);
  };

  const moveLeftAll = () => {
    setOptionsFrom([...optionsFrom, ...optionsTo]);
    setOptionsTo([]);
  };

  const onSubmitHandler = async (data) => {
    const finalData = {
      ...data,
      type: "annual",
      isCustomPolicy: true,
      employeeIds: optionsTo.map(emp => emp.value),
    };

    try {
      const response = id && id._id
        ? await editStaticLeave({ id: id._id, data: finalData })
        : await addStaticLeave(finalData);

      if (response?.success) {
        successToast(response.message);
        queryClient.invalidateQueries(["LEAVESETTINGS_QUERY_KEY"]);
        reset();
        setOptionsFrom([]);
        setOptionsTo([]);
        setSelectedFrom([]);
        setSelectedTo([]);
        setUs(null);
      } else {
        errorToast(response?.message || "An unexpected error occurred.");
      }
    } catch (error) {
      errorToast("User is not eligible to access this resource");
    }
  };

  return (
    <div id="add_custom_policy" className="modal custom-modal fade" role="dialog">
      <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{id && id._id ? "Edit Custom Policy" : "Add Custom Policy"}</h5>
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
            <form onSubmit={handleSubmit(onSubmitHandler)}>
              <div className="input-block mb-3">
                <label className="col-form-label">
                  Policy Name <span className="text-danger">*</span>
                </label>
                <input type="text" className="form-control" {...register("policyName")} />
                {errors.policyName && <small className="text-danger">{errors.policyName.message}</small>}
              </div>
              <div className="input-block mb-3">
                <label className="col-form-label">
                  Days <span className="text-danger">*</span>
                </label>
                <input type="number" className="form-control" {...register("noOfDays")} />
                {errors.noOfDays && <small className="text-danger">{errors.noOfDays.message}</small>}
              </div>

              <div className="input-block mb-3 leave-duallist">
                <label className="col-form-label">Add employee</label>
                <div className="row">
                  <div className="col-lg-5 col-sm-5">
                    <select
                      value={selectedFrom}
                      onChange={(e) =>
                        setSelectedFrom(Array.from(e.target.selectedOptions, (opt) => opt.value))
                      }
                      className="form-control form-select"
                      size="5"
                      multiple
                    >
                      {optionsFrom.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="multiselect-controls col-lg-2 col-sm-2">
                    <button type="button" onClick={moveRightAll} className="btn w-100 btn-white mb-2">
                      <i className="fa fa-forward" />
                    </button>
                    <button type="button" onClick={moveRightSelected} className="btn w-100 btn-white mb-2">
                      <i className="fa fa-chevron-right" />
                    </button>
                    <button type="button" onClick={moveLeftSelected} className="btn w-100 btn-white mb-2">
                      <i className="fa fa-chevron-left" />
                    </button>
                    <button type="button" onClick={moveLeftAll} className="btn w-100 btn-white mb-2">
                      <i className="fa fa-backward" />
                    </button>
                  </div>
                  <div className="col-lg-5 col-sm-5">
                    <select
                      value={selectedTo}
                      onChange={(e) =>
                        setSelectedTo(Array.from(e.target.selectedOptions, (opt) => opt.value))
                      }
                      className="form-control form-select"
                      size="5"
                      multiple
                    >
                      {optionsTo.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
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
  );
};

export default LeaveSettingAddModelPopup;
