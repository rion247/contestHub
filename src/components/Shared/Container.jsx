import PropTypes from 'prop-types'; // ES6
const Container = ({ children }) => {

    return (
        <div className="mx-auto max-w-80 md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
            {children}
        </div>
    );
};

Container.propTypes = {
    children: PropTypes.node,
}

export default Container;