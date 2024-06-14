import DoctorCard from "@/components/Doctors/DoctorCard";
import DoctorFilters from "@/components/Doctors/DoctorFilters";
import DoctorsSkeleton from "@/components/Doctors/DoctorsSkeleton";
import Pagination from "@/components/Doctors/Pagination";
import { getAllSpecialities, getDoctorsPaginated } from "@/db/doctor";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const Doctors = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    page: "1",
    limit: "10",
  });

  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const district = searchParams.get("district") || "";
  const hospital = searchParams.get("hospital") || "";
  const specialities = searchParams.get("specialities") || "";
  const date = searchParams.get("date") || "";

  const params = { page, limit, district, hospital, specialities, date };

  const doctorsQuery = useQuery({
    queryKey: ["doctors", params],
    queryFn: () => getDoctorsPaginated(params),
    placeholderData: keepPreviousData,
  });

  const { doctors, result, totalDoctors, totalPages } = doctorsQuery.data || {};

  const skip = (page - 1) * 10;

  const specialitiesQuery = useQuery({
    queryKey: ["specialities"],
    queryFn: getAllSpecialities,
  });

  const specialitiesList = specialitiesQuery.data?.data?.specialities || [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params]);

  return (
    <section className="mx-auto max-w-[420px] sm:max-w-none">
      <div className="container grid grid-cols-1 items-start gap-8 px-5 py-10 md:py-16 lg:grid-cols-[380px_1fr]">
        <div className="rounded-lg bg-white p-5">
          <DoctorFilters selectable={specialitiesList} />
        </div>
        <div className="">
          {doctorsQuery.isSuccess && (
            <p className="mb-3 text-[15px] font-medium leading-tight text-gray-400 md:text-base lg:text-lg">
              Showing{" "}
              <span className="text-[#1d1d1d]">
                {result > 0 ? skip + 1 : 0}-{skip + result}{" "}
              </span>{" "}
              of <span className="text-[#1d1d1d]">{totalDoctors}</span> results
            </p>
          )}
          {!doctorsQuery.isFetching && doctors.length > 0 && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {doctors.map((doctor) => (
                <DoctorCard key={doctor._id} doctor={doctor} />
              ))}
            </div>
          )}
          {doctorsQuery.isFetching && <DoctorsSkeleton />}
          {!doctorsQuery.isFetching && doctors.length === 0 && (
            <div className="rounded-lg bg-white px-5 py-14 text-center">
              <p className="text-base font-medium text-gray-400">
                No doctors found
              </p>
            </div>
          )}
          <Pagination
            hasPrevPage={page > 1}
            hasNextPage={page < totalPages}
            lastPage={totalPages}
            isFetching={doctorsQuery.isFetching}
            currentPage={page}
          />
        </div>
      </div>
    </section>
  );
};

export default Doctors;
