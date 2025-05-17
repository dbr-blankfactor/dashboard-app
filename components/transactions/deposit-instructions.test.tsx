import { render, screen, waitFor } from "@testing-library/react";
import DepositInstructions from "./deposit-instructions";
import * as depositService from "@/services/deposit-instructions.service";
import { getMockedDepositInstructions } from "@/mocks/deposit-instruction-mock";

const mockData = getMockedDepositInstructions();

beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue({
    json: () => Promise.resolve({ token: "fake-token" }),
  }) as jest.Mock;

  jest
    .spyOn(depositService, "fetchDepositInstructions")
    .mockResolvedValue(mockData);
});

describe("DepositInstructions", () => {
  it("renders all static field labels", async () => {
    render(<DepositInstructions />);
    await waitFor(() => {
      expect(screen.getByText("Bank Name")).toBeInTheDocument();
      expect(screen.getByText("Bank Address")).toBeInTheDocument();
      expect(screen.getByText("Routing Number")).toBeInTheDocument();
      expect(screen.getByText("Account Number")).toBeInTheDocument();
      expect(screen.getByText("Account Name")).toBeInTheDocument();
      expect(screen.getByText("For Further Credit")).toBeInTheDocument();
    });
  });

  it("renders deposit instruction values from mock", async () => {
    render(<DepositInstructions />);
    await waitFor(() => {
      expect(screen.getByText(mockData.data.bank_name)).toBeInTheDocument();
      expect(screen.getByText(mockData.data.bank_address)).toBeInTheDocument();
      expect(
        screen.getByText(mockData.data.routing_number)
      ).toBeInTheDocument();
      expect(
        screen.getByText(mockData.data.account_number)
      ).toBeInTheDocument();
      expect(screen.getByText(mockData.data.account_name)).toBeInTheDocument();
    });
  });

  it("shows masked credit account by default", async () => {
    render(<DepositInstructions />);
    const masked = `*****${mockData.data.account_number.slice(-4)}`;
    expect(await screen.findByText(masked)).toBeInTheDocument();
  });

  it("masks account number to last 4 digits correctly", async () => {
    render(<DepositInstructions />);
    const masked = `*****${mockData.data.account_number.slice(-4)}`;
    expect(await screen.findByText(masked)).toBeInTheDocument();
  });
});
