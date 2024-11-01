import { useEffect, useMemo, useState } from "react";
interface HoverMaskerProps {
  wrapperClassName?: string;
  componentId: number;
}
import { useComponentsStore, getComponent } from "../../stores/components";
const HoverMasker = ({
  wrapperClassName,
  componentId,
}: HoverMaskerProps) => {
  const { components } = useComponentsStore();
  const [position, setPosition] = useState({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    labelTop: 0,
    labelLeft: 0,
  });

  const updatePosition = () => {
    const ele = document.querySelector(`[data-component-id="${componentId}"]`);
    const wrapper = document.querySelector(`.${wrapperClassName}`);
    if (ele && wrapper) {
      const { width, height, top, left } = ele.getBoundingClientRect();
      const { top: wrapperTop, left: wrapperLeft } =
        wrapper.getBoundingClientRect();
      let labelTop = top - wrapperTop + wrapper.scrollTop;
      let labelLeft = left - wrapperLeft + width;
      if (labelTop <= 0) {
        labelTop -= -20;
      }
      setPosition({
        width,
        height,
        top: top - wrapperTop + wrapper.scrollTop,
        left: left - wrapperLeft + wrapper.scrollLeft,
        labelTop,
        labelLeft,
      });
    }
  };
  useEffect(() => {
    updatePosition();
  }, [componentId,components]);

  const labelName = useMemo(() => {
    const component = getComponent(componentId, components);
    return component?.describe || "";
  }, [componentId]);

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: position.left,
          top: position.top,
          backgroundColor: "rgba(0, 0, 255, 0.05)",
          border: "1px dashed blue",
          pointerEvents: "none",
          width: position.width,
          height: position.height,
          zIndex: 12,
          borderRadius: 4,
          boxSizing: 'border-box',
        }}
      />
      <div
          style={{
            position: "absolute",
            left: position.labelLeft,
            top: position.labelTop,
            fontSize: "14px",
            zIndex: 13,
            display: (!position.width || position.width < 10) ? "none" : "inline",
            transform: 'translate(-100%, -100%)',
          }}
        >
          <div
            style={{
              padding: '0 8px',
              backgroundColor: 'blue',
              borderRadius: 4,
              color: '#fff',
              cursor: "pointer",
              whiteSpace: 'nowrap',
            }}
          >
            {labelName}
          </div>
        </div>
    </>
  );
};
export default HoverMasker;