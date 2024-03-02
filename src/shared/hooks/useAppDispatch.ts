import { useDispatch } from "react-redux";
import { AppDispatch } from "src/app/providers/StoreProvider";

export const useAppDispatch = () => useDispatch<AppDispatch>();
