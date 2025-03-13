import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { departmentInitialValues } from "../../utils/constants/employees.ts";
import { departmentSchema } from "../../utils/validation-schemas/employees.ts";
import { DEPARTMENT_QUERY_KEY, useAddDepartmentMutation, useEditDepartment } from "../../api/hooks/employees/index.ts";
import { errorToast, successToast } from "../../utils/index.ts";
import { useQueryClient } from "@tanstack/react-query";

const DepartmentModal = ({ id, setUs }) => {
  const { mutateAsync: addDepartment } = useAddDepartmentMutation();
  const { mutateAsync: editDepartment } = useEditDepartment();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    defaultValues: departmentInitialValues,
    resolver: yupResolver(departmentSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (id) {
      setValue("departmentName", id.departmentName || "");
    } else {
      reset();
    }
  }, [id, setValue, reset]);

  const onSubmitHandler = async (data) => {
    try {
      let response;
      if (!id) {
        response = await addDepartment(data);
      } else {
        response = await editDepartment({ id: id._id, departmentName: data.departmentName });
      }
      if (response?.success) {
        successToast(response.message);
        queryClient.invalidateQueries({ queryKey: [DEPARTMENT_QUERY_KEY] });
        reset();
      } else {
        errorToast(response?.message || "An unexpected error occurred.");
      }
    } catch (error) {
      errorToast("User is not eligible to access this resource");
    }
  };

  return (
    <div id="department" className="modal custom-modal fade" role="dialog">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{id?._id ? "Edit" : "Add Department"}</h5>
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
                  Department Name <span className="text-danger">*</span>
                </label>
                <input {...register("departmentName")} className="form-control" type="text" />
                {errors.departmentName && (
                  <p className="text-danger">{errors.departmentName.message}</p>
                )}
              </div>
              <div className="submit-section">
                <button
                  className="btn btn-primary submit-btn"
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  aria-label="Close"
                  data-bs-dismiss="modal"
                >
                  {id?._id ? "Save" : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};


export default DepartmentModal;
