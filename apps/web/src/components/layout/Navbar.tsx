"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Store, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/hooks/auth/useAuth";
import { UserMenu } from "./UserMenu";

const Navbar = () => {
  const pathname = usePathname();
  const { isAuthenticated, isLoading } = useAuthContext();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 md:h-16 items-center justify-between px-3 md:px-6">
        <Link
          href="/stores"
          className="flex items-center gap-1.5 md:gap-2 font-bold text-lg md:text-xl text-primary hover:text-primary/80 transition-colors"
        >
          <Store className="h-5 w-5 md:h-6 md:w-6" />
          <span className="hidden xs:inline">Mini Market</span>
          <span className="xs:hidden">MM</span>
        </Link>

        <div className="flex items-center gap-2 md:gap-4">
          <Button
            asChild
            variant={pathname === "/stores" ? "default" : "ghost"}
            className="font-medium"
            size="sm"
          >
            <Link href="/stores">Tiendas</Link>
          </Button>

          {!isLoading && (
            <>
              {isAuthenticated ? (
                <UserMenu />
              ) : (
                <Button
                  asChild
                  className="gap-1.5 md:gap-2 h-9 md:h-10 px-3 md:px-4"
                  size="sm"
                >
                  <Link href="/login">
                    <LogIn className="h-3.5 w-3.5 md:h-4 md:w-4" />
                    <span className="hidden sm:inline">Iniciar Sesión</span>
                    <span className="sm:hidden">Login</span>
                  </Link>
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
