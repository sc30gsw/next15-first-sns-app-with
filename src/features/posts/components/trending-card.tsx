import { Card } from '@/components/ui'

const TRENDING = [
  { name: '#technology', count: '12.3K' },
  { name: '#travel', count: '8.7K' },
  { name: '#fashion', count: '6.2K' },
  { name: '#food', count: '9.5K' },
]

export const TrendingCard = () => {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Trending Topics</Card.Title>
      </Card.Header>
      <Card.Content>
        <ul className="flex flex-col gap-2">
          {TRENDING.map((trend) => (
            <li key={trend.name} className="flex justify-between items-center">
              <p className="text-base">{trend.name}</p>
              <div className="h-[1.30rem] px-1 rounded-md text-muted-fg text-xs font-medium ring-1 ring-fg/20 grid place-content-center w-auto bg-fg/[0.02] dark:bg-fg/10">
                {trend.count}
              </div>
            </li>
          ))}
        </ul>
      </Card.Content>
    </Card>
  )
}
