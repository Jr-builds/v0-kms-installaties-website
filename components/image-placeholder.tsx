interface ImagePlaceholderProps {
  label: string
  className?: string
  aspectRatio?: string
}

export default function ImagePlaceholder({ label, className = '', aspectRatio = 'aspect-video' }: ImagePlaceholderProps) {
  return (
    <div
      className={`${aspectRatio} ${className} bg-gray-200 rounded-lg flex flex-col items-center justify-center text-gray-500 text-sm font-medium text-center p-4 select-none overflow-hidden relative`}
    >
      {/* Visual texture */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `repeating-linear-gradient(45deg, #9ca3af 0, #9ca3af 1px, transparent 0, transparent 50%)`,
          backgroundSize: '20px 20px'
        }} />
      </div>
      <div className="relative z-10 flex flex-col items-center gap-2">
        <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span className="text-xs text-gray-500 leading-tight max-w-[200px]">{label}</span>
      </div>
    </div>
  )
}
