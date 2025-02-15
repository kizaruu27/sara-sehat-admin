type modalProps = {
  showModal: boolean;
  setShowModal: Function;
  children: React.ReactNode;
};

export default function Modal({ showModal, setShowModal, children }: modalProps) {
  return (
    <>
      {showModal && (
        <div className="bg-black w-full h-screen opacity-50 absolute top-0 left-0 right-0 bottom-0 z-50">
          {children}
        </div>
      )}
    </>
  );
}
