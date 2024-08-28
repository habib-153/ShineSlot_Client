import { useGetAllServicesQuery } from "../../../../redux/features/service/serviceApi";
import { TService } from "../../../../types/service";
import CustomTitle from "../../customTitle/CustomTitle";
import ServiceCard from "../../service/ServiceCard";

const Feature = () => {
  const { data } = useGetAllServicesQuery({undefined});
  const servicesData = data?.data;

  return (
    <div className="container mx-auto my-8">
      <CustomTitle title="Featured Services" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-5">
        {servicesData?.slice(0, 6)?.map((service: TService) => (
          <ServiceCard key={service._id} service={service} />
        ))}
      </div>
    </div>
  );
};

export default Feature;
