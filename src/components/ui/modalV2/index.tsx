"use client";
import React, { useRef, useEffect, useCallback, useId } from "react";
import { createPortal } from "react-dom";

type ModalSize = "sm" | "md" | "lg" | "xl" | "2xl" | "full";
type ModalPosition = "center" | "top" | "bottom" | "drawer-right" | "drawer-left";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: ModalSize;
  position?: ModalPosition;
  className?: string;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  preventScroll?: boolean;
  showCloseButton?: boolean;
  title?: string;
  description?: string;
  onAfterOpen?: () => void;
  onAfterClose?: () => void;
}

const sizeClasses: Record<ModalSize, string> = {
  sm: "w-full max-w-sm", md: "w-full max-w-md", lg: "w-full max-w-[768px]",
  xl: "w-full max-w-[960px]", "2xl": "w-full max-w-[1200px]", full: "w-full h-full max-w-none rounded-none",
};
const positionClasses: Record<ModalPosition, string> = {
  center: "items-center justify-center", top: "items-start justify-center pt-16",
  bottom: "items-end justify-center pb-8", "drawer-right": "items-stretch justify-end",
  "drawer-left": "items-stretch justify-start",
};
const drawerContentClasses: Record<ModalPosition, string> = {
  center: "", top: "", bottom: "",
  "drawer-right": "h-full rounded-none rounded-l-3xl max-w-sm",
  "drawer-left": "h-full rounded-none rounded-r-3xl max-w-sm",
};
const positionEnterAnimation: Record<ModalPosition, string> = {
  center: "modal-enter-center", top: "modal-enter-top", bottom: "modal-enter-bottom",
  "drawer-right": "modal-enter-right", "drawer-left": "modal-enter-left",
};

const ModalV2: React.FC<ModalProps> = ({
  isOpen, onClose, children, size = "md", position = "center", className = "",
  closeOnBackdrop = true, closeOnEscape = true, preventScroll = true,
  showCloseButton = true, title, description,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const isDrawer = position === "drawer-right" || position === "drawer-left";
  const isFull = size === "full";

  const handleClose = useCallback(() => onClose(), [onClose]);

  useEffect(() => {
    if (!closeOnEscape) return;
    const h = (e: KeyboardEvent) => { if (e.key === "Escape" && isOpen) handleClose(); };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [isOpen, closeOnEscape, handleClose]);

  useEffect(() => {
    if (!preventScroll) return;
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen, preventScroll]);

  if (typeof window === "undefined" || !isOpen) return null;

  const isRoundedFull = isFull || isDrawer;
  const contentClasses = [
    "relative bg-white dark:bg-gray-900 shadow-2xl",
    !isRoundedFull && "rounded-3xl",
    drawerContentClasses[position],
    !isDrawer && !isFull && sizeClasses[size],
    className,
  ].filter(Boolean).join(" ");

  return createPortal(
    <>
      <style>{`
        @keyframes modal-backdrop-in { from{opacity:0} to{opacity:1} }
        @keyframes modal-center-in { from{opacity:0;transform:scale(0.95) translateY(8px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes modal-right-in { from{opacity:0;transform:translateX(100%)} to{opacity:1;transform:translateX(0)} }
        .modal-backdrop{animation:modal-backdrop-in 0.2s ease forwards}
        .modal-enter-center{animation:modal-center-in 0.25s cubic-bezier(0.34,1.56,0.64,1) forwards}
        .modal-enter-right{animation:modal-right-in 0.3s cubic-bezier(0.22,1,0.36,1) forwards}
      `}</style>
      <div
        role="dialog" aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descriptionId : undefined}
        className={`fixed inset-0 z-50 flex overflow-y-auto ${positionClasses[position]}`}
      >
        {!isFull && (
          <div aria-hidden="true" className="modal-backdrop fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={closeOnBackdrop ? handleClose : undefined} />
        )}
        <div ref={modalRef} className={`${contentClasses} ${positionEnterAnimation[position]} border border-gray-200 dark:border-gray-700`}
          onClick={(e) => e.stopPropagation()}>
          {(title || description) && (
            <div className="px-6 pt-6 pb-4 pr-14">
              {title && <h2 id={titleId} className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>}
              {description && <p id={descriptionId} className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>}
            </div>
          )}
          {showCloseButton && (
            <button type="button" aria-label="Fechar modal" onClick={handleClose}
              className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white transition-all sm:right-5 sm:top-5">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          )}
          {children}
        </div>
      </div>
    </>,
    document.body
  );
};

export default ModalV2;
