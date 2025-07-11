// import { motion, AnimatePresence } from "framer-motion";
// import type React from "react";

import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { CircleX } from "lucide-react";
import { Fragment } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const GlobalDialog = ({ isOpen, onClose, children }: Props) => {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50 focus:outline-none"
        onClose={onClose}
      >
        {/* Overlay */}
        <TransitionChild
          as={Fragment}
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/10 backdrop-blur-xs" />
        </TransitionChild>

        {/* Dialog Panel */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <TransitionChild
            as={Fragment}
            enter="transition-all duration-300"
            enterFrom="opacity-0 scale-90"
            enterTo="opacity-100 scale-100"
            leave="transition-all duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-90"
          >
            <DialogPanel
              className="relative flex flex-col min-w-1/2 max-w-[80%] min-h-1/2 max-h-[80%] rounded-2xl bg-primary p-6 border border-dark-gray shadow-lg"
              as={"div"}
            >
              {children}
              <button
                className="absolute top-1 right-0 w-10 h-10"
                onClick={onClose}
              >
                <CircleX />
              </button>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

export default GlobalDialog;
