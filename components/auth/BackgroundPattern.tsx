// components/auth/BackgroundPattern.tsx
export function BackgroundPattern() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute -inset-[10px] opacity-50">
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-gradient-to-br from-[#1459a5]/20 to-transparent blur-3xl" />
        <div className="absolute right-1/4 bottom-0 h-96 w-96 rounded-full bg-gradient-to-br from-[#be321d]/20 to-transparent blur-3xl" />
      </div>
    </div>
  );
}