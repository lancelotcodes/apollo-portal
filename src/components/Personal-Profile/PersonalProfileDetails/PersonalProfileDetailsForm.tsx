import React from "react";
import Button from "@/components/core/Button";
import Form from "@/components/core/Form";
import { UploadIcon } from "@/components/core/Icon";
import { useForm } from "react-hook-form";

const PersonalProfileDetailsForm = () => {
  const useFormReturm = useForm();

  const handleSubmit = (e: any) => {
    console.log(e);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex md:block flex-col items-center">
        <div className="w-[232px]">
          <div className="rounded bg-gray-blue-2 h-[232px] w-[232px]"></div>

          <div className="mt-4">
            <Button
              btnType="primary-black"
              className="w-full"
              icon={<UploadIcon />}>
              UPLOAD NEW PHOTO
            </Button>
          </div>
        </div>
      </div>

      <Form
        useFormReturn={useFormReturm}
        onSubmit={handleSubmit}
        className="flex-1 flex flex-col lg:flex-row w-full space-y-4 lg:space-y-0">
        <div className="gap-4 px-5 w-full lg:w-1/2 space-y-4">
          <Form.Input name="teamId" placeholder="Team ID" label="Team ID" />
          <Form.Input
            name="usernanme"
            placeholder="Usernanme"
            label="Usernanme"
          />
          <Form.Input
            name="firstName"
            placeholder="First name"
            label="First name"
          />
          <Form.Input
            name="lastName"
            placeholder="Last name"
            label="Last name"
          />
          <Form.Input name="email" placeholder="E-mail" label="E-mail" />
          <Form.Input
            name="phoneNumber"
            placeholder="Phone number"
            label="Phone number"
          />
        </div>

        <div className="gap-4 px-5 w-full lg:w-1/2 space-y-4">
          <Form.InputPassword
            name="oldPassword"
            placeholder="Old Password"
            label="Old Password"
          />
          <Form.InputPassword
            name="newPassword"
            placeholder="New Password"
            label="New Password"
          />
          <Form.InputPassword
            name="confirmNewPassword"
            placeholder="Confirm New Pasword"
            label="Confirm New Pasword"
          />
        </div>
      </Form>
    </div>
  );
};

export default PersonalProfileDetailsForm;
