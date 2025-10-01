import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { leaveGenaricInitialValue } from "../../../utils/constants/leaveSettings.ts";
import { leaveGenaricSchema } from "../../../utils/validation-schemas/leaveSettings.ts";
import { useAddLeaveSettings, useEditLeaveSettings, useGetAllLeaveSettings } from "../../../api/hooks/employees/leaveSettings.ts";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { errorToast, successToast } from "../../../utils/index.ts";
import LeaveSettingCustomPolicy from "./LeaveSettingCustomPolicy.jsx";
import LeaveSettingAddModelPopup from "../../../components/modelpopup/LeaveSettingAddModelPopup.jsx";

const AnnualLeave = () => {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        control,
        watch,
        formState: { errors, isSubmitting, isValid }
    } = useForm({
        mode: "onChange",
        defaultValues: leaveGenaricInitialValue,
        resolver: yupResolver(leaveGenaricSchema)
    });
    const { mutateAsync: addGenaricLeave } = useAddLeaveSettings();
    const { mutateAsync: editGenaricLeave } = useEditLeaveSettings();
    const { data, isLoading } = useGetAllLeaveSettings();
    const [show, setShow] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const handleShow = () => {
        setShow(true);
    };
    const handleClose = () => {
        setShow(false);
        reset();
    };
    useEffect(() => {
        if (Array.isArray(data)) {
            const annualLeave = data.find(
                (leave) => leave.type === "annual" && leave.isCustomPolicy === false
            );
            if (annualLeave) {
                const days = Number(annualLeave.noOfDays);
                if (!isNaN(days)) {
                    reset({ noOfDays: days });
                    setEditingId(annualLeave._id);
                    setIsEditing(true);
                }
            }
        } else {
            console.error("Expected 'data' to be an array but got:", data);
        }
    }, [data, reset]);
    



    const queryClient = useQueryClient();
    const onSubmitHandler = async (data) => {
        const finalData = {
            ...data,
            policyName: "Annual",
            type: "annual",
            isCustomPolicy: false
        };

        try {
            let response;

            if (isEditing && editingId) {
                response = await editGenaricLeave({ id: editingId, data: finalData });
            } else {
                response = await addGenaricLeave(finalData);
            }

            if (response?.success) {
                successToast(response.message);
                queryClient.invalidateQueries(["LEAVESETTINGS_QUERY_KEY"]);

                if (finalData.type === "annual" && finalData.noOfDays) {
                    setValue("noOfDays", finalData.noOfDays);
                }

                setShow(false);
            } else {
                errorToast(response?.message || "An unexpected error occurred.");
            }
        } catch (error) {
            errorToast("User is not eligible to access this resource");
        }
    };
    return (
        <>
            <div className="card leave-box " id="leave_annual">
                <div className="card-body">
                    <div className="h3 card-title with-switch">
                        Annual
                    </div>
                    <form onSubmit={handleSubmit(onSubmitHandler)}>
                        <div className="leave-item">
                            <div className="leave-row">
                                <div className="leave-left">
                                    <div className="input-box">
                                        <div className="input-block">
                                            <label>Days</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                disabled={!show}
                                                {...register("noOfDays")}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {show ? (
                                    <div className="leave-right">
                                        <button
                                            type="button"
                                            className="btn btn-white leave-cancel-btn"
                                            onClick={handleClose}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            aria-label="Close"
                                            className="btn btn-primary leave-save-btn"
                                        >
                                            Save
                                        </button>
                                    </div>
                                ) : (
                                    <div className="leave-right">
                                        <div
                                            type="button"
                                            className="leave-edit-btn"
                                            onClick={handleShow}
                                        >
                                            Edit
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </form>
                    <LeaveSettingCustomPolicy />
                </div>

            </div>
        </>
    )
}

export default AnnualLeave;
