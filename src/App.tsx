import './App.css'
import ShinyText from '@/components/reactbits/ShinyText'

function App() {
  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          Chat UI
        </h1>
        <ShinyText
          text="Tailwind + shadcn/ui + React Bits ready!"
          speed={3}
          className="text-lg"
        />
      </div>
    </div>
  )
}

export default App
