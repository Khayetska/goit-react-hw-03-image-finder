import { MutatingDots } from 'react-loader-spinner';
import css from './Loader.module.css';

export const Loader = () => {
  return (
    <div className={css.loaderBackground}>
      <MutatingDots
        height="100"
        width="100"
        color="#3f51b5"
        secondaryColor="#3f51b5"
        radius="12.5"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};
