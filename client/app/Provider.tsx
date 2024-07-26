import { Provider } from "react-redux";
import { store } from "./redux/store";

interface providerProps {
  children: any;
}

export function Providers({ children }: providerProps) {
  return <Provider store={store}>{children}</Provider>;
}
