"use client";

import Image from "next/image";
import StorySection from "@/components/about/StorySection";
import MissionVisionSection from "@/components/about/MissionSection";
import KeyFiguresSection from "@/components/about/KeySection";
import TeamSection from "@/components/about/TeamSection";

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero Section with Background Image */}
      <section className="relative py-50">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/intercultural.jpg"
            alt="Hero background"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>

        {/* Content overlaid on the image */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              À Propos de Nous
            </h1>
            <p className="text-xl">
              {"Découvrez notre histoire, notre mission et notre équipe d'experts dédiés à l'innovation technologique."}
            </p>

          </div>
        </div>
      </section>

      {/* Component Sections */}
      <StorySection />
      <MissionVisionSection />
      <KeyFiguresSection />
      <TeamSection />
    </div>
  );
}