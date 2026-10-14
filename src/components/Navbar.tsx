import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar as HeroUiNavbar,
  NavbarBrand,
  NavbarContent,
} from "@heroui/react";
import { Link } from "react-router-dom";
import defaultProfile from '../assets/logos/default-profile-image.jpg';
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {

  const { logout } = useAuth()

  return (
    <HeroUiNavbar className="border-b border-border bg-background" maxWidth="xl" classNames={{ wrapper: 'gap-3 px-4 sm:px-6' }} isBlurred={false}>
      <NavbarBrand>
        <Link to={"/"} className="flex items-center gap-2 text-xl font-bold tracking-tight sm:text-2xl" aria-label="Route Connect home">
          <span className="text-text-primary">Route</span><span className="text-secondary">Connect</span>
        </Link>
      </NavbarBrand>

      <NavbarContent as="div" justify="end" className="grow-0 gap-2">
        <Dropdown placement="bottom-start">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform w-9 h-9 sm:w-10 sm:h-10 rounded-full ring-secondary cursor-pointer object-cover shrink-0"
              color="secondary"
              name={"user name"}
              src={defaultProfile}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat" className="bg-surface text-text-primary rounded-xl">
            <DropdownItem key="logout" className="text-danger" onClick={logout}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </HeroUiNavbar>
  );
}
