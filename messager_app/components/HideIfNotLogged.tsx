import {useAppSelector} from '../hook/ReduxHooks';

interface HideIfLoggedPropsInterface {
    children: JSX.Element;
}

export default function HideIfNotLogged({children}: HideIfLoggedPropsInterface) {

    const loggedUser = useAppSelector(state => state.userLogged);

    if (!loggedUser.JWT) {
        return <></>
    }
    return children
}