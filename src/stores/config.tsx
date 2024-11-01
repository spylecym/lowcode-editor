import { create } from "zustand";
import Container from "../editor/materals/Container";
import Button from "../editor/materals/Button";
import Page from "../editor/materals/Page";

interface Config {
  name: string;
  describe:string;
  defaultProps: Record<string, any>;
  component: any;
}
interface State {
  config: {[key:string]:Config};
}
interface Action {
  registerConfig: (name:string,config: Config) => void;
}
export const useComponentsConfigStore = create<State & Action>((set) => ({
  config: {
    Page:{
      name: "Page",
      describe:'页面',
      defaultProps: {},
      component: Page
    },
    Container:{
      name: "Container",
      describe:'容器',
      defaultProps: {},
      component: Container
    },
    Button:{
      name: "Button",
      describe:'按钮',
      defaultProps: {
        text: "按钮",
        type: "primary",
      },
      component: Button
    }
  },
  registerConfig: (name,config) => {
    set((state) => ({
      config: { ...state.config, [name]:config },
    }));
  },
}))
