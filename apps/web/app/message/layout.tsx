import MessagesNavbar from "./Messagelayout"
export default function Layout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <section>
       <MessagesNavbar />
        {children}
        </section>
  }