import Link from "next/link";

import styles from "@/styles/Header.module.scss";

import { Inter } from "next/font/google";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

interface HeaderProps {}

export default function Header({ ...HeaderProps }: HeaderProps) {
  const session = useSession();
  const router = useRouter();

  const logout = () => {
    toast.success("Logout successfully");
    signOut({
      redirect: false,
    });
    router.push("/")
  };

  return (
    <>
      {router.pathname !== "/" && router.pathname !== "/protected" && session.data && (
        <header className={styles.headers}>
          <h6>hi, {session.data?.user.username}</h6>
          <Link
            href={`/`}
            onClick={() => {
              logout();
            }}
          >
            Logout
          </Link>
        </header>
      )}
    </>
  );
}
