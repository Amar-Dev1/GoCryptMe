import { Eye, EyeClosed, ShieldAlert } from "lucide-react";
import Wrapper from "../../../Shared/Components/Wrapper";
import { useState } from "react";
import { retrieveAndDecrypt } from "../../../Shared/handlers/EncryptPass";
import { useNavigate } from "react-router-dom";
import GlobalDialog from "../../../Shared/ui/GlobalDialog";

const Login = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [masterKey, setMasterKey] = useState<string | number | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const handleVerify = async () => {
    const encryptedCheckStr = localStorage.getItem("masterKeyCheck");
    if (!encryptedCheckStr) {
      setDialogMessage("no master key has been set yet");
      setShowDialog(true);
      return;
    }
    const encryptedCheck = JSON.parse(encryptedCheckStr);

    try {
      const decryptedCheck = await retrieveAndDecrypt(
        masterKey as string,
        encryptedCheck
      );

      if (decryptedCheck === "GoCryptMeCheck") {
        setShowDialog(true);
        setDialogMessage("Master key is correct ✅");
        sessionStorage.setItem("loggedInUser", "true");
        setTimeout(() => {
          navigate("/add-password");
          window.location.reload();
        }, 500);
      } else {
       setDialogMessage("Incorrect master key ❌");
        setShowDialog(true);
      }
    } catch (error) {
       setDialogMessage("Incorrect master key ❌");
        setShowDialog(true);
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

          <form
            className="form-group gap-8! w-1/2 h-fit"
            onSubmit={(e) => {
              e.preventDefault();
              handleVerify();
            }}
          >
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
            <button className="text-white bg-btn rounded-xl w-fit mx-auto py-3 px-8">
              Verify Key
            </button>
          </form>
          <GlobalDialog
            isOpen={showDialog}
            onClose={() => setShowDialog(!showDialog)}
            className="min-w-[100px] max-w-[300px] min-h-[100px] max-h-[220px]"
          >
            <div className="grow p-4 flex items-center justify-center">
              <h3 className="font-bold text-lg">
              {dialogMessage}
              </h3>
            </div>
          </GlobalDialog>
        </div>
      </Wrapper>
    </div>
  );
};

export default Login;
