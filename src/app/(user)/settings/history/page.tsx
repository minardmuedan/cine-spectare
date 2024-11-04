import Back from '@/components/back-button'
import { Button } from '@/components/ui/button'
import { Trash2Icon } from 'lucide-react'

export default function UserHistoryPage() {
  const movie = {
    title: 'One Piece',
    release_date: '1999',
    overview: `Years ago, the fearsome Pirate King, Gol D. Roger was executed leaving a huge pile of treasure and the famous "One Piece" behind. Whoever claims the "One Piece" will be named the new King of the Pirates. Monkey D. Luffy, a boy who consumed a "Devil Fruit," decides to follow in the footsteps of his idol, the pirate Shanks, and find the One Piece. It helps, of course, that his body has the properties of rubber and that he's surrounded by a bevy of skilled fighters and thieves to help him along the way. Luffy will do anything to get the One Piece and become King of the Pirates!`,
    src: 'https://media.themoviedb.org/t/p/w300_and_h450_bestv2/cMD9Ygz11zjJzAovURpO75Qg7rT.jpg',
  }

  return (
    <div className="flex-1 p-2">
      <Back className="mb-3 md:hidden" />

      <header className="flex items-center justify-between">
        <h2 className="text-muted-foreground">Your History</h2>
        <Button variant="link">Clear All</Button>
      </header>

      <ul className="flex flex-col gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <li key={i} className="flex gap-2 rounded border bg-accent/40 p-2">
            <img src={movie.src} className="aspect-square h-20 object-cover" />

            <div className="overflow-hidden">
              <div className="flex items-center gap-2">
                <p className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap">{movie.title}</p>
                <p className="text-sm text-muted-foreground">({movie.release_date})</p>
              </div>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{movie.overview}</p>
            </div>

            <div>
              <Button variant="ghost" size="icon">
                <Trash2Icon />
                <span className="sr-only">delete this</span>
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
