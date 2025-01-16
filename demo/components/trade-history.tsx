import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Trade {
  date: string
  type: string
  amount: number
  price: number
}

interface TradeHistoryProps {
  trades: Trade[]
}

export function TradeHistory({ trades }: TradeHistoryProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-neutral-300">Date</TableHead>
          <TableHead className="text-neutral-300">Type</TableHead>
          <TableHead className="text-neutral-300">Amount (BTC)</TableHead>
          <TableHead className="text-neutral-300">Price (USD)</TableHead>
          <TableHead className="text-neutral-300">Total (USD)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {trades.map((trade, index) => (
          <TableRow key={index}>
            <TableCell className="text-neutral-100">
              {new Date(trade.date).toLocaleDateString()}
            </TableCell>
            <TableCell className="text-neutral-100">{trade.type}</TableCell>
            <TableCell className="text-neutral-100">{trade.amount.toFixed(8)}</TableCell>
            <TableCell className="text-neutral-100">
              ${trade.price.toLocaleString()}
            </TableCell>
            <TableCell className="text-neutral-100">
              ${(trade.amount * trade.price).toLocaleString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

