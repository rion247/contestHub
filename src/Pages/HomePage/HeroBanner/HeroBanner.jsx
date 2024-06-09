import { register } from 'swiper/element/bundle';
import sliderPic1 from '../../../../src/assets/pexels-caio-56759.jpg';
import { Link } from 'react-router-dom';
import Container from '../../../components/Shared/Container';
register();
const HeroBanner = () => {

    return (

        <div style={{ backgroundImage: `url(${sliderPic1})` }} className="relative mt-4 md:mt-8 lg:mt-10 xl:mt-12 mb-6 md:mb-8 lg:mb-10 xl:mb-12 font-poppins h-full flex justify-center items-center p-6
         bg-no-repeat bg-cover xl:h-[650px]">

            <div className='z-10 relative p-6 lg:p-8 xl:p-12 h-auto flex justify-center items-center'>
                <div className='absolute bg-black top-0 bottom-0 left-0 right-0 rounded-xl opacity-30 w-full h-full'></div>
                <div className='z-30'>
                    <h2 className="w-72 md:w-[500px] lg:w-[750px] xl:w-[950px] mx-auto text-base md:text-lg lg:text-2xl xl:text-4xl text-slate-100 font-medium text-justify lg:text-center mb-6">Join us and be part of a movement that values creativity, innovation, and the spirit of competition.</h2>

                    <div className=' flex justify-center my-6 md:my-9'>
                        <input type="text" placeholder="Search Contest..." className="input w-full lg:max-w-2xl" />
                    </div>

                    <div className="text-center flex flex-col lg:flex-row gap-6 justify-center">
                        <Link to='/all-contests'>
                            <button className="btn  bg-transparent w-full text-sm md:text-base hover:bg-sky-500 border-white border hover:border-transparent font-normal rounded text-white tracking-wider">BROWSE CONTEST
                            </button>
                        </Link>

                        <button className="btn text-sm md:text-base bg-sky-500 hover:bg-sky-400 border-transparent font-normal rounded text-white tracking-wider hover:border-transparent">SEARCH CONTEST</button>

                    </div>
                </div>
            </div>

        </div>

    );
};

export default HeroBanner;