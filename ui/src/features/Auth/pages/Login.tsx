import { Eye, EyeClosed, ShieldAlert } from "lucide-react";
import Wrapper from "../../../Shared/Components/Wrapper";
import { useState } from "react";
import { retrieveAndDecrypt } from "../../../Shared/handlers/EncryptPass";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [masterKey, setMasterKey] = useState<string | number | null>(null);

  const handleVerify = async () => {
    const encryptedCheckStr = localStorage.getItem("masterKeyCheck");
    if (!encryptedCheckStr) {
      alert("no master key has been set yet.");
      return;
    }
    const encryptedCheck = JSON.parse(encryptedCheckStr);

    try {
      const decryptedCheck = await retrieveAndDecrypt(
        masterKey as string,
        encryptedCheck
      );

      if (decryptedCheck === "GoCryptMeCheck") {
        alert("Master key is correct ✅");
        sessionStorage.setItem("loggedInUser", "true");
        navigate("/add-password");
      } else {
        alert("Incorrect master key ❌");
      }
    } catch (error) {
      alert("Incorrect master key ❌");
    }
  };

  return (
    <div className="w-screen h-screen p-20">
      <Wrapper className="w-full h-full flex">
        <div className="w-full h-full flex justify-center items-center flex-col gap-8">
          <ShieldAlert
            className="size-50 text-orange-400"
            strokeWidth={"1.5"}
          />
          <h3 className="text-3xl text-center font-bold">
            Enter your Master Key
          </h3>

          <form className="form-group gap-8! w-1/2 h-fit" onSubmit={(e)=>{
            e.preventDefault();
            handleVerify()
          }}>
            <div className="relative w-full mx-auto">
              <input
                type={showPass ? "text" : "password"}
                name="password"
                required
                className="w-full"
                onChange={(e) => setMasterKey(e.target.value)}
              />
              <span
                className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? (
                  <EyeClosed className="size-8" />
                ) : (
                  <Eye className="size-8" />
                )}
              </span>
            </div>
            <button
              className="text-white bg-btn rounded-xl w-fit mx-auto py-3 px-8"
            >
              Verify Key
            </button>
          </form>
        </div>
      </Wrapper>
    </div>
  );
};

export default Login;
