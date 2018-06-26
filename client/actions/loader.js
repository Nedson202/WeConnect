import { TOGGLELOADER } from './types';

const loader = () => ({
  type: TOGGLELOADER,
  loader: { isLoading: false }
});

export default loader;