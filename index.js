import { useState } from 'react';

export const IS_FETCHING = 'IS_FETCHING';
export const IS_COMPLETE = 'IS_COMPLETE';
export const IS_ERROR = 'IS_ERROR';

const initState = {
  status: IS_COMPLETE,
  data: null,
  error: null,
};

export default function useAsyncState(asyncFn, initData = null){
  const [state, setState] = useState({ ...initState, data: initData });

  function initiate(...params) {
    setState({ ...initState, status: IS_FETCHING });
    asyncFn(...params)
      .then(val => {
        setState({ status: IS_COMPLETE, data: val, error: null });
      })
      .catch(err => {
        setState({ status: IS_COMPLETE, error: err, val: null });
      });
  }

  return [state, initiate];
}
