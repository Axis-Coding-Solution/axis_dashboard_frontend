import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useGetAllDepartment } from "../../api/hooks/employees/department.ts";
import { DSIGNATION_QUERY_KEY, useAddDesignation, useEditDesignation } from "../../api/hooks/employees/designations.ts";
import { useForm } from "react-hook-form";
import { designationInitialValues } from "../../utils/constants/designation.ts";
import { yupResolver } from "@hookform/resolvers/yup";
import { designationSchema } from "../../utils/validation-schemas/designations.ts";
import { errorToast, successToast } from "../../utils/index.ts";
import { useQueryClient } from "@tanstack/react-query";
import { ErrorText } from "../common/error-text.tsx";

const AddDesingnationModelPopup = ({ editData, setedit }) => {
  const { data } = useGetAllDepartment();
  const { mutateAsync: addDesignation } = useAddDesignation();
  const { mutateAsync: editDesignation } = useEditDesignation();
  const queryClient = useQueryClient();
  const designation = data?.map((department) => ({
    label: department.departmentName,
    value: department._id,
  }));
  const { register, handleSubmit, reset, setValue, formState: { errors, isValid, isSubmitting } } = useForm({
    defaultValues: designationInitialValues,
    resolver: yupResolver(designationSchema),
    mode: "onChange",
  });
  useEffect(() => {
    if (editData) {
      setValue("designationName", editData.designationName);
      setSelectedDepartment({
        label: editData.departmentId.departmentName,
        value: editData.departmentId,
      });
    }
    else {
      reset();
      setSelectedDepartment(null);
    }
  }, [editData, setValue]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
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

  const onSubmit = async (data) => {
    try {
      let response;
      const designationData = {
        departmentId: selectedDepartment?.value,
        designationName: data.designationName,
        departmentName: selectedDepartment?.label,
      };
      if (!designationData.departmentId) {
        console.error("No department selected");
        return;
      }
      if (!editData) {
        response = await addDesignation(designationData);
        reset()
      }
      else {
        response = await editDesignation({ id: editData?._id, designationName: data.designationName, departmentId: designationData?.departmentId })
        reset()
      }
      if (response?.success) {
        successToast(response.message);
        queryClient.invalidateQueries({ queryKey: [DSIGNATION_QUERY_KEY] })
        reset();
      } else {
        errorToast(response?.message || 'An unexpected error occurred.');
      }
      console.log('Designation added:', response);
      reset();
    } catch (error) {
      console.error("Error submitting designation:", error);
    }
  };

  return (
    <>
      <div id="designation" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{editData?._id ? `Edit Designation` : `Add Designation`}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => {
                setedit(null);
                reset();
                setSelectedDepartment(null);
              }}>
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <div className="input-block mb-3">
                    <label className="col-form-label">Designation Name <span className="text-danger">*</span></label>
                    <input className="form-control" {...register("designationName")} type="text" />
                  </div>
                 <ErrorText error={errors.designationName?.message}/>
                </div>
                <div>

                <div className="input-block mb-3">
                  <label className="col-form-label">Department <span className="text-danger">*</span></label>
                  <Select
                    options={designation}
                    placeholder="Select Department"
                    styles={customStyles}
                    value={selectedDepartment}
                    onChange={setSelectedDepartment}
                  />

                </div>
                </div>
                <div className="submit-section">
                  <button className="btn btn-primary submit-btn" type="submit" aria-label="Close" data-bs-dismiss="modal" >
                    {editData?._id ? `Update` : `Submit`}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddDesingnationModelPopup;
