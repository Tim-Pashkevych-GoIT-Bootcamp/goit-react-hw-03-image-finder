import { Bars } from 'react-loader-spinner';
import css from './Loader.module.css';

const Loader = () => {
  return (
    <div className={css.loaderBackdrop}>
      <div className={css.loaderModal}>
        <Bars
          height="80"
          width="80"
          color="white"
          ariaLabel="bars-loading"
          wrapperStyle=""
          wrapperClass={css.loader}
          visible={true}
        />
      </div>
    </div>
  );
};

export default Loader;
