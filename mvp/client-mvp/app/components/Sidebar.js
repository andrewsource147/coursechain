import Link from 'next/link';

const Sidebar = () => (
  <div className={"sidebar"}>
    <div>Public</div>
    <div>
      <Link href="/">
        <a>Questions</a>
      </Link>

      <Link href="/ranking">
        <a>Ranking</a>
      </Link>
    </div>
  </div>
)

export default Sidebar
