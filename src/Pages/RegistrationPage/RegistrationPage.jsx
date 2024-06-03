import { Link } from "react-router-dom";
import logoPic from '../../../public/logo.png';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { uploadImage } from "../../components/Utilities/ImgBB/ImgBB";
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import useAuth from './../../Hooks/useAuth/useAuth';
import { Helmet } from "react-helmet";
import useAxiosPublic from "../../Hooks/useAxiosPublic/useAxiosPublic";


const RegistrationPage = () => {

    const [showPassWord, SetShowPassWord] = useState(false);
    const [disabled, SetDisabled] = useState(true);

    const { createUserManually, userProfileUpdater, SetReload } = useAuth();
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const handleCaptchaValidation = e => {
        const user_captcha_value = e.target.value;
        console.log(user_captcha_value)

        if (validateCaptcha(user_captcha_value) == true) {
            SetDisabled(false);
        }

        else {
            SetDisabled(true);
            toast.error('Captcha Does Not Match');
        }
    }

    const onSubmit = async (data) => {

        const { name, email, photo, password } = data;

        const image = photo[0];

        if (password.length < 6) {
            return toast('Sorry!!!Six character password required.');
        }

        const passWordValidationforLowerCaseAndUpperCase = /^(?=.*[a-z])(?=.*[A-Z]).+$/;
        const passWordValidationCheckingforLowerCaseAndUpperCaseCharacter = passWordValidationforLowerCaseAndUpperCase.test(password);

        if (!passWordValidationCheckingforLowerCaseAndUpperCaseCharacter) {
            return toast('Must Have a Lowercase and an Uppercase character in the password.');
        }

        try {

            const photoURL = await uploadImage(image);
            console.log(photoURL);

            const forMongoDBDataBase = {
                name,
                email,
                photoURL,
                password,
                role: 'user',
                status: 'Verified'
            }

            createUserManually(email, password)
                .then((result) => {
                    console.log(result.user);
                    userProfileUpdater(name, photoURL)
                        .then(() => {

                            axiosPublic.post('/users', forMongoDBDataBase)
                                .then((response) => {
                                    if (response.data.acknowledged) {
                                        toast.success('CONGRATS!!!Your account has been successfully created.');
                                        reset();
                                    }
                                })
                                .catch((error) => {
                                    console.log(error);
                                });
                            SetReload();
                        }).catch((error) => {
                            console.log(error);
                        });

                })
                .catch((error) => {

                    const errorMessage = error.message;
                    toast(errorMessage);

                });

        } catch (err) {
            toast.error(err.message)
        }

    }

    const handleshowPassWordButton = () => {
        SetShowPassWord(!showPassWord);
    }

    return (
        <div className="bg-sky-500 flex justify-center items-center w-full min-h-full xl:min-h-screen">

            <Helmet>
                <title>ContestHub | Registration Page</title>
            </Helmet>

            <div className="max-w-80 md:max-w-full xl:max-w-7xl mx-auto bg-white border border-transparent p-4 md:p-6 lg:p-8 xl:p-12 rounded md:rounded-md lg:rounded-lg xl:rounded-xl flex justify-center items-center font-poppins shadow my-6">

                <div className="w-full max-w-80 p-4 md:max-w-xl md:py-6 md:px-5 lg:px-7 xl:px-8 rounded-md sm:p-8 border border-neutral-300 text-black">

                    <div className="flex justify-center">
                        <Link to='/' className="flex flex-col justify-center items-center gap-2">

                            <img className="w-9 lg:w-10 xl:w-12" src={logoPic} alt="...Loading" />

                            <h4 className="text-xl lg:text-2xl uppercase font-extrabold text-amber-400">contest<span className="text-sky-500">hub</span></h4>

                        </Link>

                    </div>

                    <h2 className="mt-4 md:mt-5 lg:mt-6 mb-3 text-base md:text-xl xl:text-3xl font-bold text-center">Please Register Your Account</h2>
                    <p className="text-xs md:text-base text-center text-gray-500 my-3 md:my-6 mb-4 md:mb-6">Already have an account?
                        <Link to="/logInPage" rel="noopener noreferrer" className="focus:underline hover:underline text-amber-400 font-semibold hover:text-amber-500 "><span> Login Now</span></Link>
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 md:space-y-8 xl:space-y-12">

                        <div className="space-y-4">

                            <div className="space-y-2">
                                <label htmlFor="name" className="block text-sm md:text-base xl:text-lg">Your Name</label>
                                <input type="text" name="name" id="name" placeholder="Enter Your Full Name" className="w-full px-3 py-2 md:py-3 xl:py-4 border rounded-md border-neutral-300 bg-transparent text-gray-900 text-sm md:text-base xl:text-lg focus:border-violet-400" {...register("name", { required: true })} />
                                {errors.name && <span className="text-red-500">This field is required</span>}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="photoURL" className="block text-sm md:text-base xl:text-lg">Your Photo</label>
                                <input name="photo" type="file" className="file-input file-input-bordered w-full h-[38px] md:h-[50px] xl:h-[60px]" {...register("photo", { required: true })} />
                                {errors.photo && <span className="text-red-500">This field is required</span>}
                            </div>

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

                            <div className="space-y-2">

                                <label htmlFor="simpleCaptcha" className="block text-sm md:text-base xl:text-lg">
                                    <LoadCanvasTemplate />
                                </label>

                                <input onBlur={handleCaptchaValidation} type="text" name="simpleCaptcha" id="simpleCaptcha" placeholder="Type The Captcha Above" className="w-full px-3 py-2 md:py-3 xl:py-4 border rounded-md border-neutral-300 bg-transparent text-gray-900 text-sm md:text-base xl:text-lg focus:border-violet-400" />

                            </div>

                        </div>

                        <button disabled={disabled} type="submit" className={`${disabled ? 'bg-neutral-500' : 'bg-sky-500 hover:bg-sky-400'} w-full px-8 py-3 font-medium rounded-md cursor-pointer text-white text-sm md:text-base lg:text-lg`}>Register</button>

                    </form>

                </div>

            </div>

        </div>
    );
};

export default RegistrationPage;