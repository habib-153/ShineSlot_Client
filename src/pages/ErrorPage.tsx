import ErrorImg from '../assets/404.gif'

const ErrorPage = () => {
    return (
        <div className='w-full'>
            <img className='mx-auto' src={ErrorImg} alt="" />
        </div>
    );
};

export default ErrorPage;