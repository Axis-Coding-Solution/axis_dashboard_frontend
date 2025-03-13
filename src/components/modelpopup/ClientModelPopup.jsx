import React, { useEffect, useState } from "react";
import { useAddClient, useEditClient, useGetByIdClient } from "../../api/hooks/client/index.ts";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { allClientInitialValues } from "../../utils/constants/client.ts";
import { clientSchema, editclientSchema } from "../../utils/validation-schemas/client.ts";
import { errorToast, successToast } from "../../utils/index.ts";
import { useQueryClient } from "@tanstack/react-query";

export const ClientModelPopup = ({ id, setUs }) => {
  const isEdit = Boolean(id && id._id);
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    defaultValues: allClientInitialValues,
    resolver: yupResolver(isEdit ? editclientSchema : clientSchema),
    mode: "onChange",
  });
  const queryClient = useQueryClient();
  const { mutateAsync: addClient } = useAddClient();
  const { mutateAsync: editClient } = useEditClient();
  const { data: clientData } = useGetByIdClient(id?._id, {
    enabled: !!id?._id,
  });
  useEffect(() => {
    if (isEdit && clientData) {
      reset({
        firstName: clientData.firstName || "",
        lastName: clientData.lastName || "",
        userName: clientData.userName || "",
        email: clientData.email || "",
        phone: clientData.phone || "",
        clientId: clientData.clientId || "",
        companyName: clientData.companyName || "",
        password: "",
        confirmPassword: "",
      });
    } else {
      reset(allClientInitialValues);
    }
  }, [id, clientData, reset, isEdit]);

  const onSubmitHandler = async (data) => {
    try {
      let response;
      if (isEdit) {
        response = await editClient({ id: id._id, data });
      } else {
        response = await addClient(data);
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

  return (
    <>
      <div id="add_client" className="modal custom-modal fade" role="dialog">
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title">
                {isEdit ? "Edit Client" : "Add Client"}
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
              <form onSubmit={handleSubmit(onSubmitHandler)}>
                <div className="row">
                  <div className="col-md-6">
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
                  <div className="col-md-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Last Name</label>
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
                  <div className="col-md-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Username <span className="text-danger">*</span>
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
                  <div className="col-md-6">
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
                      <div className="col-md-6">
                        <div className="input-block mb-3">
                          <label className="col-form-label">Password</label>
                          <input
                            type="password"
                            className="form-control"
                            {...register('password')}
                          />
                          {errors.password && (
                            <p className="text-danger">{errors.password.message}</p>
                          )}
                        </div>
                      </div>


                      <div className="col-md-6">
                        <div className="input-block mb-3">
                          <label className="col-form-label">Confirm Password</label>
                          <input
                            type="password"
                            className="form-control"
                            {...register("confirmPassword")}
                          />
                          {errors.confirmPassword && (
                            <p className="text-danger">{errors.confirmPassword.message}</p>
                          )}
                        </div>
                      </div>

                    </>
                  )}
                  <div className="col-md-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Client ID <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        {...register("clientId")}
                      />
                      {errors.clientId && (
                        <p className="text-danger">{errors.clientId.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Phone </label>
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
                  <div className="col-md-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Company Name</label>
                      <input
                        className="form-control"
                        type="text"
                        {...register("companyName")}
                      />
                      {errors.companyName && (
                        <p className="text-danger">{errors.companyName.message}</p>
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

    </>
  );
};
