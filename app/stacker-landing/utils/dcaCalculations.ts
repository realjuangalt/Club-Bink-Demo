interface PriceData {
  date: string
  price: number
}

interface DCAResult {
  date: string
  price: number
  amountUsd: number
  amountBtc: number
  portfolioValueUsd: number
}

export function calculateDCA(priceData: PriceData[], weeklyAmount: number, frequencyInWeeks: number): DCAResult[] {
  let totalBtc = 0
  const results: DCAResult[] = []

  priceData.forEach((data, index) => {
    const shouldPurchase = index % frequencyInWeeks === 0
    const amountUsd = shouldPurchase ? weeklyAmount : 0
    const amountBtc = amountUsd / data.price
    totalBtc += amountBtc

    results.push({
      date: data.date,
      price: data.price,
      amountUsd,
      amountBtc,
      portfolioValueUsd: totalBtc * data.price,
    })
  })

  return results
}

