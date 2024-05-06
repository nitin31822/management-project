import StoryLayout from "./StoryLayout"
export default function Layout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <StoryLayout>{children}</StoryLayout>
  }