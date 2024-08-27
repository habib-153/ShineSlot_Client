
const CustomTitle = ({title}:{title:string}) => {
  return (
    <>
      <h2 className="text-3xl font-bold border-l-2 border-[#163196] py-2 px-4">
        {title}
      </h2>
    </>
  );
};

export default CustomTitle;
