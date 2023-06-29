import React from 'react';
import { FCC } from '@/helpers/FCC';
import { PropertyAgentsDetails } from '@/infrastructure/store/api/property/property-type';
import { EditIcon, PhoneIcon, TrashIcon } from '../Icon';
import EmailIcon from '../Icon/app-wide/EmailIcon';
import IconButton from '../IconButton';
import { useDeletePropertyAgentMutation } from '@/infrastructure/store/api/property/property-api';
import { HandleNotification } from '../ToastAlert';
import { useDialogState } from '@/hooks/useDialogState';
import { IMAGES } from 'src/assets/images';
import AlertBox from '../Alert';

export interface BrokerCompProps {
  name?: string | undefined;
  agentType?: number;
  agent?: PropertyAgentsDetails | null;
  handleDefaultAgent?: (agent: PropertyAgentsDetails) => void;
}

const Broker: FCC<BrokerCompProps> = ({ name, agentType, agent, handleDefaultAgent }) => {
  const [deleteAgent] = useDeletePropertyAgentMutation();
  const { isOpen, setCloseDialog, setOpenDialog } = useDialogState();
  const handleDeleteAgent = async () => {
    const res = await deleteAgent({ propertyID: agent?.propertyID, agentID: agent?.agentID }).unwrap();
    res && res?.message && HandleNotification(res.message, res.success);
  };
  return (
    <figure className="border p-2 rounded border-1.5 border-gray-blue-3 bg-white">
      <div className="flex gap-2 items-center">
        {/* TODO: Change to Image */}
        <div className="h-10 w-10 border border-gray-blue-2 bg-gray-blue-3 rounded-md">
          {agent?.profilePicture ? (
            <img className="h-full" src={agent?.profilePicture} alt="Property" />
          ) : (
            <img className="h-full border-2 rounded-md" src={IMAGES.AGENTAVATAR} alt="agent" />
          )}
        </div>
        <figcaption className="flex flex-col">
          <div className="flex items-center w-36">
            <span className="font-bold typography-label inline">Agent</span>
            {agentType === 1 ||
              (agent?.agentType === 1 && (
                <span className="inline typography-label rounded-xl px-2 py-0.5 ml-2 bg-gray-200 text-center text-white bg-blue-600">
                  Main
                </span>
              ))}
          </div>
          <span className="typography-body w-36">{agent?.agentName || name || 'N/A'}</span>
        </figcaption>
        <span className="ml-auto flex items-start divide-x">
          <div className={`${handleDefaultAgent && 'pr-4'}`}>
            <div className="flex items-center hover:text-blue-800 text-sm">
              <EmailIcon />
              <a
                title={`Email: ${agent?.agentEmail}`}
                href={`mailto:${agent?.agentEmail}`}
                onClick={(e) => e.stopPropagation()}
              >
                {agent?.agentEmail.substring(0, 15) + '...' || ''}
              </a>
            </div>
            <div className="flex text-sm hover:text-blue-800">
              <PhoneIcon />
              <a
                title={`Phone: ${agent?.agentPhoneNumber}`}
                href={`tel:${agent?.agentPhoneNumber}`}
                onClick={(e) => e.stopPropagation()}
              >
                {agent?.agentPhoneNumber || ''}
              </a>
            </div>
          </div>
          {handleDefaultAgent && (
            <div className="flex justify-center items-center h-12 px-4">
              <IconButton
                type="button"
                className="text-gray-blue-6"
                onClick={() => {
                  if (handleDefaultAgent && agent) {
                    handleDefaultAgent(agent);
                  }
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                type="button"
                className="text-red"
                onClick={setOpenDialog}
              >
                <TrashIcon />
              </IconButton>
              <AlertBox
                dialogTitle={"Delete Agent"}
                isDialogOpen={isOpen}
                handleConfirmDialog={handleDeleteAgent}
                handleCloseDialog={setCloseDialog}
              >
                {"Are you sure you want to delete this item?"}
              </AlertBox>
            </div>
          )}
        </span>
      </div>
    </figure>
  );
};

export default Broker;
