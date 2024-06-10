import { Link, useLocation, useNavigate } from "react-router-dom";
import logoPic from '../../../public/logo.png';
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAuth from "../../Hooks/useAuth/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic/useAxiosPublic";

const LogInPage = () => {

    const { signInUserManually, googleSignIn, SetLoading, SetReload } = useAuth();

    const [showPassWord, SetShowPassWord] = useState(false);

    const navigate = useNavigate();

    const location = useLocation();

    const axiosPublic = useAxiosPublic();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {

        const { email, password } = data;

        try {
            await signInUserManually(email, password)
            toast.success('Login Successful');
            navigate(location.state ? location?.state : '/logInPage');
        } catch (err) {
            toast(err.message);
            SetLoading(false);
        }

    }

    const handleGoogleLogInButton = async () => {

        try {
            googleSignIn()
                .then((userCredential) => {
                    const user = userCredential.user;

                    const forMongoDBDataBase = {
                        name: user.displayName,
                        email: user.email,
                        photoURL: user.photoURL,
                        role: 'user',
                        status: 'Verified',
                        condition: 'unblock',
                    }

                    axiosPublic.post('/users', forMongoDBDataBase)
                        .then((response) => {
                            if (response.data.acknowledged) {
                                toast.success('Login Successful');
                                navigate(location.state ? location?.state : '/logInPage');
                                SetReload();
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                        });                    

                })
                .catch((error) => {

                    return toast.error(error.message);
                });


        } catch (err) {
            toast(err.message);
        }
    }

    const handleshowPassWordButton = () => {
        SetShowPassWord(!showPassWord);
    }

    return (

        <div className="bg-sky-500 flex justify-center items-center w-full min-h-full xl:min-h-screen">

            <div className="max-w-80 md:max-w-full xl:max-w-7xl mx-auto bg-white border border-transparent p-4 md:p-6 lg:p-8 xl:p-12 rounded md:rounded-md lg:rounded-lg xl:rounded-xl flex justify-center items-center font-poppins shadow my-6">

                <div className="w-full max-w-80 p-4 md:max-w-xl md:py-6 md:px-5 lg:px-7 xl:px-8 rounded-md sm:p-8 border border-neutral-300 text-black">

                    <div className="flex justify-center">
                        <Link to='/' className="flex flex-col justify-center items-center gap-2">

                            <img className="w-9 lg:w-10 xl:w-12" src={logoPic} alt="...Loading" />

                            <h4 className="text-xl lg:text-2xl uppercase font-extrabold text-amber-400">contest<span className="text-sky-500">hub</span></h4>

                        </Link>

                    </div>

                    <h2 className="mt-4 md:mt-5 lg:mt-6 mb-3 text-base md:text-xl xl:text-3xl font-bold text-center">Please Login to your account</h2>
                    <p className="text-xs md:text-base text-center text-gray-500 my-3 md:my-6 mb-4 md:mb-6">Dont have an account?
                        <Link to="/registrationPage" rel="noopener noreferrer" className="focus:underline hover:underline text-amber-400 font-semibold hover:text-amber-500 "><span> Register Now</span></Link>
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 md:space-y-8 xl:space-y-12">
                        <div className="space-y-4">

                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-sm md:text-base xl:text-lg">Email address</label>
                                <input type="email" name="email" id="email" placeholder="Enter Your Email Address" className="w-full px-3 py-2 md:py-3 xl:py-4 border rounded-md border-neutral-300 bg-transparent text-gray-900 text-sm md:text-base xl:text-lg focus:border-violet-400" {...register("email", { required: true })} />
                                {errors.email && <span className="text-red-500">This field is required</span>}
                            </div>

                            <div className="space-y-2 relative">
                                <div className="flex justify-between">
                                    <label htmlFor="password" className="text-sm md:text-base xl:text-lg">Password</label>
                                    <a rel="noopener noreferrer" href="#" className="text-xs hover:underline text-gray-400">Forgot password?</a>
                                </div>
                                <input type={showPassWord ? 'text' : 'password'} name="password" id="password" placeholder="Enter Your Password" className="w-full px-3 py-2 md:py-3 xl:py-4 border rounded-md border-neutral-300 bg-transparent text-gray-900 text-sm md:text-base xl:text-lg focus:border-violet-400" {...register("password", { required: true })} />
                                {errors.password && <span className="text-red-500">This field is required</span>}
                                <div onClick={handleshowPassWordButton} className="absolute text-sm md:text-base xl:text-lg top-8  md:top-10 xl:top-12 right-4 text-neutral-500">

                                    {
                                        showPassWord ? <FaEyeSlash /> : <FaEye />
                                    }

                                </div>

                            </div>
                        </div>
                        <button type="submit" className="w-full px-8 py-3 font-medium rounded-md bg-sky-500 hover:bg-sky-400 text-white text-sm md:text-base lg:text-lg">Login</button>
                    </form>


                    <div className="flex items-center w-full my-4">
                        <hr className="w-full text-gray-400" />
                        <p className="px-3 text-gray-400">OR</p>
                        <hr className="w-full text-gray-400" />
                    </div>

                    <div onClick={handleGoogleLogInButton} className="my-6 space-y-4">
                        <button aria-label="Login with Google" type="button" className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 border-gray-600 focus:dark:ring-violet-600 text-sm md:text-base lg:text-lg">
                            <FcGoogle className="text-xl xl:text-2xl " />
                            <p>Login with Google</p>
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default LogInPage;