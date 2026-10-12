import { useRef, useState } from "react";

const BOTTOM_ZONE = 64;

function readScroll(root) {
  const viewport = root?.querySelector(".ag-center-cols-viewport");
  if (!viewport) return null;
  const { scrollLeft, scrollWidth, clientWidth } = viewport;
  if (scrollWidth <= clientWidth + 2) return null;
  return { viewport, scrollLeft, scrollWidth, clientWidth };
}

export default function GridFrame({ height, children }) {
  const rootRef = useRef(null);
  const trackRef = useRef(null);
  const dragging = useRef(false);
  const [show, setShow] = useState(false);
  const [metrics, setMetrics] = useState(null);

  const refresh = () => setMetrics(readScroll(rootRef.current));

  const onMouseMove = (event) => {
    if (dragging.current) return;
    const rect = rootRef.current.getBoundingClientRect();
    const nearBottom = rect.bottom - event.clientY <= BOTTOM_ZONE;
    setShow(nearBottom);
    if (nearBottom) refresh();
  };

  const onMouseLeave = () => {
    if (!dragging.current) setShow(false);
  };

  const scrollTo = (nextLeft) => {
    const current = readScroll(rootRef.current);
    if (!current) return;
    const max = current.scrollWidth - current.clientWidth;
    current.viewport.scrollLeft = Math.min(max, Math.max(0, nextLeft));
    refresh();
  };

  const onThumbDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const current = readScroll(rootRef.current);
    const trackWidth = rootRef.current ? rootRef.current.clientWidth - 24 : 0;
    if (!current || trackWidth <= 0) return;

    dragging.current = true;
    const startX = event.clientX;
    const startLeft = current.scrollLeft;
    const maxScroll = current.scrollWidth - current.clientWidth;
    const thumbWidth = Math.max(48, trackWidth * (current.clientWidth / current.scrollWidth));
    const maxThumb = Math.max(1, trackWidth - thumbWidth);

    const move = (moveEvent) => {
      const delta = moveEvent.clientX - startX;
      scrollTo(startLeft + (delta / maxThumb) * maxScroll);
    };
    const up = () => {
      dragging.current = false;
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
      setShow(false);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };

  const onTrackDown = (event) => {
    if (event.target !== trackRef.current) return;
    const current = readScroll(rootRef.current);
    const track = trackRef.current;
    if (!current || !track) return;
    const rect = track.getBoundingClientRect();
    const ratio = (event.clientX - rect.left) / rect.width;
    const maxScroll = current.scrollWidth - current.clientWidth;
    scrollTo(ratio * maxScroll - current.clientWidth / 2);
  };

  let thumb = null;
  if (metrics && rootRef.current) {
    const trackWidth = rootRef.current.clientWidth - 24;
    const thumbWidth = Math.max(48, trackWidth * (metrics.clientWidth / metrics.scrollWidth));
    const maxThumb = Math.max(0, trackWidth - thumbWidth);
    const maxScroll = metrics.scrollWidth - metrics.clientWidth;
    const thumbLeft = maxScroll === 0 ? 0 : (metrics.scrollLeft / maxScroll) * maxThumb;
    thumb = { thumbWidth, thumbLeft };
  }

  return (
    <div
      ref={rootRef}
      className="ag-theme-alpine"
      style={{ height, width: "100%", position: "relative" }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
      {show && metrics && (
        <div ref={trackRef} className="alinma-hscroll" onMouseDown={onTrackDown}>
          <div
            className="alinma-hscroll-thumb"
            style={thumb ? { width: thumb.thumbWidth, transform: `translateX(${thumb.thumbLeft}px)` } : undefined}
            onMouseDown={onThumbDown}
          />
        </div>
      )}
    </div>
  );
}
