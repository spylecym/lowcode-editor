import { useMemo } from "react";
import { useComponentsConfigStore } from "../../stores/config";
import { MaterailItem } from "./materailItem";
function Materail() {
  const {config} = useComponentsConfigStore()
  const components = useMemo(()=>{
    return Object.values(config).filter(item=>item.name!=='Page')
  },[config])
  return (
    <div className="grid grid-cols-2 gap-2 p-2">
      {
        components&&components.length>0?
        components.map(item=>{
          return <MaterailItem key={item.name} name={item.name} describe={item.describe}></MaterailItem>
        }):null
      }
    </div>
  )
}
export default Materail;
