import { useRef,useEffect,useState } from "react"
import {
  draggable
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import clsx from "clsx";

interface MaterailItemProps{
  name:string
}
export const MaterailItem = ({name}:MaterailItemProps) => {
  const ref = useRef(null)
  const [dragging, setDragging] = useState<boolean>(false);

  useEffect(() => {
    const el = ref.current;

    return draggable({
        element: el!,
        // 传递数据
        getInitialData:()=>{
          return {name}
        },
        onDragStart: () => setDragging(true),
        onDrop: () => setDragging(false),
    });
}, []);

  return <div ref={ref} className={clsx("p-2 border border-gray-200 rounded-md text-center hover:border-blue-500 hover:text-blue-500 cursor-move",dragging?"text-[#6B7586] border-[#6B7586] border-dashed opacity-70":"")}>{name}</div>
}