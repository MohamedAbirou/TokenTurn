"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import Link from "next/link";

const NotificationModal = () => {
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === "notification";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black dark:bg-zinc-700 p-0 overflow-hidden">
        <DialogHeader className="p-6">
          <DialogTitle className="text-xl font-bold">
            Add Price Alert
          </DialogTitle>
        </DialogHeader>
        <div className="px-6 pb-6">
          <p>
            When the price hits the target price, an alert will be sent to you
            via notification. To receive alerts, please download the{" "}
            <Link
              href="https://www.coingecko.com/en/mobile"
              className="text-emerald-500"
            >
              CoinGecko mobile app
            </Link>
            .
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationModal;
