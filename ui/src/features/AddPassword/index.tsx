import {
  BadgeInfo,
  ChevronDownIcon,
  Eye,
  EyeClosed,
  Hash,
  Info,
  LockKeyhole,
  Plus,
  ShieldAlert,
  ShieldCheck,
  Tag,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import clsx from "clsx";

import platformsData from "./platformsData/platforms.json";
import imgsMap from "./platformsData/imgsMap";
import GlobalDialog from "../../Shared/ui/GlobalDialog";
import { useNavigate } from "react-router-dom";
import type { IPlatform } from "../../Shared/types/formData.types";

const index = () => {
  const navigate = useNavigate();

  const [clicked, setClicked] = useState<boolean | null>(true);
  const [query, setQuery] = useState<string>("");
  const [selectedPlatform, setSelectedPlatform] = useState(platformsData[0]);
  const [showPass, setShowPass] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [successfulSumbit, setSuccessfulSubmit] = useState<boolean | null>(
    null
  );
  const otherInputRef = useRef<HTMLInputElement | null>(null);

  const filterdData =
    query === ""
      ? platformsData
      : platformsData.filter((platform) => {
          return platform.title.toLowerCase().includes(query?.toLowerCase());
        });

  const [formData, setFormData] = useState({
    title: "",
    password: "",
    platform: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "platform") {
      setQuery(value);
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlatformChange = (platform: IPlatform) => {
    setSelectedPlatform(platform);
    if (platform.title !== "Other") {
      setFormData((prev) => ({ ...prev, platform: platform.title }));
    } else {
      setFormData((prev) => ({ ...prev, platform: "" })); // Clear until user types
    }
  };

  useEffect(() => {
    if (selectedPlatform?.title === "Other") {
      setShowOtherInput(true);
    } else {
      setShowOtherInput(false);
    }
  }, [selectedPlatform]);

  const isDisabled =
    !formData.title.trim() ||
    !formData.password.trim() ||
    (showOtherInput
      ? !otherInputRef.current?.value.trim()
      : !formData.platform.trim());

  const HandleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessfulSubmit(false);
  };

  return (
    <div className="w-full h-full">
      {!clicked && (
        <div className="h-full w-full flex flex-col justify-center items-center">
          <button
            className="relative border-2 border-dashed border-dark-gray rounded-full after:absolute after:w-full after:h-full after:rounded-full after:top-0 after:left-0 after:shadow-2xl after:shadow-blue-800 after:animate-pulse"
            onClick={() => setClicked(!clicked)}
          >
            <Plus className="size-55 text-light-gray" />
          </button>
          <p className="text-light-gray text-center mt-5 font-black text-2xl">
            Add a Password !
          </p>
        </div>
      )}
      <div
        className={`h-full transition-all duration-500 scale-0 opacity-0 ${
          clicked ? "scale-100 opacity-100 " : ""
        }`}
      >
        <form
          action=""
          className={`min-h-[60%] max-h-full mt-11 grid grid-cols-12 gap-10 `}
          onSubmit={HandleFormSubmit}
        >
          <div className="form-group col-span-6 h-fit">
            <label htmlFor="">
              <Tag className="text-light-gray size-5" />
              Password title
            </label>
            <input type="text" name="title" required onChange={handleChange} />
          </div>
          <div className="form-group col-span-6 h-fit relative">
            <label htmlFor="">
              <LockKeyhole className="text-light-gray size-5" />
              Password
            </label>
            <input
              type={showPass ? "text" : "password"}
              name="password"
              required
              onChange={handleChange}
            />
            <span
              className="absolute right-5 top-1/2 cursor-pointer"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? (
                <EyeClosed className="size-8" />
              ) : (
                <Eye className="size-8" />
              )}
            </span>
          </div>

          <div className="form-group col col-span-12 flex-row! items-center  z-50 overflow-hidden!">
            <Combobox
              value={selectedPlatform}
              onChange={handlePlatformChange}
              onClose={() => setQuery("")}
            >
              <div className="relative w-full flex flex-col z-50">
                <label className="mb-3">
                  <Hash /> Platform
                </label>

                <ComboboxInput
                  displayValue={(platform: any) => platform?.title!}
                  name="platform"
                  onChange={handleChange}
                  className={clsx(
                    "grow rounded-xl bg-white/5 text-sm/6 text-white m-1 border border-dark-gray",
                    "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:outline-white/15"
                  )}
                />
                <ComboboxButton className="group absolute inset-y-0 top-1/3 right-2 px-2.5">
                  <ChevronDownIcon className="size-4 fill-white/60 group-data-hover:fill-white" />
                </ComboboxButton>
              </div>
              <ComboboxOptions
                anchor="bottom"
                transition
                className={clsx(
                  "w-(--input-width) max-h-full rounded-xl border border-dark-gray bg-black/75 p-1 [--anchor-gap:--spacing(1)] empty:invisible",
                  "transition duration-100 ease-in data-leave:data-closed:opacity-0"
                )}
              >
                {filterdData.length === 0 ? (
                  <ComboboxOption
                    value={platformsData[platformsData.length - 1]}
                    className="group flex items-center gap-4 rounded-lg px-3 py-1.5 select-none data-focus:bg-white/10 cursor-pointer z-50"
                  >
                    <div className="text-sm/6 text-white flex items-center gap-5">
                      <img
                        src={platformsData[platformsData.length - 1].img}
                        alt=""
                        className="w-[30px] h-[30px] rounded-full mr-auto"
                      />
                      <small className="font-bold text-[12px] mr-auto">
                        {platformsData[platformsData.length - 1].title}
                      </small>
                    </div>
                  </ComboboxOption>
                ) : (
                  filterdData.map((platform) => (
                    <ComboboxOption
                      key={platform.id}
                      value={platform}
                      className="group flex items-center gap-2 rounded-lg px-4 py-3 select-none data-focus:bg-white/10 cursor-pointer z-50 outline outline-white/15 hover:bg-white/15!"
                    >
                      {/* <CheckIcon className="invisible size-4 fill-white group-data-selected:visible" /> */}
                      <div className="text-sm/6 text-white flex items-center gap-5">
                        <img
                          src={imgsMap[platform.img]}
                          alt=""
                          className="w-[30px] h-[30px] rounded-full mr-auto"
                        />
                        <small className="font-bold text-[12px] mr-auto">
                          {platform.title}
                        </small>
                      </div>
                    </ComboboxOption>
                  ))
                )}
              </ComboboxOptions>
            </Combobox>
            {showOtherInput && (
              <div>
                <label className="mb-3">
                  <Hash className="text-light-gray size-5" />
                  Other platform
                </label>
                <input
                  type="text"
                  name="other_platform"
                  required
                  className="w-[99%]"
                  ref={otherInputRef}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      platform: e.target.value,
                    }))
                  }
                />
              </div>
            )}
          </div>

          <div className="col col-span-12 flex justify-center">
            <button
              type="submit"
              className="bg-btn w-fit h-fit py-4 px-10 text-xl text-white font-bold rounded-xl disabled:bg-white/20 disabled:text-white/30 disabled:cursor-not-allowed!"
              disabled={isDisabled}
              onClick={() => setShowDialog(!showDialog)}
            >
              Encrypt & Save
            </button>
          </div>
        </form>
        <ul className="col col-span-12 mt-4 flex flex-col gap-4">
          <h3 className="font-bold text-xl flex items-center gap-3 mb-8">
            <BadgeInfo /> Useful information
          </h3>
          <li className="flex items-center gap-3">
            <Info className="size-5" />
            <span className="font-bold">
              This password will saved into the current vault
            </span>
          </li>
          <li className="flex items-center gap-3">
            <Info className="size-5" />
            <span className="font-bold">
              No one can see this password unlees you.
            </span>
          </li>
          <li className="flex items-center gap-3">
            <Info className="size-5" />
            <span className="font-bold">
              After saving the password it will encrypted and saved locally
            </span>
          </li>
        </ul>

        {successfulSumbit && (
          <GlobalDialog
            isOpen={showDialog}
            onClose={() => setShowDialog(!showDialog)}
          >
            <div className="h-full w-full flex justify-center items-center flex-col gap-12">
              <div className="">
                <span className="flex justify-center">
                  <ShieldCheck
                    className="size-45 text-green-600"
                    strokeWidth={"1.5px"}
                  />
                </span>
                <p className="text-center mt-3">Encrypted & Saved !</p>
              </div>
              <button
                className="bg-btn text-white font-bold py-2 px-8 rounded-xl"
                onClick={() => {
                  setShowDialog(!showDialog);
                  navigate("/manage-passwords");
                }}
              >
                Done
              </button>
            </div>
          </GlobalDialog>
        )}
        {
          !successfulSumbit &&
           <GlobalDialog
            isOpen={showDialog}
            onClose={() => setShowDialog(!showDialog)}
          >
            <div className="h-full w-full flex justify-center items-center flex-col gap-12">
              <div className="">
                <span className="flex justify-center">
                  <ShieldAlert
                    className="size-45 text-orange-500"
                    strokeWidth={"1.5px"}
                  />
                </span>
                <p className="text-center mt-3">An error occured.Please try agin !</p>
              </div>
              <button
                className="bg-btn text-white font-bold py-2 px-8 rounded-xl"
                onClick={() => {
                  setShowDialog(!showDialog);
                  navigate("/manage-passwords");
                }}
              >
                Done
              </button>
            </div>
          </GlobalDialog>
        }
      </div>
    </div>
  );
};

export default index;
