import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Container from "../../../components/Shared/Container";
import useAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth/useAuth";
import useAxiosPublic from './../../../Hooks/useAxiosPublic/useAxiosPublic';
import { toast } from "react-toastify";
import LoadingSpinner from "../../../LoadingSpinner/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";

const ChekOutForm = () => {

    const stripe = useStripe();
    const elements = useElements();
    const [cardError, SetCardError] = useState('');
    const [clientSecret, SetClientSecret] = useState('');
    const [transactionId, SetTransactionId] = useState('');
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const location = useLocation();

    const singleContestData = useLoaderData();

    const totalPrice = singleContestData?.contestPrice;
    // console.log(totalPrice)
    const price = { price: totalPrice };
    // console.log(price)   

    const userInfo = {
        participantEmail: user.email,
        participantName: user.displayName,
    }

    useEffect(() => {
        // fetch client secret
        if (totalPrice > 1) {
            axiosSecure.post('/create-payment-intent', price)
                .then(res => {
                    SetClientSecret(res.data.clientSecret)
                })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const title = singleContestData?.contestName;

    const { isPending, error, data: backEndData = [] } = useQuery({
        queryKey: ['participantsData', title],
        queryFn: async () => {
            const { data } = await axiosPublic(`/participantDataIsExist/${title}`);
            return data;
        }
    })

    if (isPending) return <LoadingSpinner />

    if (error) return toast.error(error.message);

    if (backEndData.contestName === title) {
        navigate(location?.state ? location?.state : '/');
        return toast.error('Sorry!!!Already Applied.');
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            SetCardError(error.message);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            SetCardError('');
        }

        const { paymentIntent, error: cardConfirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if (cardConfirmError) {
            console.log('Card Confirm Error', cardConfirmError)
        } else {
            console.log('Payment Intent', paymentIntent)
            if (paymentIntent.status == 'succeeded') {

                SetTransactionId(paymentIntent.id)

                const participantInfo = {
                    ...singleContestData,
                    ...userInfo,
                    participantTransactionId: paymentIntent.id

                }
                delete participantInfo._id;

                axiosPublic.post('/participantsData', participantInfo)
                    .then((response) => {
                        console.log(response.data.message);
                        if (response.data.message === 'Data Already Exist') {
                            return toast.error('You Can not Apply for This Contest')
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });

            }
        }
    };


    return (
        <Container>
            {/* <div className="h-screen  flex justify-center items-center"> */}
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button disabled={!stripe || !clientSecret} className="btn bg-sky-500 space-y-4" type="submit" >
                    Pay
                </button>

                <p className="text-red-500">{cardError}</p>

                {
                    transactionId && <p>Your Transaction ID is {transactionId}</p>
                }
            </form>

            {/* </div> */}

        </Container>
    );
};

export default ChekOutForm;