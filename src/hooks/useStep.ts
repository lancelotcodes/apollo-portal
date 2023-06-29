import { SessionUtils } from '@/helpers/session-storage';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react';

export interface StepHelpers {
  goToNextStep: () => void;
  goToPrevStep: () => void;
  goToNextUnitStep: () => void;
  reset: () => void;
  canGoToNextStep: boolean;
  canGoToPrevStep: boolean;
  isValidation: boolean;
  setStep: Dispatch<SetStateAction<number>>;
}

type setStepCallbackType = (step: number | ((step: number) => number)) => void;

function useStep(maxStep: number): [number, StepHelpers] {
  const isStepValidate = SessionUtils.getItem('isStepValidated') ?? skipToken;
  const stepsValues = Object.values(isStepValidate) ?? skipToken;
  const [currentStep, setCurrentStep] = useState(0);

  const canGoToNextStep = useMemo(
    () => stepsValues[currentStep] === true && currentStep <= maxStep,
    [stepsValues, currentStep, maxStep],
  );
  const canGoToNextUnitStep = useMemo(() => currentStep <= maxStep, [currentStep, maxStep]);

  const canGoToPrevStep = useMemo(() => currentStep >= 1, [currentStep]);
  const isValidation = useMemo(() => stepsValues[currentStep - 1] === true, [stepsValues, currentStep]);
  const setStep = useCallback<setStepCallbackType>(
    (step) => {
      // Allow value to be a function so we have the same API as useState
      const newStep = step instanceof Function ? step(currentStep) : step;
      if (newStep >= 0 && newStep <= maxStep && stepsValues[newStep] === true) {
        setCurrentStep(newStep);
        return;
      }

      throw new Error('Step not valid');
    },
    [maxStep, currentStep, stepsValues],
  );

  const goToNextStep = useCallback(() => {
    if (canGoToNextStep && stepsValues[currentStep] === true) {
      setCurrentStep((step) => step + 1);
    }
  }, [canGoToNextStep, stepsValues, currentStep]);

  const goToNextUnitStep = useCallback(() => {
    if (canGoToNextUnitStep) {
      setCurrentStep((step) => step + 1);
    }
  }, [canGoToNextUnitStep]);

  const goToPrevStep = useCallback(() => {
    if (canGoToPrevStep) {
      setCurrentStep((step) => step - 1);
    }
  }, [canGoToPrevStep]);

  const reset = useCallback(() => {
    setCurrentStep(0);
  }, []);

  return [
    currentStep,
    {
      goToNextStep,
      goToPrevStep,
      goToNextUnitStep,
      canGoToNextStep,
      canGoToPrevStep,
      isValidation,
      setStep,
      reset,
    },
  ];
}

export default useStep;
