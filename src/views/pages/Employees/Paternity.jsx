import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { leaveGenaricInitialValue } from "../../../utils/constants/leaveSettings.ts";
import { leaveGenaricSchema } from "../../../utils/validation-schemas/leaveSettings.ts";
import { useAddLeaveSettings, useEditLeaveSettings, useGetAllLeaveSettings } from "../../../api/hooks/employees/leaveSettings.ts";
import { errorToast, successToast } from "../../../utils/index.ts";


const PaternityLeave = () => {
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
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [paternty, setPaternty] = useState(false);
    const paterntyShow = () => {
        setPaternty(true);
    };

    const paterntyClose = () => {
        setPaternty(false);
    };
    useEffect(() => {
        if (Array.isArray(data)) {
            const paternityLeave = data.find((leave) => leave.type === "paternity");
            if (paternityLeave) {
                const days = Number(paternityLeave.noOfDays);
                if (!isNaN(days)) {
                    reset({ noOfDays: days });
                    setEditingId(paternityLeave._id);
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
            policyName: "Paternity",
            type: "paternity",
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

                if (finalData.type === "paternity" && finalData.noOfDays) {
                    setValue("noOfDays", finalData.noOfDays);
                }

                setPaternty(false);
            } else {
                errorToast(response?.message || "An unexpected error occurred.");
            }
        } catch (error) {
            errorToast("User is not eligible to access this resource");
        }
    };
    return (<>
        <div className="card leave-box" id="leave_sick">
            <div className="card-body">
                <div className="h3 card-title with-switch">
                    Paternity
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
                                            disabled={!paternty}
                                            {...register("noOfDays")}
                                        />
                                    </div>
                                </div>
                            </div>
                            {paternty ? (
                                <div className="leave-right">
                                    <button
                                        className="btn btn-white leave-cancel-btn"
                                        onClick={paterntyClose}
                                    >
                                        Cancel
                                    </button>
                                    <button type="submit"
                                        aria-label="Close"
                                        className="btn btn-primary leave-save-btn">
                                        Save
                                    </button>
                                </div>
                            ) : (
                                <div className="leave-right">
                                    <div
                                        className="leave-edit-btn"
                                        onClick={paterntyShow}
                                    >
                                        Edit
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </form>
            </div>
            {/* <LeaveSettingCustomPolicy /> */}
        </div>
    </>)
}
export default PaternityLeave