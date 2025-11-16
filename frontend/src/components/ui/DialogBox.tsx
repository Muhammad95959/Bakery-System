import { createPortal } from "react-dom";

export default function DialogBox(props: {
  message: string;
  confirmMessage: string;
  cancelMessage: string;
  showDialogBox: boolean;
  handleAnswer: (answer: boolean) => void;
}) {
  function onAnswer(answer: boolean) {
    props.handleAnswer(answer);
  }

  return createPortal(
    <div
      className="dialogbox opacity-0 fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.2)] z-50"
      style={{ display: props.showDialogBox ? "block" : "none" }}
    >
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#FFFFF6] px-8 py-4 rounded-xl border-2 border-[rgba(87,90,56,0.12)]">
        <p className="font-medium text-xl mb-4">{props.message}</p>
        <div className="flex gap-4 justify-center items-center">
          <button
            className="bg-[#FFAC3E] text-white px-10 py-1 rounded-md cursor-pointer hover:opacity-90"
            onClick={() => onAnswer(true)}
          >
            {props.confirmMessage}
          </button>
          <button
            className="bg-[#FBF7E6] text-[#6B3D24] px-10 py-1 border border-[rgba(87,90,56,0.12)] rounded-md cursor-pointer hover:opacity-90"
            onClick={() => onAnswer(false)}
          >
            {props.cancelMessage}
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("root-portal")!,
  );
}
