import Link from 'next/link';

const Sidebar = () => (
  <div className={"content-layout"}>
    <div className={"grid-x"}>
      <div className={"side-bar cell large-3"}>
        <Link href="/"><h2>Category</h2></Link>
        <Link href="/">
          <div>IT & Software</div>
        </Link>
        <Link href="/">
          <div>IT Certification</div>
        </Link>
        <Link href="/">
          <div>Network & Security</div>
        </Link>
        <Link href="/">
          <div>Hardware</div>
        </Link>
        <Link href="/">
          <div>Operation System</div>
        </Link>
        <Link href="/">
          <div>Other</div>
        </Link>
      </div>

    </div>
  </div>
)

export default Sidebar
