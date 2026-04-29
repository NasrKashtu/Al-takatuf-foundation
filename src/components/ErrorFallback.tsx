import { Button } from '@/components/ui/button';

interface ErrorFallbackProps {
  resetError?: () => void;
}

const ErrorFallback = ({ resetError }: ErrorFallbackProps) => (
  <main className="min-h-[100dvh] flex items-center justify-center bg-background px-6 text-center">
    <div className="max-w-md space-y-4">
      <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
        Error
      </p>
      <h1 className="text-3xl font-bold text-foreground">Something went wrong</h1>
      <p className="text-base text-muted-foreground">
        The page hit an unexpected error. Try reloading; if it keeps happening,
        please let us know.
      </p>
      <div className="flex flex-wrap justify-center gap-3 pt-2">
        <Button onClick={() => (resetError ? resetError() : window.location.reload())}>
          Reload page
        </Button>
        <Button variant="outline" asChild>
          <a href="/">Back to home</a>
        </Button>
      </div>
    </div>
  </main>
);

export default ErrorFallback;
