import React, { useEffect, memo, useState } from 'react'
import { useForm, useFieldArray, FormContext, useFormContext } from "react-hook-form"
import { withFirebase } from '../../../utils/Firebase'
import { FiPlusCircle, FiXCircle } from "react-icons/fi"
import Input from '../../atoms/Input'
import Textarea from '../../atoms/Textarea'
import Button from '../../atoms/Button'
import CheckBox from '../../atoms/CheckBox'
import Switch from 'react-switch';
import DatePicker from 'react-datepicker'
import PhoneInput from 'react-phone-number-input'
import UploadImage from '../../atoms/UploadImage';

import 'react-phone-number-input/style.css'
import 'react-datepicker/dist/react-datepicker.css'

const PavilionDetailRegister = () => {

  const { handleSubmit, register, errors, control, setValue, watch } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      curators: [],
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'curators',
  });
  const addMoreCurator = () => {
    append({
      curators: {
        name: '',
        curatorLink: '',
        shortBio: '',
      }
    })
  }
  const removeCurator = (curatorIndex) => remove(curatorIndex)

  const addMoreOrganizer = () => {}

  const [isWillingToBeContactedByMedia, setIsWillingToBeContactedByMedia] = useState(true)
  const [isVenueChecked, setIsVenueChecked] = useState(true)
  const [isVenueSecured, setIsVenueSecured] = useState(true)
  const [isJoinedSeekingVenues, setIsJoinedSeekingVenues] = useState(true)
  const [isOpenCalls, setIsOpenCalls] = useState(true)

  const onSubmit = () => {}
  const handleOnClickSubmit = () => {}
  const handleSupportMaterials = () => {}
  const handlePoster = () => {}
  
  useEffect(() => {
    console.log(watch())
    if(isVenueChecked && isVenueSecured) {
      register({
        name: 'startDate',
        required: 'This field is required',
        defaultValues: ''
      })
      register({
        name: 'endDate',
        required: 'This field is required',
        defaultValues: ''
      })
      register({
        name: 'openingHours',
        required: 'This field is required',
        defaultValues: ''
      })
      register({
        name: 'closingHours',
        required: 'This field is required',
        defaultValues: ''
      })
      register({
        name: 'telephoneNumber',
        required: 'This field is required',
        defaultValues: ''
      })
    }
  }, [fields, register, isVenueChecked, isVenueSecured])

  const handleToggleIsWillingToBeContactedByMedia = () => setIsWillingToBeContactedByMedia(!isWillingToBeContactedByMedia);
  const handleSwitchVenue = () => setIsVenueChecked(!isVenueChecked)
  const handleSwitchVenueSecured = () => setIsVenueSecured(!isVenueSecured)
  const handleToggleIsJoinedSeekingVenues = () => setIsJoinedSeekingVenues(!isJoinedSeekingVenues)
  const handleSwitchOpenCalls = () => setIsOpenCalls(!isOpenCalls)

  const handleStartDate = (startDate) => setValue('startDate', startDate)
  const handleEndDate = (endDate) => setValue('endDate', endDate)
  const handleOpeningHours = (hours) => setValue('openingHours', hours)
  const handleClosingHours = (hours) => setValue('closingHours', hours)
  const handleChangeTelephoneNumber = (telephoneNumber) => setValue('telephoneNumber', telephoneNumber)

  const startDate = watch('startDate')
  const endDate = watch('endDate')
  const openingHours = watch('openingHours')
  const closingHours = watch('closingHours')
  const telephoneNumber = watch('telephoneNumber')

  return (
    <div className="home container">
      <div className="home__details">
        <h1 className="home__title">More detail on Pavilion Registration</h1>
      </div>

      <div className="home__register">
        <div className="home__register__form">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="home__register__form__title">Curators</div>
            <p className="home__register__form__paragraph">​Curator(s) involved (if applicable)</p>
            <div className="home__register__form__list__container">
              {
                fields.map((curator, index) => (
                  <div className="home__register__form__list__element" key={curator.id}>
                    <div className="home__register__form__list__element__close">
                      <FiXCircle
                        onClick={() => removeCurator(index)}
                      />
                    </div>
                    <Input
                      name={`curators[${index}].name`}
                      type="text"
                      labelName="Name"
                      reference={register}
                      errors={errors}
                    />
                    <Input
                      name={`curators[${index}].curatorLink`}
                      type="text"
                      labelName="Individual curators’s links (website, portfolio, etc)"
                      reference={register}
                      errors={errors}
                    />
                    <Input
                      name={`curators[${index}].shortBio`}
                      type="textarea"
                      labelName="​Short Bio of each artist (Max 250 words)"
                      reference={register}
                      errors={errors}
                    />
                  </div>
                ))
              }
            </div>
            <Button
              onClick={addMoreCurator}
              type="button"
              className="home__register__form__add-btn"
            >
              <FiPlusCircle/> add more curator
            </Button>

            <div className="home__register__form__title">Organizers</div>
            <p className="home__register__form__paragraph">​Organizations/Groups/Collectives/ Etc involved (if applicable)</p>
            <div className="home__register__form__list__container">
              
            </div>
            <Button
              onClick={addMoreOrganizer}
              type="button"
              className="home__register__form__add-btn"
            >
              <FiPlusCircle/> add more organizer
            </Button>

            <div className="home__register__form__title">Contacts</div>
            <Input
              name="personNameContact"
              type="text"
              labelName="Contact Person’s name"
              required
              reference={register({
                required: "This field is required",
              })}
              errors={errors}
            />
            <Input
              name="personEmailContact"
              type="text"
              labelName="Contact Person’s Email (will not be made public)"
              required
              reference={register({
                required: "This field is required",
              })}
              errors={errors}
            />
            <CheckBox
              value={isWillingToBeContactedByMedia}
              labelName="Is the Contact Person willing to be contacted by the media for interviews or other information they may be interested in? (default is yes)"
              onClick={handleToggleIsWillingToBeContactedByMedia}
              required
              errors={errors}
            />
            <Input
              name="pavilionWebsite"
              type="text"
              labelName="Pavilion website"
              reference={register()}
            />
            <Input
              name="pavilionPublicEmail"
              type="text"
              labelName="Public email"
              required
              reference={register({
                required: "This field is required",
              })}
              errors={errors}
            />
            <Input
              name="pavilionOtherContact"
              type="text"
              labelName="Other contacts (public)"
              required
              reference={register({
                required: "This field is required",
              })}
              errors={errors}
            />
            <Input
              name="pavilionMailingAddress"
              type="text"
              labelName="Mailing address (private, only used if we need to send you materials such as posters or guidebooks, etc)"
              required
              reference={register({
                required: "This field is required",
              })}
              errors={errors}
            />

            <div className="home__register__form__title">Venue</div>
            <p className="home__register__form__paragraph">
              Will your pavilion have a physical location?
            </p>
            <Switch
              className="home__register__form__switch-container"
              onChange={handleSwitchVenue} 
              checked={isVenueChecked}
              onColor="#3fb557"
              offColor="#2F2E2E"
            />
            {
              isVenueChecked
                ? <div>
                  <p className="home__register__form__paragraph">
                    Have you already secured your venue?
                  </p>
                  <div className="home__register__form__switch-container">
                    <Switch
                      onChange={handleSwitchVenueSecured} 
                      checked={isVenueSecured}
                      onColor="#3fb557"
                      offColor="#2F2E2E"
                    />
                  </div>
                  {
                    isVenueSecured
                      ? <>
                          <Input
                            name="venueLocation"
                            type="text"
                            labelName="Venue/Location"
                            required
                            reference={register({
                              required: 'this field is required'
                            })}
                            errors={errors}
                          />
                          <Input
                            name="streetAddress"
                            type="text"
                            labelName="Street Address"
                            required
                            reference={register({
                              required: 'this field is required'
                            })}
                            errors={errors}
                          />
                          <Input
                            name="googleMapLink"
                            type="text"
                            labelName="Google Maps link to venue"
                            required
                            reference={register({
                              required: 'this field is required'
                            })}
                            errors={errors}
                          />
                          <div className="input__label__container">
                            <div className="input__label__asterisk">*</div>
                            <div className="home__register__form__label">Dates</div>
                          </div>
                          <div className="home__register__form__date-container">
                            <div className="home__register__form__label__date">Start</div>
                            <DatePicker
                              name="startDate"
                              selected={startDate} 
                              onChange={date => handleStartDate(date)}
                            />
                            <div className="home__register__form__label__date">End</div>
                            <DatePicker
                              name="endDate"
                              selected={endDate} 
                              onChange={date => handleEndDate(date)}
                            />
                          </div>
                          <div className="input__label__container">
                            <div className="input__label__asterisk">*</div>
                            <div className="home__register__form__label">Opening Hour</div>
                          </div>
                          <div className="home__register__form__date-container">
                            <div className="home__register__form__label__date">Start</div>
                            <DatePicker
                              name="openingHours"
                              selected={openingHours} 
                              onChange={hour => handleOpeningHours(hour)}
                              showTimeSelect
                              showTimeSelectOnly
                              timeCaption="Time"
                              dateFormat="h:mm aa"
                            />
                            <div className="home__register__form__label__date">End</div>
                            <DatePicker
                              name="closingHours"
                              selected={closingHours} 
                              onChange={hour => handleClosingHours(hour)}
                              showTimeSelect
                              showTimeSelectOnly
                              timeCaption="Time"
                              dateFormat="h:mm aa"
                            />
                          </div>
                          <div className="input__label__container">
                            <div className="input__label__asterisk">*</div>
                            <div className="home__register__form__label">telephone number</div>
                          </div>
                          <PhoneInput
                            name="telephoneNumber"
                            placeholder=""
                            value={telephoneNumber}
                            onChange={telephone => handleChangeTelephoneNumber(telephone)}
                            defaultCountry="TH"
                          />
                        </>
                      : <CheckBox
                          value={isJoinedSeekingVenues}
                          labelName="Would you like to be added to a register of Pavilions Seeking Venues?"
                          onClick={handleToggleIsJoinedSeekingVenues}
                          required
                        />
                  }
                </div>
                : null
              }

              <div className="home__register__form__title">Social Media</div>
              <p className="home__register__form__paragraph">
                Pavilions should create social media 
                identities specifically for the pavilion, 
                rather than using existing pages for your 
                previous/existing work (those pages 
                can be listed above in the curators/ 
                artists/organizers’s individual links).
              </p>
              <Input
                name="pavilionFacebook"
                type="text"
                labelName="Facebook"
                reference={register}
              />
              <Input
                name="pavilionInstagram"
                type="text"
                labelName="Instagram"
                reference={register}
              />
              <Input
                name="pavilionTwitter"
                type="text"
                labelName="Twitter"
                reference={register}
              />
              <Input
                name="pavilionOtherSocialMedias"
                type="text"
                labelName="Others"
                reference={register}
              />

              <div className="home__register__form__title">Open Calls</div>
              <p className="home__register__form__paragraph">
                We encourage pavilions to use open calls to further
                broaden the reach and scope of the work within your
                pavilion and within the biennial. We will be actively
                promoting all of the various open calls from pavilions.
              </p>
              <div className="input__label__container">
                <div className="home__register__form__label">
                  Will your pavilion involve any kind of Open Call?
                </div>
              </div>
              <div className="home__register__form__switch-container">
                <Switch
                  className="home__register__form__switch-container"
                  onChange={handleSwitchOpenCalls} 
                  checked={isOpenCalls}
                  onColor="#3fb557"
                  offColor="#2F2E2E"
                />
              </div>
              {
                isOpenCalls
                  ? <>
                    <Input
                      name="shortTextOpenCalls"
                      type="text"
                      labelName="Short text for open call (maximum 250 characters)"
                      reference={
                        register({
                          maxLength: {
                            value: 250,
                            message: 'Maximum 250 characters'
                          }
                        })
                      }
                    />
                    <Textarea
                      name="longerTextOpenCalls"
                      type="textarea"
                      labelName="Longer description of Open Call"
                    />
                    <Input
                      name="opencallsUrl"
                      type="text"
                      labelName="URL for more information (website, social media link)"
                    />
                    <Textarea
                      name="submissionRequirements"
                      type="text"
                      labelName="Describe the submission requirements and process in 250 words or less"
                    />
                    <Input
                      name="opencallsPublicEmail"
                      type="text"
                      labelName="Public Email"
                    />
                    <Input
                      name="opencallsPhoneNumber"
                      type="text"
                      labelName="Phone Number"
                    />
                    <Input
                      name="openCallsOtherPublicContact"
                      type="text"
                      labelName="Other Public Contact"
                    />
                  </>
                  : null
              }

              <div className="home__register__form__title">Support Materials</div>
              <p className="home__register__form__paragraph">
                Upload 3-5 publicity images (without text). Permission must be granted
                to BB to use images for publicity, minimum file size 1 - 2 mb. 
                Label the images by <br/>
                BB2020_Pavilion_Artist_ Titleofwork.jpg
              </p>
              <UploadImage
                onChange={handleSupportMaterials}
              />
              <p className="home__register__form__paragraph">
                Upload 1-2 poster images to represent the pavilion.
              </p>
              <UploadImage
                onChange={handlePoster}
              />
              <Input
                name="videoMaterial"
                type="text"
                labelName="Youtube or vimeo links for video material"
                required
                reference={
                  register({
                    required: 'this field is required'
                  })
                }
                errors={errors}
              />
              <Input
                name="audioMaterial"
                type="text"
                labelName="Links for audio material (soundcloud, bandcamp, etc)"
                required
                reference={
                  register({
                    required: 'this field is required'
                  })
                }
                errors={errors}
              />

              <Button
                className="home__register__form__submit-btn"
                type="submit"
                onClick={handleOnClickSubmit}
              />
          </form>
        </div>
      </div>
    </div>
  )
}

export default withFirebase(PavilionDetailRegister)
