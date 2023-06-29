import { useEffect, useRef } from "react";

const useDidMount = (callBack:any) => {
  const didMount = useRef(true);
  useEffect(() => {
    if (didMount.current) {
      callBack();
      didMount.current = false;
    }
  });
};

export default useDidMount;
