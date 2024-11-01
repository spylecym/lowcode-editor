interface ClickMakerProps {
  componentId: number;
  wrapperClassName: string;
}
import { useComponentsStore, getComponent } from "../../stores/components";
import { useEffect, useMemo, useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import type { PopconfirmProps } from "antd";
import { message, Popconfirm, Dropdown } from "antd";

const ClickMaker = ({ componentId, wrapperClassName }: ClickMakerProps) => {
  const { components, deleteComponent, setCurrentComponentId } =
    useComponentsStore();
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
  }, [componentId, components]);

  const labelName = useMemo(() => {
    const component = getComponent(componentId, components);
    return component?.describe || "";
  }, [componentId]);

  const confirm: PopconfirmProps["onConfirm"] = () => {
    deleteComponent(componentId);
    setCurrentComponentId(0);
    message.success("Click on Yes");
  };

  const parentComponents = useMemo(() => {
    let arr = [];
    let component = getComponent(componentId, components);
    while (component?.parentId) {
      component = getComponent(component.parentId, components);
      if(component?.id!=1) arr.push(component);
    }
    return arr;
  }, [componentId, components]);

  useEffect(() => {
    const resizeHandler = () => {
      updatePosition();
    }
    window.addEventListener('resize', resizeHandler)
    return () => {
      window.removeEventListener('resize', resizeHandler)
    }
}, []);

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
          boxSizing: "border-box",
        }}
      />
      <div
      className="flex gap-2"
        style={{
          position: "absolute",
          left: position.labelLeft,
          top: position.labelTop,
          fontSize: "14px",
          zIndex: 13,
          transform: "translate(-100%, -100%)",
        }}
      >
        <Dropdown
          menu={{
            items: parentComponents.map((item) => {
              return {
                label: item?.describe!,
                key: item?.id!,
              };
            }),
            onClick: ({ key }) => {
              setCurrentComponentId(+key);
            },
          }}
          disabled={parentComponents.length === 0}
        >
          <div
            style={{
              padding: "0 8px",
              backgroundColor: "blue",
              borderRadius: 4,
              color: "#fff",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            {labelName}
          </div>
        </Dropdown>
        <Popconfirm
          title="Delete the task"
          description="Are you sure to delete this task?"
          onConfirm={confirm}
          okText="Yes"
          cancelText="No"
        >
          <DeleteOutlined />
        </Popconfirm>
      </div>
    </>
  );
};
export default ClickMaker;
