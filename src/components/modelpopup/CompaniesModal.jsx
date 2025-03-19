import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { avatar1, avatar19, avatar20, avatar21, company_icon_01, profileuploadimg } from '../../Routes/ImagePath'
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import { companyInitialValues } from '../../utils/constants/companyInfo.ts';
import { companySchema } from '../../utils/validation-schemas/company-basicinfo.ts';
import { yupResolver } from '@hookform/resolvers/yup';
import { errorToast, successToast } from '../../utils/index.ts';
import { COMPANIE_QUERY_KEY, useAddCompanyMutation, useEditCompanyMutation, useGetByIdCompany } from '../../api/hooks/companies/index.ts';
import { useQueryClient } from '@tanstack/react-query';
import { useGetAllClient } from '../../api/hooks/client/index.ts';

const CompaniesModal = ({ id, setSelectedCompanyId }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(companyInitialValues)
  const { data: companyData, isLoading } = useGetByIdCompany(id);
  const { mutateAsync: addCompany } = useAddCompanyMutation();
  const { mutateAsync: editCompany } = useEditCompanyMutation();
  const queryClient = useQueryClient();
    const { data: client } = useGetAllClient();
  const { register, handleSubmit, reset, setValue, formState: { errors, isValid, isSubmitting } } = useForm({
    defaultValues: companyInitialValues,
    resolver: yupResolver(companySchema)
  })
  useEffect(() => {
    if (id && companyData) {
      setFormData(companyData);
      reset(companyData);
    } else {
      setFormData(companyInitialValues)
    }
  }, [id, companyData, reset]);
  const clientOptions = (client?.data || []).map((c) => ({
    label: c.firstName,
    value: c._id,
  }));
  const clientOption = (client?.data || []).map((c) => ({
    label: c.companyName,
    value: c._id,
  }));
  const onSubmitHandler = async () => {
    let response
    try {
      if (id) {
        response = await editCompany(formData)
      } else {
        response = await addCompany(formData);
        reset()
      }

      if (response?.success) {
        successToast(response.message);
        queryClient.invalidateQueries({ queryKey: [COMPANIE_QUERY_KEY] })
        reset();
      } else {
        errorToast(response?.message || 'An unexpected error occurred.');
      }
    } catch (error) {
      errorToast('User is not eligible to access this resource');
    }
  }
  const [fieldOne, setFieldOne] = useState(true);
  const [fieldTwo, setFieldTwo] = useState();
  const [fieldThree, setFieldThree] = useState();
  const [fieldFour, setFieldFour] = useState();

  const FieldsetTwo = () => {
    setFieldOne(false)
    setFieldTwo(true)
    setFieldThree(false)
    setFieldFour(false)
  }

  const FieldsetThree = () => {
    setFieldOne(false)
    setFieldTwo(false)
    setFieldThree(true)
    setFieldFour(false)
  }
  const FieldsetFour = () => {
    setFieldOne(false)
    setFieldTwo(false)
    setFieldThree(false)
    setFieldFour(true)
  }
  const prevStep = () => {
    if (fieldTwo) {
      setFieldOne(true);
      setFieldTwo(false);
    } else if (fieldThree) {
      setFieldTwo(true);
      setFieldThree(false);
    } else if (fieldFour) {
      setFieldThree(true);
      setFieldFour(false);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (selectedOption, { name }) => {
    setFormData({ ...formData, [name]: selectedOption.value });
  };
  const [profileImage, setProfileImage] = useState(null);
  const uploadPic = (event) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      const newFormData = new FormData();
      newFormData.append("profileImage", file);
      for (const key in formData) {
        if (key !== "profileImage") {
          newFormData.append(key, formData[key]);
        }
      }
      for (let [key, value] of newFormData.entries()) {
        console.log(key, value);
      }
      console.log(file, '66666666666666666666');
      setFormData((prevData) => ({
        ...prevData,
        profileImage: file.name,
      }));

      reader.readAsDataURL(file);
    }
  };
  const handleResetImage = () => {
    setProfileImage(null);
  };



  const options = {
    dataoptions: [
      { value: 'select', label: 'Select' },
      { value: 'hendry', label: 'Hendry' },
      { value: 'guillory', label: 'Guillory' },
      { value: 'jami', label: 'Jami' }
    ],
    lastNameOptions: [
      { value: 'select', label: 'Select' },
      { value: 'collins', label: 'Collins' },
      { value: 'konopelski', label: 'Konopelski' },
      { value: 'adams', label: 'Adams' }
    ],
    communicationOptions: [
      { value: 'select', label: 'Select' },
      { value: 'email', label: 'Email' },
      { value: 'call', label: 'Call' },
      { value: 'skype', label: 'Skype' }
    ],
    currencyOptions: [
      { value: 'select', label: 'Select' },
      { value: 'dollar', label: '$' },
      { value: 'euro', label: '€' }
    ],
    languageOptions: [
      { value: 'select', label: 'Select' },
      { value: 'english', label: 'English' },
      { value: 'french', label: 'French' }
    ],
  };

  return (

    <div>
      {/* Add Company */}
      <div className="modal custom-modal fade custom-modal-two modal-padding" id="add_company" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header header-border justify-content-between p-0">
              <h5 className="modal-title">{id ? `Edit Company` : `Add New Company`}</h5>
              <button type="button" className="btn-close position-static" data-bs-dismiss="modal" aria-label="Close" onClick={() => setSelectedCompanyId('')} >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body p-0">
              <div className="add-details-wizard">
                <ul id="progressbar" className="progress-bar-wizard">
                  <li className={fieldOne ? "active" : ""}>
                    <span><i className="la la-user-tie" /></span>
                    <div className="multi-step-info">
                      <h6>Basic Info</h6>
                    </div>
                  </li>
                  <li className={fieldTwo ? "active" : ""}>
                    <span><i className="la la-map-marker" /></span>
                    <div className="multi-step-info">
                      <h6>Address</h6>
                    </div>
                  </li>
                  <li className={fieldThree ? "active" : ""}>
                    <div className="multi-step-icon">
                      <span><i className="la la-icons" /></span>
                    </div>
                    <div className="multi-step-info">
                      <h6>Social Profiles</h6>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="add-info-fieldset">
                <fieldset id="first-field" style={{ display: fieldOne ? "block" : "none" }}>
                  <form action="/company">
                    <div className="form-upload-profile">
                      <h6 className>Profile Image <span> *</span></h6>
                      <div className="profile-pic-upload">
                        <div className="profile-pic">
                          <span><img src={profileImage || 'path/to/default-image.jpg'} alt="Profile" /></span>
                        </div>
                        <div className="employee-field">
                          <div className="mb-0">
                            <div className="image-upload mb-0">
                              <input type="file" onChange={uploadPic} />
                              <div className="image-uploads">
                                <h4>Upload</h4>
                              </div>
                            </div>
                          </div>
                          <div className="img-reset-btn">
                            <Link to="#" onClick={handleResetImage}>Reset</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="contact-input-set">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="input-block mb-3">
                            <label className="col-form-label">Company Name <span className="text-danger">*</span></label>
                            <Select options={clientOption} placeholder="Select Name" name="companyName" onChange={handleSelectChange} />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-block mb-3">
                            <div className="d-flex justify-content-between align-items-center">
                              <label className="col-form-label">Email <span className="text-danger"> *</span></label>
                            </div>
                            <input className="form-control" type="email" name="email" value={formData?.email} onChange={handleInputChange} />

                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-block mb-3">
                            <label className="col-form-label">Phone Number 1<span className="text-danger"> *</span></label>
                            <input className="form-control" type="text" name="phoneNumber1" value={formData?.phoneNumber1} onChange={handleInputChange} />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-block mb-3">
                            <label className="col-form-label">Phone Number 2 </label>
                            <input className="form-control" type="text" name="phoneNumber2" value={formData?.phoneNumber2} onChange={handleInputChange} />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-block mb-3">
                            <label className="col-form-label">Fax <span className="text-danger"> *</span></label>
                            <input className="form-control" type="text" name="fax" value={formData?.fax} onChange={handleInputChange} />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-block mb-3">
                            <label className="col-form-label">Website</label>
                            <input className="form-control" type="text" name="website" value={formData?.website} onChange={handleInputChange} />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-block mb-3">
                            <label className="col-form-label">Tags <span className="text-danger">*</span></label>
                            <input className="input-tags form-control" id="inputBox" type="text" name="tags" value={formData?.tags} onChange={handleInputChange} />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-block mb-3">
                            <div className="d-flex justify-content-between align-items-center">
                              <label className="col-form-label">Deals <span className="text-danger">*</span></label>
                            </div>
                            <Select options={options.dataoptions} placeholder="Select Options" name="deals" value={formData?.deals} onChange={handleSelectChange} />

                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-block mb-3">
                            <div className="d-flex justify-content-between align-items-center">
                              <label className="col-form-label">Owner <span className="text-danger">*</span></label>
                            </div>
                            <Select options={clientOptions} placeholder="Select Owner" name="owner" onChange={handleSelectChange} />

                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <div className="input-block mb-3">
                            <label className="col-form-label">Industry <span className="text-danger">*</span></label>
                            <Select options={options.lastNameOptions} placeholder="Last Name Options" name="industry" onChange={handleSelectChange} />

                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <div className="input-block mb-3">
                            <label className="col-form-label">Contact <span className="text-danger">*</span></label>
                            <Select options={options.communicationOptions} placeholder="Communication Options" name="contact" onChange={handleSelectChange} />

                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-block mb-3">
                            <label className="col-form-label">Currency <span className="text-danger">*</span></label>
                            <Select options={options.currencyOptions} placeholder="Currency Options" name="currency" onChange={handleSelectChange} />

                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-block mb-3">
                            <label className="col-form-label">Language <span className="text-danger">*</span></label>
                            <Select options={options.languageOptions} placeholder="Language Options" name="language" onChange={handleSelectChange} />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="input-block mb-3">
                            <label className="col-form-label">About Company<span className="text-danger">*</span></label>
                            <textarea className="form-control" rows={5} defaultValue={""} name="aboutCompany" onChange={handleInputChange} />
                          </div>
                        </div>
                        <div className="col-lg-12 text-end form-wizard-button">
                          <button className="button btn-lights reset-btn" type="reset" onClick={prevStep}>Back</button>
                          <button className="btn btn-primary wizard-next-btn" type="button" onClick={FieldsetTwo}>Next</button>
                        </div>
                      </div>
                    </div>
                  </form>
                </fieldset>
                <fieldset style={{ display: fieldTwo ? "block" : "none" }}>
                  <form action="/company">
                    <div className="contact-input-set">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="input-block mb-3">
                            <label className="col-form-label">Primary Address<span className="text-danger"> *</span></label>
                            <input className="form-control" type="text" name="primaryAddress" value={formData?.primaryAddress} onChange={handleInputChange} />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="input-block mb-3">
                            <label className="col-form-label">Secondary Address<span className="text-danger"> *</span></label>
                            <input className="form-control" type="text" name="secondaryAddress" value={formData?.secondaryAddress} onChange={handleInputChange} />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-block mb-3">
                            <label className="col-form-label">City <span className="text-danger"> *</span></label>
                            <input className="form-control" type="text" name="city" value={formData?.city} onChange={handleInputChange} />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-block mb-3">
                            <label className="col-form-label">State / Province <span className="text-danger"> *</span></label>
                            <input className="form-control" type="text" name="state" value={formData?.state} onChange={handleInputChange} />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-block mb-3">
                            <label className="col-form-label">Country <span className="text-danger">*</span></label>
                            <input className="form-control" type="text" name="country" value={formData?.country} onChange={handleInputChange} />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-block mb-3">
                            <label className="col-form-label">Zipcode <span className="text-danger"> *</span></label>
                            <input className="form-control" type="text" name="zipCode" value={formData?.zipCode} onChange={handleInputChange} />
                          </div>
                        </div>
                        <div className="col-lg-12 text-end form-wizard-button">
                          <button className="button btn-lights reset-btn" type="reset" onClick={prevStep}>Back</button>
                          <button className="btn btn-primary wizard-next-btn" type="button" onClick={FieldsetThree}> Next</button>
                        </div>
                      </div>
                    </div>
                  </form>
                </fieldset>
                <fieldset style={{ display: fieldThree ? "block" : "none" }}>
                  <form onSubmit={handleSubmit(onSubmitHandler)} action="/company">
                    <div className="contact-input-set">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="input-block mb-3">
                            <label className="col-form-label">Facebook</label>
                            <input className="form-control" type="text" name="facebook" value={formData?.facebook} onChange={handleInputChange} />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="input-block mb-3">
                            <label className="col-form-label">Twitter</label>
                            <input className="form-control" type="text" name="twitter" value={formData?.twitter} onChange={handleInputChange} />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="input-block mb-3">
                            <label className="col-form-label">Linkedin</label>
                            <input className="form-control" type="text" name="linkedin" value={formData?.linkedin} onChange={handleInputChange} />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="input-block mb-3">
                            <label className="col-form-label">YouTube</label>
                            <input className="form-control" type="text" name="youtube" value={formData?.youtube} onChange={handleInputChange} />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="input-block mb-3">
                            <label className="col-form-label">Instagram</label>
                            <input className="form-control" type="text" name="instagram" value={formData?.instagram} onChange={handleInputChange} />
                          </div>
                        </div>
                        <div className="col-lg-12 text-end form-wizard-button">
                          <button className="button btn-lights reset-btn" type="reset" onClick={prevStep}>Back</button>
                          <button
                            className="btn btn-primary wizard-next-btn"
                            type="button"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={onSubmitHandler}
                          >
                            {id ? "Update" : "Save"}
                          </button>

                        </div>
                      </div>
                    </div>
                  </form>
                </fieldset>
               
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Add Company */}
      {/* Export */}
      <div className="modal custom-modal fade modal-padding" id="export" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header header-border justify-content-between p-0">
              <h5 className="modal-title">Export</h5>
              <button type="button" className="btn-close position-static" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body p-0">
              <form action="/companies">
                <div className="row">
                  <div className="col-md-12">
                    <div className="input-block mb-3">
                      <h5 className="mb-3">Export</h5>
                      <div className="status-radio-btns d-flex">
                        <div className="people-status-radio">
                          <input type="radio" className="status-radio" id="pdf" name="export-type" defaultChecked />
                          <label htmlFor="pdf">Person</label>
                        </div>
                        <div className="people-status-radio">
                          <input type="radio" className="status-radio" id="excel" name="export-type" />
                          <label htmlFor="excel">Organization</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <h4 className="mb-3">Filters</h4>
                    <div className="input-block mb-3">
                      <label className="col-form-label">Fields <span className="text-danger">*</span></label>
                      <Select options={options.countryOptions} placeholder="Country Options" />

                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">From Date <span className="text-danger">*</span></label>
                      <div className="cal-icon">
                        <input className="form-control floating datetimepicker" type="text" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">To Date <span className="text-danger">*</span></label>
                      <div className="cal-icon">
                        <input className="form-control floating datetimepicker" type="text" />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 text-end form-wizard-button">
                    <button className="button btn-lights reset-btn" type="reset" data-bs-dismiss="modal">Reset</button>
                    <button className="btn btn-primary" type="submit">Export Now</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Export */}
    </div>
  )
}

export default CompaniesModal