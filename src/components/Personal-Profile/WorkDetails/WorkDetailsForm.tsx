import Form from "@/components/core/Form";
import React from "react";
import { useForm } from "react-hook-form";

const WorkDetailsForm = () => {
  const useFormReturm = useForm();

  const handleSubmit = (e: any) => {
    console.log(e);
  };

  return (
    <Form
      useFormReturn={useFormReturm}
      onSubmit={handleSubmit}
      className="flex-1 flex flex-col lg:flex-row w-full space-y-4 lg:space-y-0">
      <div className="gap-4 px-5 w-full grid grid-cols-1 md:grid-cols-2 ">
        <Form.Input name="teamId" placeholder="Team ID" label="Team ID" />

        <Form.Select
          name="accessLevel"
          label="Access Level"
          options={[
            { name: "User", value: "User" },
            { name: "Admin", value: "Admin" }
          ]}
          className="row-start-3 md:row-start-1 md:col-start-2"
        />

        <Form.Input
          name="usernanme"
          placeholder="Usernanme"
          label="Usernanme"
        />

        <Form.Select
          name="accessLevel"
          label="Access Level"
          options={[
            { name: "User", value: "User" },
            { name: "Admin", value: "Admin" }
          ]}
        />
      </div>
    </Form>
  );
};

export default WorkDetailsForm;
