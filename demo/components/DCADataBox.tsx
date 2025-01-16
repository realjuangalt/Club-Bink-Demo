import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface DCADataBoxProps {
  title: string;
  value: string | number;
  isPercentage?: boolean;
}

export function DCADataBox({ title, value, isPercentage = false }: DCADataBoxProps) {
  const formattedValue = typeof value === 'number' 
    ? isPercentage 
      ? `${value.toFixed(2)}%`
      : new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }).format(value)
    : value;

  const valueColor = isPercentage
    ? parseFloat(formattedValue) >= 0 ? 'text-green-400' : 'text-red-400'
    : 'text-white';

  return (
    <Card className="bg-[#2A2A2A] border-gray-800">
      <CardContent className="p-3">
        <h4 className="text-xs sm:text-sm font-medium text-gray-400 mb-1">{title}</h4>
        <p className={`text-base sm:text-lg md:text-xl font-bold ${valueColor}`}>
          {formattedValue}
        </p>
      </CardContent>
    </Card>
  );
}

