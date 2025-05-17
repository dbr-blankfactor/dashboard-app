import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Navbar } from "./navbar";
import { maskAccountFixed } from "@/utils/mask-account-number";
import * as customerService from "@/services/customer-account.service";
import * as balanceService from "@/services/balance-account.service";
import { getMockedBalance } from "@/mocks/balance-account-mock";
import { customerAccounts } from "@/mocks/customer-accounts-mock";
import { formatCurrency } from "@/utils/format-currency";

beforeEach(() => {
  window.HTMLElement.prototype.scrollIntoView = jest.fn();

  global.fetch = jest.fn().mockResolvedValue({
    json: () => Promise.resolve({ token: "fake-token" }),
  }) as jest.Mock;

  jest.spyOn(customerService, "fetchCustomerAccount").mockResolvedValue({
    message: "Accounts successfully retrieved",
    data: customerAccounts.data,
  });

  jest
    .spyOn(balanceService, "fetchBalanceAccount")
    .mockImplementation(({ payload }) =>
      Promise.resolve(getMockedBalance(payload))
    );
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("Navbar", () => {
  it("renders logo with correct link", async () => {
    render(<Navbar />);
    const logo = await screen.findByAltText("Logo");
    const logoLink = screen.getByRole("link", { name: /logo/i });

    expect(logo).toBeInTheDocument();
    expect(logoLink).toHaveAttribute("href", "/home");
  });

  it("displays account selector with correct labels", async () => {
    render(<Navbar />);
    expect(await screen.findByText("ACCOUNT")).toBeInTheDocument();
    expect(screen.getByText("Operating -")).toBeInTheDocument();
  });

  it("renders DEV and USER badges", async () => {
    render(<Navbar />);
    expect(await screen.findByText("DEV")).toBeInTheDocument();
    expect(screen.getByText("USER")).toBeInTheDocument();
  });

  it('displays "Operating -" text inside the select trigger', async () => {
    render(<Navbar />);
    expect(await screen.findByText("Operating -")).toBeInTheDocument();
  });

  it("renders default account balance correctly (CxXbc1Pk10)", async () => {
    const selected = customerAccounts.data[0];
    const { data } = getMockedBalance({
      account_number: selected.account_number,
      account_group: selected.account_group,
    });

    render(<Navbar />);

    expect(
      await screen.findByText(
        formatCurrency(
          data.available_balance.amount,
          data.available_balance.currency
        )
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        formatCurrency(
          data.pending_balance.amount,
          data.pending_balance.currency
        )
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        formatCurrency(
          data.total_balance.amount,
          data.available_balance.currency
        )
      )
    ).toBeInTheDocument();
  });

  it("calls fetchCustomerAccount and fetchBalanceAccount on load", async () => {
    const selected = customerAccounts.data[0];
    const expectedBalance = getMockedBalance({
      account_group: selected.account_group,
      account_number: selected.account_number,
    }).data;

    render(<Navbar />);

    expect(await screen.findByText("AVAIL BAL")).toBeInTheDocument();

    expect(customerService.fetchCustomerAccount).toHaveBeenCalledWith({
      token: "fake-token",
    });

    expect(balanceService.fetchBalanceAccount).toHaveBeenCalledWith({
      token: "fake-token",
      payload: {
        account_group: selected.account_group,
        account_number: selected.account_number,
      },
    });

    expect(
      screen.getByText(
        formatCurrency(
          expectedBalance.available_balance.amount,
          expectedBalance.available_balance.currency
        )
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        formatCurrency(
          expectedBalance.pending_balance.amount,
          expectedBalance.pending_balance.currency
        )
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        formatCurrency(
          expectedBalance.total_balance.amount,
          expectedBalance.available_balance.currency
        )
      )
    ).toBeInTheDocument();
  });

  it("updates balance when a different account is selected", async () => {
    const second = customerAccounts.data[0];
    const secondBalance = getMockedBalance({
      account_group: second.account_group,
      account_number: second.account_number,
    }).data;

    render(<Navbar />);

    const trigger = await screen.findByText("Operating -");
    fireEvent.mouseDown(trigger);

    const option = await screen.findByText(
      maskAccountFixed(second.account_number)
    );
    fireEvent.click(option);

    await waitFor(() => {
      expect(
        screen.getByText(
          formatCurrency(
            secondBalance.available_balance.amount,
            secondBalance.available_balance.currency
          )
        )
      ).toBeInTheDocument();
    });

    expect(
      screen.getByText(
        formatCurrency(
          secondBalance.pending_balance.amount,
          secondBalance.pending_balance.currency
        )
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        formatCurrency(
          secondBalance.total_balance.amount,
          secondBalance.available_balance.currency
        )
      )
    ).toBeInTheDocument();
  });
});

import { fetchBalanceAccount } from "@/services/balance-account.service";
import { BalancePayload } from "@/types/accounts-balance";

global.fetch = jest.fn();

const payload: BalancePayload = {
  account_group: 1,
  account_number: "CxXbc1Pk10",
};

describe("fetchBalanceAccount", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.NEXT_PUBLIC_API_BASE_URL = "https://api.mock.com";
    process.env.NEXT_PUBLIC_AMPLIFY_KEY = "amplify-key";
  });

  it("returns mocked balance when USE_MOCK is true", async () => {
    process.env.NEXT_PUBLIC_USE_MOCK_API = "true";
    const result = await fetchBalanceAccount({ token: "fake-token", payload });
    expect(result.data).toHaveProperty("account_number", "CxXbc1Pk10");
  });
});
