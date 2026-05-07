import SlugLayout from "./slug-layout";

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  return (
    <SlugLayout>
      {children}
    </SlugLayout>
  );
}