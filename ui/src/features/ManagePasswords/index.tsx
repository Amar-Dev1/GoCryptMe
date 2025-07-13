import "./styles.css";
import GlobalDialog from "../../Shared/ui/GlobalDialog";
import { useEffect, useState } from "react";
import { CheckCheck, Copy } from "lucide-react";
import { retrieveAndDecrypt } from "../../Shared/handlers/EncryptPass";
import imgsMap from "../AddPassword/platformsData/imgsMap";

const index = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [result, setResult] = useState<{} | any>({});
  const [copied, setCopied] = useState(false);

  function getVault() {
    return JSON.parse(localStorage.getItem("vault") || "{}");
  }
  const [selectedPassword, setSelectedPassword] = useState<string | null>(null);
  const [selectedEntry, setSelectedEntry] = useState<any>(null);

  async function handleDecrypt(entry: any) {
    const decryptedPass = await retrieveAndDecrypt(
      "amar",
      entry.encryptedPassword
    );
    setSelectedPassword(decryptedPass);
    setSelectedEntry(entry);
    setShowDialog(true);
  }

  useEffect(() => {
    const result = getVault();
    setResult(result);
  }, []);

  return (
    <>
      <table className="password-table">
        <thead>
          <tr>
            <th>Platform</th>
            <th>Name</th>
            <th>Password</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody className="h-full overflow-y-auto">
          {Object.keys(result).map((platform) =>
            Array.isArray(result[platform]) ? (
              result[platform].map((entry: any, index: number) => (
                <>
                  <tr key={index}>
                    <td className="w-[10%]">
                      <div className="flex justify-center flex-col items-center gap-4">
                        <img
                          src={imgsMap[entry.img] || entry.img}
                          alt=""
                          className="w-[35px] h-[35px] rounded-full"
                        />
                        <span>{entry.platform}</span>
                      </div>
                    </td>
                    <td className="w-[40%]">
                      <div className="">
                        <span className="">{entry.name}</span>
                      </div>
                    </td>
                    <td className="w-[30%]">
                      <div className="w-full h-full bg-secondary rounded-xl outline outline-dark-gray p-2">
                        **************
                      </div>
                    </td>
                    <td className="w-[20%]">
                      <button
                        className="btn-details"
                        onClick={() => handleDecrypt(entry)}
                      >
                        See Details
                      </button>
                    </td>
                  </tr>
                </>
              ))
            ) : (
              <div>no passwords </div>
            )
          )}
        </tbody>
      </table>

      {/* Details Dialog */}
      <GlobalDialog
        isOpen={showDialog}
        onClose={() => {
          setShowDialog(!showDialog);
          setSelectedPassword(null);
          setSelectedEntry(null);
        }}
      >
        <div className="h-full! flex flex-col">
          <div className="flex items-center gap-4">
            <img
              src={
                imgsMap[selectedEntry && selectedEntry.img] ||
                (selectedEntry && selectedEntry.img!)
              }
              alt=""
              className="w-[45px] h-[45px] rounded-full"
            />
            <h3>{selectedEntry && selectedEntry.platformName!}</h3>
          </div>
          <div className="form-group w-[50%] mt-8">
            <label className="">Name : </label>
            <input
              className="bg-secondary p-2 px-6 outline outline-dark-gray rounded-lg"
              value={selectedEntry && selectedEntry.name!}
              readOnly={!editMode ? true : false}
            />
          </div>
          <div className="relative form-group w-[50%] mt-4">
            <label className="">Password : </label>
            <input
              className="bg-secondary p-2 px-6 outline outline-dark-gray rounded-lg"
              value={selectedPassword || ""}
              readOnly={!editMode ? true : false}
            />
            <button className="absolute right-4 bottom-[10px]">
              {copied ? (
                <CheckCheck />
              ) : (
                <Copy
                  onClick={() => {
                    navigator.clipboard.writeText(selectedPassword!);
                    setCopied(!copied);
                  }}
                />
              )}
            </button>
          </div>
          <div className="mt-5 flex items-center justify-around">
            {!editMode ? (
              <>
                <button
                  className="w-[40%] py-2 px-5 font-bold text-white rounded-lg bg-red-500"
                  onClick={() => setShowDeleteDialog(!showDeleteDialog)}
                >
                  Delete
                </button>
                <button
                  className="w-[40%] py-2 px-5 font-bold text-white rounded-lg bg-orange-300"
                  onClick={() => setEditMode(!editMode)}
                >
                  Edit
                </button>
              </>
            ) : (
              <>
                <button className="w-[40%] py-2 px-5 font-bold text-white rounded-lg bg-red-500">
                  Save
                </button>
                <button
                  className="w-[40%] py-2 px-5 font-bold text-white rounded-lg bg-btn"
                  onClick={() => setEditMode(!editMode)}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </GlobalDialog>

      {/* Delete Dialog */}
      <GlobalDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(!showDeleteDialog)}
        className="min-w-[5%] max-w-[30%] min-h-[5%] max-h-[25%]"
      >
        <h2 className="font-bold text-lg my-8 w-[90%] text-center">
          You will delete this password PERMENENTLY ?!
        </h2>
        <div className=" flex items-center justify-around">
          <button className="w-[40%] py-2 px-5 font-bold text-white rounded-lg bg-red-500">
            Delete
          </button>
          <button
            className="w-[40%] py-2 px-5 font-bold text-white rounded-lg bg-btn"
            onClick={() => setShowDeleteDialog(!showDeleteDialog)}
          >
            Cancel
          </button>
        </div>
      </GlobalDialog>
    </>
  );
};

export default index;
