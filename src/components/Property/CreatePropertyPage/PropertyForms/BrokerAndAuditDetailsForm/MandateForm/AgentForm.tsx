import Button from '@/components/core/Button';
import Form from '@/components/core/Form';
import { DropdownOption } from '@/constant/DropdownOptions';
import { saveAgentResolver } from '@/form-resolvers/create-property';
import { FCC } from '@/helpers/FCC';
import { AgentDetails, PropertyAgentsDetails } from '@/infrastructure/store/api/property/property-type';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';

interface Props {
  handleOnSubmitAgent: SubmitHandler<FieldValues>;
  initialValue?: PropertyAgentsDetails | undefined;
  agents?: AgentDetails[] | undefined;
  isStepForm?: boolean;
  addAgent?: boolean;
  setAddAgent?: React.Dispatch<React.SetStateAction<boolean>>;
}

const AgentForm: FCC<Props> = ({ initialValue, agents, isStepForm, handleOnSubmitAgent, addAgent, setAddAgent }) => {
  const useFormReturn = useForm<PropertyAgentsDetails>({
    resolver: yupResolver(saveAgentResolver),
    defaultValues: initialValue,
  });
  const { reset, setValue, getValues } = useFormReturn;

  useEffect(() => {
    // Reset default value in form
    if (initialValue) {
      setValue('agentID', initialValue.agentID);
      setValue('agentType', initialValue.agentType);
      reset(initialValue);
    }
  }, [initialValue, setValue, reset, useFormReturn]);
  return (
    <React.Fragment>
      {isStepForm && !addAgent && (
        <div className="flex justify-end">
          <Button className="ml-auto" onClick={() => setAddAgent && setAddAgent(!addAgent)}>
            Add Agent
          </Button>
        </div>
      )}
      {
        addAgent && (
          // <div className="p-4 md:px-2 rounded-lg border border-gray-blue-2">
          <Form useFormReturn={useFormReturn} onSubmit={handleOnSubmitAgent}>
            {!isStepForm && <h3 className="font-bold mb-4 space-y-4">Agent Details</h3>}
            <Form.Select
              key={getValues('agentID')}
              label="Agent"
              name="agentID"
              options={agents?.map((option) => ({
                value: option.id,
                name: `${option.firstName} ${option.lastName}`,
              }))}
            />
            <Form.Select
              key={getValues('agentType')}
              label="Agent Type"
              name="agentType"
              options={DropdownOption.AgentType}
            />
            <Form.Checkbox label="Is Visible On Web" name="isVisibleOnWeb" />
            <div className="flex justify-end mt-4">
              <div>
                {isStepForm && (
                  <Button
                    onClick={() => setAddAgent && setAddAgent(false)}
                    btnType="secondary-gray"
                    className="ml-auto mr-2"
                  >
                    Cancel
                  </Button>
                )}
                <Button type="submit" className="ml-auto">
                  Save Agent
                </Button>
              </div>
            </div>
          </Form>
        )
        // </div>
      }
    </React.Fragment>
  );
};

export default AgentForm;
