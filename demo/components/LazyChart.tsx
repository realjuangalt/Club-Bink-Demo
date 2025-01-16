import dynamic from 'next/dynamic'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const DynamicChart = dynamic(() => Promise.resolve(LineChart), {
  ssr: false,
  loading: () => <div>Loading chart...</div>,
})

export function LazyChart({ data, formatDate, formatCurrency }) {
  return (
    <div className="h-[400px] mt-6 md:mt-0">
      <ResponsiveContainer width="100%" height="100%">
        <DynamicChart 
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
          <XAxis 
            dataKey="date" 
            tickFormatter={formatDate}
            interval={Math.floor(data.length / 8)}
            angle={0}
            textAnchor="middle"
            stroke="#666666"
          />
          <YAxis 
            yAxisId="left"
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            stroke="#666666"
          />
          <YAxis 
            yAxisId="right" 
            orientation="right"
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            stroke="#666666"
          />
          <Tooltip
            contentStyle={{ 
              backgroundColor: '#1C1C1C',
              border: '1px solid #333333',
              borderRadius: '8px',
              padding: '8px',
              fontSize: '11px'
            }}
            formatter={(value: number) => [
              formatCurrency(value),
              ''
            ]}
            labelFormatter={(label) => formatDate(label.toString())}
          />
          <Legend 
            wrapperStyle={{
              fontSize: '10px',
              paddingTop: '10px'
            }}
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            iconSize={8}
            iconType="circle"
          />
          <Line 
            yAxisId="left" 
            type="monotone" 
            dataKey="price" 
            stroke="#ff9900" 
            dot={false}
            name="Bitcoin Price"
          />
          <Line 
            yAxisId="right" 
            type="monotone" 
            dataKey="portfolioValue" 
            stroke="#00ff00" 
            dot={false}
            name="Portfolio Value"
          />
          <Line 
            yAxisId="right" 
            type="monotone" 
            dataKey="invested" 
            stroke="#0066cc" 
            dot={false}
            name="Total Invested"
          />
          <Line 
            yAxisId="left" 
            type="monotone" 
            dataKey="averagePurchasePrice" 
            stroke="#8884d8" 
            dot={false}
            name="Average Purchase Price"
          />
        </DynamicChart>
      </ResponsiveContainer>
    </div>
  )
}

