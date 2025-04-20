import { SignInButton } from "@clerk/nextjs";
import { Spinner } from "@/components/ui/spinner";
import { useConvexAuth } from "convex/react";
import Link from "next/link";

const Header = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col">
      <h1
        className="md:text-8xl text-7xl text-center translate-y-[-10vh] text-white text-shadow-lg -mb-12"
        style={{ fontFamily: '"Limelight",cursive' }}>
        CINEMAGINE
      </h1>
      {isLoading && <Spinner size="large" className="text-white" />}
      {!isAuthenticated && !isLoading && (
        <SignInButton>
          <button className="px-2 py-3 text-white bg-amber-700 rounded-lg text-lg hover:bg-amber-900 transition">
            Sign In For Free!
          </button>
        </SignInButton>
      )}
      {isAuthenticated && !isLoading && (
        <Link
          className="cursor-pointer px-2 py-3 text-white bg-amber-700 rounded-lg text-lg hover:bg-amber-900 transition"
          href="/onboarding">
          Enter the Cinemagic!
        </Link>
      )}
    </div>
  );
};

export default Header;
