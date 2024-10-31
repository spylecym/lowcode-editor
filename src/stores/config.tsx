import { create } from "zustand";
import Container from "../editor/materals/Container";
import Button from "../editor/materals/Button";
import Page from "../editor/materals/Page";

interface Config {
  name: string;
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
      defaultProps: {},
      component: Page
    },
    Container:{
      name: "Container",
      defaultProps: {},
      component: Container
    },
    Button:{
      name: "Button",
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
