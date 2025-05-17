import { FinancialInstitutionExclusions } from "@/components/deposit/financial-institution-exclusions";
import { DepositPositionsTable } from "@/components/deposit/deposit-positions-table";
import { DepositMapCard } from "@/components/deposit/deposit-map-card";

export default function DepositPositionsPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DepositPositionsTable />
        </div>

        <div className="space-y-6">
          <DepositMapCard />
          <FinancialInstitutionExclusions />
        </div>
      </div>
    </div>
  );
}
