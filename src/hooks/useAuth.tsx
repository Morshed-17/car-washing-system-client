import { useAppSelector } from "@/redux/hooks";

export default function useAuth() {
  const { user, token } = useAppSelector((state) => state.user);
  return { user, token };
}
