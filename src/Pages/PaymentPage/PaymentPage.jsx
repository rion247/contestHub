import { loadStripe } from "@stripe/stripe-js";
import ChekOutForm from "./ChekOutForm/ChekOutForm";
import { Elements } from "@stripe/react-stripe-js";

const PaymentPage = () => {

    const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY);
    
    return (
        <Elements stripe={stripePromise}>
            <ChekOutForm />
        </Elements>
    );
};

export default PaymentPage;