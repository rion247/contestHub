import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types'

const DashboardMenuItem = ({ label, address, icon: Icon }) => {
    return (
        <NavLink
            to={address}
            end
            className={({ isActive }) =>
                `flex items-center px-4 py-2 my-5 rounded transition-colors duration-300 transform  hover:bg-slate-200   hover:text-sky-500 ${isActive ? 'bg-slate-200 text-sky-500' : 'text-white'
                }`
            }
        >
            <Icon className='w-5 h-5' />

            <span className='mx-4 font-medium'>{label}</span>

        </NavLink>
    )
};

DashboardMenuItem.propTypes = {
    label: PropTypes.string,
    address: PropTypes.string,
    icon: PropTypes.elementType,
  }

export default DashboardMenuItem;