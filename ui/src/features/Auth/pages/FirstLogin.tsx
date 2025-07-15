import { Info, ShieldCheck } from "lucide-react";
import Wrapper from "../../../Shared/Components/Wrapper";
import { useState } from "react";
import { saveMasterkeyCheck } from "../../../Shared/handlers/EncryptPass";
import { useNavigate } from "react-router-dom";

const FirstLogin = () => {
  const navigate = useNavigate();
  const [masterKey, setMasterKey] = useState<string | number | null>(null);
  const [showToolTip, setShowToolTip] = useState(false);

  const handleCreateKey = async () => {
    if (!masterKey) {
      alert("Please enter a master key.");
      return;
    }
    await saveMasterkeyCheck(masterKey as string);
    sessionStorage.setItem("loggedInUser", "true");
    setTimeout(() => {
      navigate("/add-password");
      window.location.reload();
    }, 500);
  };

  return (
    <div className="w-screen h-screen p-20">
      <Wrapper className="w-full h-full flex">
        <div className="w-full h-full flex justify-center items-center flex-col gap-8">
          <ShieldCheck className="size-50 text-green-500" strokeWidth={"1.5"} />
          <h3 className=" relative text-3xl text-center font-bold">
            To secure your passwords, please create a master key
            <button
              className="absolute -right-6 -top-3"
              onMouseEnter={() => setShowToolTip(true)}
              onMouseLeave={() => setShowToolTip(false)}
            >
              <Info className="size-5" />
            </button>
            <div
              className={`absolute -right-50 xl:-right-45 -top-33 max-w-[45%] max-h-[120px] flex bg-secondary p-2 border border-dark-gray shadow-lg rounded-xl scale-0 opacity-0 transition-all duration-300 z-50 ${
                showToolTip ? "opacity-100 scale-100" : ""
              }`}
            >
              <small className="text-sm p-0 m-0 text-start">
                This is your Master Key — it's essential for using the app. It
                securely encrypts and manages your passwords. You MUST keep this
                key in a safe place. If you lose it, you won’t be able to access
                your data.
              </small>
            </div>
          </h3>

          <form
            className="form-group gap-8! w-1/2 h-fit"
            onSubmit={(e) => {
              e.preventDefault();
              handleCreateKey();
            }}
          >
            <div className="relative w-full mx-auto">
              <input
                type={"text"}
                name="key"
                required
                className="w-full"
                onChange={(e) => setMasterKey(e.target.value)}
              />
            </div>
            <button className="text-white bg-btn rounded-xl w-fit mx-auto py-3 px-8 font-bold">
              Create Key
            </button>
          </form>
          <div className="mt-5 flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <Info className="size-5" />
              <span className="font-bold">
                Make sure to save this key in a secure place
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Info className="size-5" />
              <span className="font-bold">
                You won’t be able to change this key later!
              </span>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default FirstLogin;
