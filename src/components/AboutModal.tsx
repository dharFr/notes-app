interface AboutModalProps { 
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function AboutModal({ isOpen, setIsOpen }: AboutModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-30 transition-opacity"
        onClick={() => setIsOpen(false)}
        role="button"
        aria-label="Close modal"
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-lg p-6 max-w-sm w-full shadow-xl">
          <h2 className="text-lg font-medium mb-4">About <span className="italic">Notes</span></h2>
          
          <div className="space-y-4">
            <p>A simple and elegant note-taking application built with React+Next.js, created as an excuse to write some code.</p>
            
            <div className="text-sm">
              <p>Source : <a 
                href="https://github.com/dharFr/notes-app" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-700 underline inline-flex items-center gap-1"
              >
                <svg height="20" width="20" viewBox="0 0 16 16" className="fill-current">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                </svg>
                notes-app
              </a></p>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => setIsOpen(false)}
              className="mt-4 px-4 py-2 text-sm bg-foreground text-background rounded-lg hover:opacity-90"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 