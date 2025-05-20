// components/auth/AuthSidebar.tsx
import Image from "next/image";
import Link from "next/link";

interface StatCardProps {
  value: string;
  label: string;
}

function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="backdrop-blur-sm bg-white/10 rounded-lg p-3">
      <div className="text-2xl lg:text-3xl font-bold">{value}</div>
      <div className="text-xs lg:text-sm text-white/90">{label}</div>
    </div>
  );
}

export function AuthSidebar() {
  return (
    <div className="relative h-64 lg:h-full">
      <Image
        src="/privacy.png"
        alt="GRAFELEC Technology"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#1459a5]/30 to-[#1459a5]/90" />

      {/* Contenu sur l'image */}
      <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-between text-white">
        <Link href="/" className="inline-block">
          <Image
            src="/logo5.png"
            alt="Grafelec Logo"
            width={120}
            height={72}
            className="h-16 w-auto"
            priority
          />
        </Link>

        {/* Le reste du contenu masqué sur mobile */}
        <div className="hidden lg:block">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              Bienvenue chez Grafelec
            </h1>
            <p className="text-lg lg:text-xl text-white/90 mb-8">
              Votre partenaire technologique pour des solutions
              innovantes et fiables
            </p>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-3 gap-4">
            <StatCard value="100+" label="Projets réalisés" />
            <StatCard value="24/7" label="Support client" />
            <StatCard value="50+" label="Experts" />
          </div>
        </div>
      </div>
    </div>
  );
}