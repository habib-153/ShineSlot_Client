import bannerImg from "../../../assets/services_bricks-7e79df9f82df6cf7f97a0afd55485016.png"

const ServiceBanner = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center my-6 gap-5">
            <div>
                <h2 className="text-3xl font-bold">Services & pricing</h2>
                <p className="text-xl">We have a wide range of services and extras to cater for every need</p>
            </div>
            <figure>
                <img src={bannerImg} alt="bannerImage" />
            </figure>
        </div>
    );
};

export default ServiceBanner;