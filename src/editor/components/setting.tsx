import { useComponentsStore } from "../../stores/components";

function Setting(){
  const { components } = useComponentsStore();

  return <>
          <pre>{JSON.stringify(components,null,2)}</pre>
  </>
}
export default Setting;