// __tests__/QuickActions.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { QuickActions } from "@/components/home/quick-actions";
import { quickActions } from "@/constants/quick-actions";

describe("QuickActions component", () => {
  it("Should render all action buttons and handles modal triggers", () => {
    const openModalMock = jest.fn();
    const hasPendingTransfers = true;

    render(
      <QuickActions
        openModal={openModalMock}
        hasPendingTransfers={hasPendingTransfers}
      />
    );

    expect(screen.getByText("Quick Actions")).toBeInTheDocument();

    quickActions.flat().forEach((action) => {
      expect(screen.getByText(action.title)).toBeInTheDocument();
    });

    const depositButton = screen
      .getByText("Get deposit instructions")
      .closest("button");
    const approveButton = screen
      .getByText("Authorize transfer")
      .closest("button");

    if (depositButton) fireEvent.click(depositButton);
    if (approveButton) fireEvent.click(approveButton);

    expect(openModalMock).toHaveBeenCalledWith("Deposit");
    expect(openModalMock).toHaveBeenCalledWith("Approved");
    expect(openModalMock).toHaveBeenCalledTimes(2);
  });

  it("does not call openModal on actions without modal trigger", () => {
    const openModalMock = jest.fn();
    render(
      <QuickActions openModal={openModalMock} hasPendingTransfers={false} />
    );

    const nonModalActions = quickActions
      .flat()
      .filter((action) => !action.openModal);

    nonModalActions.forEach((action) => {
      const button = screen.getByText(action.title).closest("button");
      if (button) fireEvent.click(button);
    });

    expect(openModalMock).not.toHaveBeenCalled();
  });

  it("applies approved styles when hasPendingTransfers is true", () => {
    const openModalMock = jest.fn();
    render(
      <QuickActions openModal={openModalMock} hasPendingTransfers={true} />
    );

    const approveButton = screen
      .getByText("Authorize transfer")
      .closest("button");

    expect(approveButton).toHaveClass("bg-[#FAC0004D]");
  });

  it("applies normal styles when hasPendingTransfers is false", () => {
    const openModalMock = jest.fn();
    render(
      <QuickActions openModal={openModalMock} hasPendingTransfers={false} />
    );

    const approveButton = screen
      .getByText("Authorize transfer")
      .closest("button");

    expect(approveButton).toHaveClass("bg-[#2864834D]");
    expect(approveButton).not.toHaveClass("bg-[#FAC0004D]");
  });
});
