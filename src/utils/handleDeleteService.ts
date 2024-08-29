/* eslint-disable @typescript-eslint/no-explicit-any */
import Swal from "sweetalert2";

export const handleDeleteService = (id: string, deleteService: any) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      const res = await deleteService(id);
      if (res?.data?.success) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Something went wrong.",
          icon: "error",
        });
      }
    }
  });
};
