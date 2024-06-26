import moment from 'moment';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../../store/authorizationSlice';
import { AppDispatch, RootState } from '../../store/store';
import Loading from '../Loading/Loading';
import styles from './profileInfo.module.css';

const ProfileInfo = () => {
    const dispatch: AppDispatch = useDispatch();
    const email = useSelector(
        (state: RootState) => state.authorizationSlice.profile.email
    );
    const signUpDate = useSelector(
        (state: RootState) => state.authorizationSlice.profile.signUpDate
    );

    const nickName = useSelector(
        (state: RootState) => state.authorizationSlice.profile.name
    );

    const loading = useSelector(
        (state: RootState) => state.authorizationSlice.loadingStatus
    );

    const utcMoment = moment.utc(signUpDate);
    const localMoment = utcMoment.local();
    const localTimeStr = localMoment.format('YYYY-MM-DD');

    useEffect(() => {
        dispatch(getProfile());
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className={styles.profileInfo}>
            {nickName ? <div>Nickname: {nickName}</div> : null}
            <div>Email: {email}</div>
            <div>SignUp date: {localTimeStr}</div>
        </div>
    );
};

export default ProfileInfo;
