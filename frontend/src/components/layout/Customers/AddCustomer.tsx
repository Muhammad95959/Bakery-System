import userIcon from "../../../assets/icon-user.svg";

export default function AddCustomer() {
  return (
    <div className="p-20 basis-[80%]">
      <div className="flex justify-between items-center mb-20">
        <h1 className="text-[48px] font-semibold">Add Customer</h1>
        <div className="image bg-[#FFF8E2] p-4 rounded-[50%]">
          <img src={userIcon} />
        </div>
      </div>
      <form className="p-20 shadow-[4px_4px_12px_rgba(0,0,0,0.3)] rounded-xl border border-[rgba(87,90,56,0.26)]">
        <input
          type="text"
          placeholder="name"
          className="w-full mb-6 p-4 border border-[rgba(87,90,56,0.26)] rounded-md placeholder-[rgba(107,61,36,0.9)]"
        />
        <input
          type="text"
          placeholder="Email"
          className="w-full mb-6 p-4 border border-[rgba(87,90,56,0.26)] rounded-md placeholder-[rgba(107,61,36,0.9)]"
        />
        <input
          type="text"
          placeholder="Phone"
          className="w-full mb-6 p-4 border border-[rgba(87,90,56,0.26)] rounded-md placeholder-[rgba(107,61,36,0.9)]"
        />
        <textarea
          placeholder="Address"
          className="w-full mb-10 p-4 border border-[rgba(87,90,56,0.26)] rounded-md placeholder-[rgba(107,61,36,0.9)] h-32 resize-none"
        />
        <div className="buttons flex justify-center gap-[20%]">
          <button
            type="button"
            className="bg-[#FBF7E6] p-4 text-[#6B3D24] font-medium text-2xl border border-[rgba(87,90,56,0.12)] rounded-xl hover:opacity-92 basis-1/4 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            className="bg-[#FFAC3E] p-4 text-white font-medium text-2xl rounded-xl hover:opacity-92 basis-1/4 cursor-pointer"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
