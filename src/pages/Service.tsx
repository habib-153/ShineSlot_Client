import CustomTitle from "../components/ui/customTitle/CustomTitle";
import Loading from "../components/ui/global/Loading";
import ClearFilter from "../components/ui/service/ClearFilter";
import Filter from "../components/ui/service/Filter";
import Search from "../components/ui/service/Search";
import ServiceBanner from "../components/ui/service/ServiceBanner";
import ServiceCard from "../components/ui/service/ServiceCard";
import Sort from "../components/ui/service/Sort";
import { useGetAllServicesQuery } from "../redux/features/service/serviceApi";
import { useAppSelector } from "../redux/hooks";
import { TService } from "../types/service";
import ErrorPage from "./ErrorPage";

const Service = () => {
  const { searchTerm, filters, sort } = useAppSelector((state) => state.filter);
  const { data, isLoading, isError } = useGetAllServicesQuery({searchTerm, filters, sort});

  const services = data?.data;

  if (isLoading) return <Loading />;
  if (isError) return <ErrorPage />;
  return (
    <div className="container mx-auto">
      <ServiceBanner />
      <div>
        <CustomTitle title="Our Services" />
        <div className="w-full flex flex-col md:flex-row mt-4 items-center justify-between md:gap-12">
          <div className="md:hidden w-full my-2">
            <Search />
          </div>
          <div className="flex flex-col my-1 md:flex-row items-center gap-3">
            <Filter />
            <div className="md:mt-2 flex items-center justify-between sm:gap-12 lg:gap-20 w-full md:w-fit text-right">
              <ClearFilter />
              <Sort />
            </div>
          </div>
          <div className="hidden md:block">
            <Search />
          </div>
        </div>
        <div className="grid my-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {services?.map((service: TService, idx: number) => (
            <ServiceCard key={idx} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Service;
