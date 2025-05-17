import React from "react";
import { render, screen } from "@testing-library/react";
import { navItems } from "@/constants/nav-items";
import { usePathname } from "next/navigation";
import { Sidebar } from "./sidebar";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

describe("Sidebar", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should render all navigation items", () => {
    (usePathname as jest.Mock).mockReturnValue("/");

    render(<Sidebar />);

    navItems.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    });
  });

  it("Should applies active class to the current route", () => {
    const activeRoute = navItems[0].href;
    (usePathname as jest.Mock).mockReturnValue(activeRoute);

    const { getByText } = render(<Sidebar />);
    const activeLink = getByText(navItems[0].title).closest("a");

    expect(activeLink).toHaveClass("text-[#414141]");
    expect(activeLink).toHaveClass("font-medium");
  });
});
