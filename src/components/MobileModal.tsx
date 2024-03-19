"use client";

import React, { useEffect, useState } from "react";
import { Button, Modal } from "flowbite-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { disableAlert } from "@/store/userSlice";
import useIsMobile from "@/utils/useIsMobile";

export default function MobileModal() {
  const dispatch = useAppDispatch();

  const { isMobileAlertDisable } = useAppSelector((state) => state.user);
  const [openModal, setOpenModal] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile && !isMobileAlertDisable) {
      setOpenModal(true);
    }
  }, [isMobile, isMobileAlertDisable]);

  const close = () => {
    setOpenModal(false);
    dispatch(disableAlert());
  };

  return (
    <Modal show={openModal} onClose={close} position="center">
      <Modal.Body>
        <div className="space-y-6">
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            For the best experience, we recommend using the desktop version of
            our website. Enjoy enhanced features and seamless navigation to
            fully explore our content.
          </p>
        </div>
        <div className="flex justify-end">
          <Button onClick={close}>Dismiss</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
