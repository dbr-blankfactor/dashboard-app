"use client";

import {
  formatDateLocal,
  getDateOnly,
  parseLocalDateString,
} from "@/utils/date";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchTransactions } from "@/services/transaction-history.service";
import { Calendar as CalendarIcon } from "lucide-react";
import { FileSpreadsheet, Flag } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/custom-select";
import { Transaction } from "@/types/transaction-history";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "../ui/custom-icons";

export default function TransactionHistory() {
  const [filters, setFilters] = useState({
    transaction_id: "",
    counterparty: "",
    type: "all",
    settled_from: "",
    settled_to: "",
  });
  const [token, setToken] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Pagination
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(12);

  const totalPages: number = Math.ceil(filteredTransactions.length / limit);
  const currentPage: number = offset / limit + 1;
  const paginated: Transaction[] = filteredTransactions.slice(
    offset,
    offset + limit
  );

  const handlePrev = () => setOffset(Math.max(offset - limit, 0));
  const handleNext = () => {
    if (offset + limit < filteredTransactions.length) setOffset(offset + limit);
  };

  useEffect(() => {
    async function loadToken() {
      try {
        const res: Response = await fetch("/auth/access-token");
        const data = await res.json();
        setToken(data.token);
      } catch (err) {
        console.error("Failed to load token", err);
      }
    }

    loadToken();
  }, []);

  useEffect(() => {
    if (!token) return;

    const getData = async () => {
      setLoading(true);
      setError(null);
      try {
        const payload = {
          account_group: 1,
          account_number: "123asdf",
          pagination: { limit: 1000, offset: 0 },
          sorting: [
            { field: "settled_at", sort: "desc" as const },
            { field: "transaction_id", sort: "asc" as const },
          ],
          filters: [],
        };
        const res = await fetchTransactions(payload, token);
        setTransactions(res.data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [token]);

  useEffect(() => {
    const normalizedType: string =
      filters.type === "all" ? "" : filters.type.toLowerCase();
    const fromDate = filters.settled_from
      ? new Date(filters.settled_from)
      : null;
    const toDate = filters.settled_to ? new Date(filters.settled_to) : null;

    const result = transactions.filter((tx) => {
      const matchesId = tx.transaction_id
        .toLowerCase()
        .includes(filters.transaction_id.toLowerCase());

      const matchesCounterparty = tx.counterparty
        .toLowerCase()
        .includes(filters.counterparty.toLowerCase());

      const matchesType = normalizedType
        ? tx.type.toLowerCase() === normalizedType
        : true;

      const settled = getDateOnly(new Date(tx.settled_at));
      const from = fromDate ? getDateOnly(fromDate) : null;
      const to = toDate ? getDateOnly(toDate) : null;

      const matchesDate = (!from || settled >= from) && (!to || settled <= to);

      return matchesId && matchesCounterparty && matchesType && matchesDate;
    });

    setFilteredTransactions(result);
    setOffset(0);
  }, [filters, transactions]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl">Transaction History</CardTitle>
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="bg-amber-50 text-amber-700 hover:bg-amber-50 flex items-center gap-1 text-md fs-4 rounded-lg"
          >
            <Flag className="h-4 w-4" />
            [3] transactions need approval
          </Badge>
          <Button variant="outline" size="sm" className="h-8 bg-slate-300">
            <FileSpreadsheet className="mr-2 h-4 w-4 " />
            CSV
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="flex gap-2 mb-4">
          <Input
            placeholder="Transaction ID"
            className="w-full sm:w-auto"
            value={filters.transaction_id}
            onChange={(e) =>
              setFilters({ ...filters, transaction_id: e.target.value })
            }
          />
          <Input
            placeholder="Counterparty"
            className="w-full sm:w-auto"
            value={filters.counterparty}
            onChange={(e) =>
              setFilters({ ...filters, counterparty: e.target.value })
            }
          />
          <Select
            value={filters.type}
            onValueChange={(value) => setFilters({ ...filters, type: value })}
          >
            <SelectTrigger className="w-full sm:w-[150px] h-10">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Send">Send</SelectItem>
              <SelectItem value="Deposit">Deposit</SelectItem>
              <SelectItem value="Withdrawal">Withdrawal</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center gap-1 w-full sm:w-auto">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-[140px] justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                  {filters.settled_from ? (
                    format(
                      parseLocalDateString(filters.settled_from),
                      "yyyy-MM-dd"
                    )
                  ) : (
                    <span className="text-muted-foreground">From</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={
                    filters.settled_from
                      ? new Date(filters.settled_from + "T00:00:00")
                      : undefined
                  }
                  onSelect={(date) =>
                    setFilters({
                      ...filters,
                      settled_from: date ? formatDateLocal(date) : "",
                    })
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <span className="px-1">&</span>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-[140px] justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                  {filters.settled_to ? (
                    format(
                      parseLocalDateString(filters.settled_to),
                      "yyyy-MM-dd"
                    )
                  ) : (
                    <span className="text-muted-foreground">To</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={
                    filters.settled_to
                      ? new Date(filters.settled_to + "T00:00:00")
                      : undefined
                  }
                  onSelect={(date) =>
                    setFilters({
                      ...filters,
                      settled_to: date ? formatDateLocal(date) : "",
                    })
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-sm text-gray-500">
                <th className="text-left py-2 font-normal">ID</th>
                <th className="text-left py-2 font-normal">
                  <div className="flex items-center">
                    Last Time
                    <ChevronDownIcon className="h-4 w-4 ml-1 text-teal-500" />
                  </div>
                </th>
                <th className="text-left py-2 font-normal">
                  <div className="flex items-center">
                    Type
                    <ChevronDownIcon className="h-4 w-4 ml-1 text-teal-500" />
                  </div>
                </th>
                <th className="text-left py-2 font-normal">Status</th>
                <th className="text-left py-2 font-normal">Counterparty</th>
                <th className="text-right py-2 font-normal">Amount</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-4">
                    Loading...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-red-600">
                    {error}
                  </td>
                </tr>
              ) : transactions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-4">
                    No transactions found
                  </td>
                </tr>
              ) : (
                paginated.map((tx, i) => (
                  <tr key={i} className="border-b">
                    <td className="py-3 text-blue-600">{tx.transaction_id}</td>
                    <td className="py-3">{tx.settled_at}</td>
                    <td className="py-3">{tx.type}</td>
                    <td className="py-3">
                      {tx.status === "Approve" ? (
                        <span className="text-amber-500">Approve</span>
                      ) : (
                        tx.status
                      )}
                    </td>
                    <td className="py-3">{tx.counterparty}</td>
                    <td
                      className={`py-3 text-right ${
                        tx.amount < 0 ? "text-red-600" : "text-green-500"
                      }`}
                    >
                      {tx.amount < 0 ? "-" : "+"}$
                      {Math.abs(tx.amount).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center mt-4">
          <div className="flex items-center">
            <Select
              value={String(limit)}
              onValueChange={(v) => setLimit(Number(v))}
            >
              <SelectTrigger className="w-[70px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="6">6</SelectItem>
                <SelectItem value="12">12</SelectItem>
                <SelectItem value="24">24</SelectItem>
                <SelectItem value="48">48</SelectItem>
              </SelectContent>
            </Select>
            <span className="ml-2 text-sm text-gray-500 whitespace-nowrap">
              per page
            </span>
          </div>

          <div className="flex items-center justify-center w-5/6 gap-2">
            <Button
              variant="ghost"
              size="icon"
              disabled={offset === 0}
              onClick={handlePrev}
            >
              <ChevronLeftIcon className="h-4 w-4 text-teal-500" />
            </Button>
            <span className="text-sm">
              Page {currentPage} of {totalPages || 1}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNext}
              disabled={offset + limit >= filteredTransactions.length}
            >
              <ChevronRightIcon className="h-4 w-4 text-teal-500" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
