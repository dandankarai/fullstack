import { ScheduleItemProps } from "@/pages/dashboard";



interface ModalInfoProps {
  isOpen: () => void
  onOpen: () => void,
  onClose: () => void;
  data: ScheduleItemProps
  finishService: () => Promise<void>
}
export function ModalInfo({ isOpen, onClose, onOpen, data, finishService }: ModalInfoProps) {
  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button className="btn" onClick={isOpen}>open modal</button>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Press ESC key or click the button below to close</p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}