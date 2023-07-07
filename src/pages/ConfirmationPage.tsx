import { useParams } from "react-router-dom";
import ConfirmationContent from "../components/ConfirmationContent";

const ConfirmationPage = () => {
    const params = useParams();
    const { state } = params;
    return (
        <ConfirmationContent success={state === 'success'} />
    );
};

export default ConfirmationPage;
