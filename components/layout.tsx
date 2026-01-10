import { useRouter } from "next/router";
import Navigation from "./navigation";
import Footer from "./footer";

interface LayoutProps {
  children: React.ReactNode;
  navigationData: any;
}

const Layout: React.FC<LayoutProps> = ({ children, navigationData }) => {
  const router = useRouter();
  const isHome = router.pathname === "/";

  const theme: "light" | "dark" = isHome ? "light" : "dark";

  return (
    <>
      <Navigation theme={theme} />
      {children}
      <Footer theme={theme} />
    </>
  );
};

export default Layout;
