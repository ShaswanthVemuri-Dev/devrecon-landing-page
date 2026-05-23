import React, { useRef, useState } from 'react';

const PRODUCT_THEME = {
  mymedicals: {
    soft: 'radial-gradient(circle at 50% 50%, rgba(74,144,226,0.56), rgba(102,199,42,0.16) 42%, transparent 72%)',
    lower: 'radial-gradient(circle at 50% 50%, rgba(74,144,226,0.46), rgba(255,186,67,0.14) 45%, transparent 74%)',
  },
  mastermentor: {
    soft: '#EFF6FF',
  },
};

const TAP_MOVE_LIMIT = 8;
const TAP_TIME_LIMIT = 650;
const RECENT_TOUCH_WINDOW = 900;

const isInteractiveTarget = (target) => {
  if (!(target instanceof Element)) return false;
  return Boolean(target.closest('a, button, input, select, textarea, [role="button"], [data-preview-interactive="true"], [data-preview-menu="true"]'));
};

const getNow = () => {
  if (typeof window !== 'undefined' && window.performance?.now) {
    return window.performance.now();
  }
  return Date.now();
};

const ShellGlow = ({ productId }) => {
  if (productId === 'mymedicals') {
    return (
      <>
        <div className="absolute inset-0 bg-[#000000]" />
        <div className="native-colour-stage absolute top-[8%] -left-[34%] h-[62%] w-[120%] rounded-full opacity-[0.16] blur-[98px] devrecon-tide" style={{ background: PRODUCT_THEME.mymedicals.soft }} />
        <div className="native-colour-stage absolute bottom-[-7%] -right-[30%] h-[62%] w-[90%] rounded-full opacity-[0.15] blur-[92px] devrecon-tide-delayed" style={{ background: PRODUCT_THEME.mymedicals.lower }} />
        <div className="native-colour-stage absolute inset-0 bg-[radial-gradient(circle_at_52%_38%,rgba(74,144,226,0.52),transparent_56%)] opacity-60" />
        <div className="absolute inset-[1px] rounded-[2.45rem] border border-white/[0.06]" />
      </>
    );
  }

  return (
    <>
      <div className="absolute inset-0 bg-[#F8FAFC]" />
      <div
        className="native-colour-stage absolute inset-0 opacity-100"
        style={{
          background: `radial-gradient(circle at 82% 18%, ${PRODUCT_THEME.mastermentor.soft}, transparent 32%), radial-gradient(circle at 18% 82%, rgba(37,99,235,0.08), transparent 36%), linear-gradient(180deg,#FFFFFF 0%,#F8FAFC 100%)`,
        }}
      />
      <div className="absolute inset-[1px] rounded-[2.45rem] border border-slate-200/80" />
    </>
  );
};

const ProductPreviewFrame = ({ product, open, variant = 'mymedicals', children }) => {
  const tapStart = useRef(null);
  const recentTouchUntil = useRef(0);
  const [colourActive, setColourActive] = useState(false);
  const [hoverActive, setHoverActive] = useState(false);

  const markTouchInteraction = () => {
    recentTouchUntil.current = getNow() + RECENT_TOUCH_WINDOW;
  };

  const isRecentTouchInteraction = () => getNow() < recentTouchUntil.current;

  const activateDesktopHover = () => {
    if (isRecentTouchInteraction()) return;
    setColourActive(false);
    setHoverActive(true);
  };

  const clearDesktopHover = () => {
    setHoverActive(false);
    tapStart.current = null;
  };

  const handlePointerEnter = (event) => {
    if (event.pointerType === 'mouse' || event.pointerType === 'pen') {
      activateDesktopHover();
    }
  };

  const handlePointerLeave = (event) => {
    if (!event.pointerType || event.pointerType === 'mouse' || event.pointerType === 'pen') {
      clearDesktopHover();
    }
  };

  const handlePointerDown = (event) => {
    if (event.pointerType === 'mouse' || isInteractiveTarget(event.target)) {
      tapStart.current = null;
      return;
    }

    markTouchInteraction();
    setHoverActive(false);
    tapStart.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      time: getNow(),
    };
  };

  const handlePointerUp = (event) => {
    const start = tapStart.current;
    tapStart.current = null;
    if (!start || start.pointerId !== event.pointerId || isInteractiveTarget(event.target)) return;

    const movedX = Math.abs(event.clientX - start.x);
    const movedY = Math.abs(event.clientY - start.y);
    const elapsed = getNow() - start.time;

    if (movedX <= TAP_MOVE_LIMIT && movedY <= TAP_MOVE_LIMIT && elapsed <= TAP_TIME_LIMIT) {
      setColourActive((value) => !value);
    }
  };

  const handlePointerCancel = () => {
    tapStart.current = null;
  };

  const isColourActive = open || colourActive || hoverActive;

  return (
    <div
      data-menu-open={open ? 'true' : 'false'}
      data-colour-active={isColourActive ? 'true' : 'false'}
      data-hover-active={hoverActive ? 'true' : 'false'}
      className="product-preview-card group relative overflow-hidden rounded-[2.5rem] border border-[#242424] bg-[#0E0E10] shadow-[0_30px_92px_rgba(0,0,0,0.24)]"
      aria-label={`${product.name} miniature homepage preview`}
      onMouseEnter={activateDesktopHover}
      onMouseLeave={clearDesktopHover}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
    >
      <ShellGlow productId={variant} />
      <div className="product-preview-viewport relative z-10 min-h-[560px] overflow-hidden rounded-[2.5rem]">
        {children}
      </div>
    </div>
  );
};

export default ProductPreviewFrame;
