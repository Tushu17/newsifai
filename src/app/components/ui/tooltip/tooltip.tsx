import React, { useRef, useState, useEffect } from "react";

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  className = "",
}) => {
  const [open, setOpen] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  // Close tooltip when clicking outside
  useEffect(() => {
    if (!open) return;
    function handleClick(event: MouseEvent) {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div className={`relative inline-block ${className}`}>
      <div
        ref={triggerRef}
        onClick={() => setOpen((o) => !o)}
        className="cursor-pointer"
      >
        {children}
      </div>
      {open && (
        <div
          ref={tooltipRef}
          className="mt-4 absolute left-full top-1/2 -translate-y-1/2 ml-2 z-50 min-w-[180px] max-w-xs bg-gray-900 text-white text-xs rounded-lg shadow-lg px-4 py-2 animate-fade-in"
          style={{ pointerEvents: "auto" }}
        >
          <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-full w-3 h-3 overflow-hidden">
            <div className="w-3 h-3 bg-gray-900 rotate-45 transform origin-right"></div>
          </div>
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
