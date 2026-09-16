import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

// Projects are managed in /admin and stored in Supabase — always fetch
// fresh so admin changes show up immediately instead of a cached page.
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-white dark:bg-black">
      <Header />
      <main className="flex-1">
        <Hero />
        <About />
        <Projects />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
