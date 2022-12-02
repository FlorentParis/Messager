import { useAppSelector } from "../hook/ReduxHooks";

interface HideIfLoggedPropsInterface {
    children: JSX.Element;
}

export default function HideIfLogged({children}: HideIfLoggedPropsInterface) {

    const loggedUser = useAppSelector(state => state.userLogged);

    console.log(loggedUser);

    if (loggedUser.JWT) {
        return <></>
    }
    return children
}