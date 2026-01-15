// src/Pages/Dashboard/Vendor/AddTicket.jsx
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import { imageURL } from "../../../Utils";
import axios from "axios";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

// Simple BD division -> districts map
const BD_REGIONS = {
  Dhaka: [
    "Dhaka",
    "Gazipur",
    "Narayanganj",
    "Faridpur",
    "Manikganj",
    "Munshiganj",
    "Narsingdi",
    "Rajbari",
    "Shariatpur",
    "Tangail",
    "Gopalganj",
    "Kishoreganj",
    "Madaripur"
  ],

  Chattogram: [
    "Chattogram",
    "Cox's Bazar",
    "Feni",
    "Noakhali",
    "Bandarban",
    "Khagrachhari",
    "Rangamati",
    "Brahmanbaria",
    "Chandpur",
    "Cumilla",
    "Lakshmipur"
  ],

  Khulna: [
    "Khulna",
    "Jashore",
    "Satkhira",
    "Bagerhat",
    "Chuadanga",
    "Jhenaidah",
    "Kushtia",
    "Magura",
    "Meherpur",
    "Narail"
  ],

  Rajshahi: [
    "Rajshahi",
    "Pabna",
    "Sirajganj",
    "Naogaon",
    "Bogra",
    "Joypurhat",
    "Natore",
    "Chapai Nawabganj"
  ],

  Sylhet: [
    "Sylhet",
    "Moulvibazar",
    "Habiganj",
    "Sunamganj"
  ],

  Barishal: [
    "Barishal",
    "Patuakhali",
    "Bhola",
    "Barguna",
    "Jhalokathi",
    "Pirojpur"
  ],

  Rangpur: [
    "Rangpur",
    "Dinajpur",
    "Kurigram",
    "Gaibandha",
    "Lalmonirhat",
    "Nilphamari",
    "Panchagarh",
    "Thakurgaon"
  ],

  Mymensingh: [
    "Mymensingh",
    "Jamalpur",
    "Netrokona",
    "Sherpur"
  ]
};


const AddTicket = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  // watch selected divisions
  const fromDivision = watch("fromDivision");
  const toDivision = watch("toDivision");

  // derive district options based on division
  const fromDistrictOptions = useMemo(
    () => (fromDivision ? BD_REGIONS[fromDivision] || [] : []),
    [fromDivision]
  );
  const toDistrictOptions = useMemo(
    () => (toDivision ? BD_REGIONS[toDivision] || [] : []),
    [toDivision]
  );

  // when division changes, reset the district field
  useEffect(() => {
    setValue("fromDistrict", "");
  }, [fromDivision, setValue]);

  useEffect(() => {
    setValue("toDistrict", "");
  }, [toDivision, setValue]);



  const handleAddTicket = async (data) => {
    const { title, fromDivision, fromDistrict, toDivision, toDistrict, departure, image, perks, price, quantity, transportType } = data;
    // later: upload image to imgbb, send POST to backend
    
    try {
      const img_url = await imageURL(image[0]);
      const ticketData = {
        title,
        fromDivision,
        fromDistrict,
        toDivision,
        toDistrict,
        departure,//string
        image: img_url,
        perks,//array of string
        price,//int
        quantity,//int
        transportType,
        seller: {
          name: user?.displayName,
          email: user?.email,
          photo: user?.photoURL,
        }

      }
      const { data } = await axiosSecure.post(`${import.meta.env.VITE_API_URL}/tickets`, ticketData).then(res=> toast.success("Ticket Added! Waiting for Admin approval",res))

      console.log(data);
    } catch (error) {
      console.log(error);
    }


    reset();
  };

  return (
    <section className="space-y-6 lg:w-7xl mx-auto">
      <header className="space-y-1">
        <h1 className="text-2xl md:text-3xl text-primary text-center font-bold">
          Add Ticket
        </h1>
        <p className="text-sm text-neutral/70 text-center">
          Fill in the ticket details and submit for admin approval.
        </p>
      </header>

      <form
        onSubmit={handleSubmit(handleAddTicket)}
        className="bg-base-200 rounded-2xl p-8 space-y-6"
      >
        {/* Row: title */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="form-control md:col-span-2 ">
            <label className="label">
              <span className="label-text text-sm font-semibold text-neutral">
                Ticket title
              </span>
            </label>
            <input
              type="text"
              placeholder="Dhaka to Chattogram Express"
              className="input input-bordered bg-base-100 ml-2"
              {...register("title", { required: "Ticket title is required" })}
            />
            {errors.title && (
              <p className="text-xs text-red-500 mt-1">
                {errors.title.message}
              </p>
            )}
          </div>
        </div>

        {/* Row: From / To location (division + district) */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* From */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-neutral">
              From (Location)
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {/* From division */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xs text-neutral/70">
                    Division
                  </span>
                </label>
                <select
                  className="select select-bordered bg-base-100"
                  defaultValue=""
                  {...register("fromDivision", {
                    required: "From division is required",
                  })}
                >
                  <option value="" disabled>
                    Select division
                  </option>
                  {Object.keys(BD_REGIONS).map((div) => (
                    <option key={div} value={div}>
                      {div}
                    </option>
                  ))}
                </select>
                {errors.fromDivision && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.fromDivision.message}
                  </p>
                )}
              </div>

              {/* From district */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xs text-neutral/70">
                    District
                  </span>
                </label>
                <select
                  className="select select-bordered bg-base-100"
                  defaultValue=""
                  {...register("fromDistrict", {
                    required: "From district is required",
                  })}
                  disabled={!fromDivision}
                >
                  <option value="" disabled>
                    {fromDivision ? "Select district" : "Select division first"}
                  </option>
                  {fromDistrictOptions.map((dist) => (
                    <option key={dist} value={dist}>
                      {dist}
                    </option>
                  ))}
                </select>
                {errors.fromDistrict && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.fromDistrict.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* To */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-neutral">To (Location)</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {/* To division */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xs text-neutral/70">
                    Division
                  </span>
                </label>
                <select
                  className="select select-bordered bg-base-100"
                  defaultValue=""
                  {...register("toDivision", {
                    required: "To division is required",
                  })}
                >
                  <option value="" disabled>
                    Select division
                  </option>
                  {Object.keys(BD_REGIONS).map((div) => (
                    <option key={div} value={div}>
                      {div}
                    </option>
                  ))}
                </select>
                {errors.toDivision && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.toDivision.message}
                  </p>
                )}
              </div>

              {/* To district */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xs text-neutral/70">
                    District
                  </span>
                </label>
                <select
                  className="select select-bordered bg-base-100"
                  defaultValue=""
                  {...register("toDistrict", {
                    required: "To district is required",
                  })}
                  disabled={!toDivision}
                >
                  <option value="" disabled>
                    {toDivision ? "Select district" : "Select division first"}
                  </option>
                  {toDistrictOptions.map((dist) => (
                    <option key={dist} value={dist}>
                      {dist}
                    </option>
                  ))}
                </select>
                {errors.toDistrict && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.toDistrict.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Row: transport + price + quantity + departure */}
        <div className="grid gap-4 md:grid-cols-4">
          {/* Transport type */}
          <div className="form-control md:col-span-1">
            <label className="label">
              <span className="label-text text-sm font-medium text-neutral">
                Transport type
              </span>
            </label>
            <select
              className="select select-bordered bg-base-100"
              defaultValue=""
              {...register("transportType", {
                required: "Transport type is required",
              })}
            >
              <option value="" disabled>
                Select transport
              </option>
              <option value="Bus">Bus</option>
              <option value="Train">Train</option>
              <option value="Launch">Launch</option>
              <option value="Plane">Plane</option>
            </select>
            {errors.transportType && (
              <p className="text-xs text-red-500 mt-1">
                {errors.transportType.message}
              </p>
            )}
          </div>

          {/* Price */}
          <div className="form-control md:col-span-1">
            <label className="label">
              <span className="label-text text-sm font-medium text-neutral">
                Price (per unit)
              </span>
            </label>
            <input
              type="text"
              min="0"
              className="input input-bordered bg-base-100"
              placeholder="1200"
              {...register("price", {
                required: "Price is required",
                valueAsNumber: true,
                min: { value: 1, message: "Price must be greater than 0" },
              })}
            />
            {errors.price && (
              <p className="text-xs text-red-500 mt-1">
                {errors.price.message}
              </p>
            )}
          </div>

          {/* Quantity */}
          <div className="form-control md:col-span-1">
            <label className="label">
              <span className="label-text text-sm font-medium text-neutral">
                Ticket quantity
              </span>
            </label>
            <input
              type="number"
              min="1"
              className="input input-bordered bg-base-100"
              placeholder="40"
              {...register("quantity", {
                required: "Quantity is required",
                valueAsNumber: true,
                min: { value: 1, message: "Quantity must be at least 1" },
              })}
            />
            {errors.quantity && (
              <p className="text-xs text-red-500 mt-1">
                {errors.quantity.message}
              </p>
            )}
          </div>

          {/* Departure */}
          <div className="form-control md:col-span-1">
            <label className="label">
              <span className="label-text text-sm font-medium text-neutral">
                Departure date & time
              </span>
            </label>
            <input
              type="datetime-local"
              className="input input-bordered bg-base-100"
              {...register("departure", {
                required: "Departure date & time is required",
              })}
            />
            {errors.departure && (
              <p className="text-xs text-red-500 mt-1">
                {errors.departure.message}
              </p>
            )}
          </div>
        </div>

        {/* Perks */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-sm font-medium text-neutral">
              Perks
            </span>
          </label>
          <div className="flex flex-wrap gap-4 text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="checkbox checkbox-sm"
                value="AC"
                {...register("perks")}
              />
              <span>AC</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="checkbox checkbox-sm"
                value="Breakfast"
                {...register("perks")}
              />
              <span>Breakfast</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="checkbox checkbox-sm"
                value="Wi-Fi"
                {...register("perks")}
              />
              <span>Wi‑Fi</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="checkbox checkbox-sm"
                value="Extra legroom"
                {...register("perks")}
              />
              <span>Extra legroom</span>
            </label>
          </div>
          <p className="text-xs text-neutral/60 mt-1">
            You can pick multiple perks for this ticket.
          </p>
        </div>

        {/* Image upload */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-sm font-medium text-neutral">
              Ticket image
            </span>
          </label>
          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered bg-base-100 w-full"
            {...register("image", { required: "Image is required" })}
          />
          {errors.image && (
            <p className="text-xs text-red-500 mt-1">
              {errors.image.message}
            </p>
          )}
          <p className="text-xs text-neutral/60 mt-1">
            The selected file will be uploaded to imgbb when you submit.
          </p>
        </div>

        {/* Vendor info */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-sm font-medium text-neutral">
                Vendor name
              </span>
            </label>
            <input
              type="text"
              value={user?.displayName}
              readOnly
              className="input input-bordered bg-base-300/60 cursor-not-allowed ml-3"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-sm font-medium text-neutral">
                Vendor email
              </span>
            </label>
            <input
              type="email"
              value={user?.email}
              readOnly
              className="input input-bordered bg-base-300/60 cursor-not-allowed ml-3"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="btn btn-primary px-10"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Adding..." : "Add Ticket"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddTicket;
