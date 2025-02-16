type modalProps = {
  isOpen: boolean;
  onClose: any;
  children: React.ReactNode;
};

export default function Modal({ isOpen, onClose, children }: modalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-[rgba(0, 0, 0, 0.5)] flex items-center justify-center"
      onClick={onClose}
    >
      <div className="bg-white h-[150px] w-[240px] m-auto p-[2%] border-[2px] border-black rounded-xl shadow-md">
        {children}
      </div>
    </div>
  );
}
