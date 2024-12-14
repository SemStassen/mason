function ErrorElement() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="max-w-md space-y-4 p-6 text-center">
        <h1 className="text-2xl font-semibold">Something went wrong</h1>
        <p className="text-sm text-muted-foreground">
          An unexpected error occurred. Please try refreshing the page.
        </p>
      </div>
    </div>
  );
}

export { ErrorElement };
