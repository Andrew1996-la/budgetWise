import { Oval } from 'react-loader-spinner';
import style from './loading.module.css';

const Loading = () => {
    return (
        <Oval
            visible={true}
            height='80'
            width='80'
            color='#455a64'
            ariaLabel='oval-loading'
            wrapperStyle={{}}
            wrapperClass={style.loader}
        />
    );
};

export default Loading;
