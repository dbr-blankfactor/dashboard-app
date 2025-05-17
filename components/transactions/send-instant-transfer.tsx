import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Info, Rocket, Lock } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export default function SendInstantTransfer() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 mb-5">
        <CardTitle className="text-xl">Send Instant Transfer</CardTitle>
        <Info className="h-5 w-5 text-gray-400" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-[120px_1fr] items-center gap-2">
            <div className="text-sm text-gray-500">Source Account</div>
            <div className="relative">
              <Input value="Operating - ****9180" readOnly className="pr-10" />
              <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>

            <div className="text-sm text-gray-500">Receiver INDX ID</div>
            <Input placeholder="#m3n3trade" />

            <div className="text-sm text-gray-500">Amount</div>
            <Input placeholder="$354,650.00" />

            <div className="text-sm text-gray-500">Note</div>
            <Input placeholder="For tradeid: 9210401" />

            <div></div>
            <Button className="w-full bg-teal-500 hover:bg-teal-600">
              <Rocket className="mr-2 h-4 w-4" />
              Send Transfer
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}